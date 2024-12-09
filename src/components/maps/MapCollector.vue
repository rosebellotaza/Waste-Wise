<script setup>
import leaflet from 'leaflet';
import 'leaflet-routing-machine';
import { onMounted, ref, watchEffect } from 'vue';
import { useGeolocation } from '@vueuse/core';
import { supabase } from '@/utils/supabase'; 

// Utilize pre-defined Vue functions for Geolocation
const { coords, locatedAt, resume, pause } = useGeolocation({
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0,
});

// Variables and reactive states
let map;
const defaultLatLng = [8.94740526304622, 125.54397750841223]; // Default map center
const isTrackingPause = ref(false);
const pinnedLocations = ref([]); // Store fetched markers
let userLocationMarker = null; // Marker for the collector's location
let routingControl = null; // Store the routing control instance

// Custom truck icon for the "Collector Truck" marker
const truckIcon = leaflet.icon({
  iconUrl: '/images/truck.png', // Path to your custom truck icon
  iconSize: [40, 40],
  iconAnchor: [22, 20],
  popupAnchor: [0, -15],
});

// Toggle Geolocation Tracking
const onTrackingPause = () => {
  isTrackingPause.value = !isTrackingPause.value;

  if (isTrackingPause.value) pause();
  else resume();
};

/**
 * Fetch pinned locations from Supabase and add markers to the map
 */
const fetchAndAddMarkers = async () => {
  try {
    // Fetch only markers with status "pending"
    const { data, error } = await supabase
      .from('waste_markers')
      .select('*')
      .eq('status', 'pending'); // Exclude collected markers
    if (error) throw error;

    // Add markers only if they are not already in the array
    data.forEach(({ id, latitude, longitude, description }) => {
      const existingMarker = pinnedLocations.value.find(
        (loc) => loc.lat === latitude && loc.lng === longitude
      );
      if (!existingMarker) {
        const marker = leaflet
          .marker([latitude, longitude])
          .addTo(map)
          .bindPopup(
            `<b>Description:</b><br/>${description || 'No description provided.'}
            <br/><br/><button class="btn-delete-marker" style="
              background-color: #4c8063; 
              color: white; 
              border: none; 
              padding: 8px 12px; 
              font-size: 10px; 
              border-radius: 3px; 
              cursor: pointer; 
              box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); 
              transition: all 0.3s ease;" 
              data-id="${id}">
              Mark as Collected
            </button>`
          )
          .on('popupopen', function () {
            const deleteButton = document.querySelector('.btn-delete-marker');
            if (deleteButton) {
              deleteButton.addEventListener('click', () => markAsCollected(id, marker));
            }
          })
          .on('click', function () {
            drawRouteToLocation([latitude, longitude]); // Retain the routing functionality
          });

        pinnedLocations.value.push({
          id,
          lat: latitude,
          lng: longitude,
          description,
          marker,
        });
      }
    });
  } catch (error) {
    console.error('Failed to fetch markers:', error.message);
  }
};


/**
 * Mark a location as collected by updating the status in the database and removing the marker from the map
 */
const markAsCollected = async (id, marker) => {
  try {
    // Update the status in the database
    const { data, error } = await supabase
      .from('waste_markers')
      .update({ status: 'collected' })
      .eq('id', id);
    if (error) {
      console.error('Error updating marker status:', error);
      return;
    }

    // Remove the marker from the map
    map.removeLayer(marker);

    // Remove the marker from the local state
    pinnedLocations.value = pinnedLocations.value.filter((loc) => loc.id !== id);

  } catch (error) {
    console.error('Failed to update marker status:', error.message);
  }
};

/**
 * Set the collector's location marker on the map
 */
const setMapMarker = () => {
  const { latitude, longitude } = coords.value;

  if (latitude && longitude) {
    const userLatLng = [latitude, longitude];

    // Update or create the marker
    if (!userLocationMarker) {
      userLocationMarker = leaflet
        .marker(userLatLng, { icon: truckIcon })
        .addTo(map)
        .bindPopup('Collector is here.')
        .openPopup();
    } else {
      userLocationMarker.setLatLng(userLatLng).openPopup(); // Update marker position
    }

    // Center the map on the collector's updated location
    map.setView(userLatLng, 16);
  }
};

/**
 * Draw a route from the collector's current location to the given destination
 */
const drawRouteToLocation = (destinationLatLng) => {
  const userLatLng = [coords.value.latitude, coords.value.longitude];

  if (routingControl) {
    routingControl.setWaypoints([userLatLng, destinationLatLng]); // Update the route
  } else {
    routingControl = leaflet.Routing.control({
      waypoints: [userLatLng, destinationLatLng],
      routeWhileDragging: true,
      createMarker: () => null,
      lineOptions: {
        styles: [{ color: 'gray', weight: 5 }],
      },
    }).addTo(map);
  }
};

/**
 * Initialize the map and fetch pinned locations
 */
onMounted(() => {
  // Initialize the map
  map = leaflet.map('map').setView(defaultLatLng, 16);

  // Add OpenStreetMap tile layer
  leaflet
    .tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    })
    .addTo(map);

  // Fetch and add pinned locations to the map
  fetchAndAddMarkers();
});

/**
 * Watch for changes in the collector's coordinates
 */
watchEffect(() => {
  if (
    coords.value.latitude !== Number.POSITIVE_INFINITY &&
    coords.value.longitude !== Number.POSITIVE_INFINITY
  ) {
    setMapMarker(); // Update the marker and map based on current coordinates
  }
});
</script>

<template>
  <v-card
    title="Current Location"
    :subtitle="'LatLng: ' + coords.latitude + ', ' + coords.longitude + ' | Date/Time: ' + new Date(locatedAt).toLocaleString()">
    <template #append>
      <v-btn @click="onTrackingPause" variant="text" icon>
        <v-icon :icon="isTrackingPause ? 'mdi-refresh' : 'mdi-pause'"></v-icon>
        <v-tooltip activator="parent" location="top">
          {{ isTrackingPause ? 'Resume Tracking' : 'Pause Tracking' }}
        </v-tooltip>
      </v-btn>
    </template>
    <v-card-text>
      <div id="map"></div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
#map {
  width: 100%;
  height: 650px;
}
</style>
