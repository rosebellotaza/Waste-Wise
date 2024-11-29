<script setup>
import leaflet from 'leaflet'
import 'leaflet-routing-machine'
import { onMounted, ref, watchEffect } from 'vue'
import { useGeolocation } from '@vueuse/core'
import { supabase } from '@/utils/supabase' // Import Supabase client

// Utilize pre-defined Vue functions for Geolocation
const { coords, locatedAt, resume, pause } = useGeolocation({
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0,
})

// Load Variables
let map
let collectorMarker
let routeControl
const defaultLatLng = [8.94740526304622, 125.54397750841223] // Default starting coordinates
const isTrackingPause = ref(false)
const pinnedLocations = ref([]) // Store pinned locations
let currentPopup = null // Track the current open popup

// Function to fetch and add markers for all pinned locations
const fetchAndAddMarkers = async () => {
  const { data, error } = await supabase.from('waste_markers').select('*')
  if (error) {
    console.error('Error fetching pinned locations:', error)
    return
  }

  // Store pinned locations and add markers to the map
  pinnedLocations.value = data.map(({ latitude, longitude, description }) => ({
    lat: latitude,
    lng: longitude,
    description: description || 'No description provided.', // Fallback if description is missing
    marker: leaflet
      .marker([latitude, longitude]) // Default marker for pinned locations
      .addTo(map)
      .bindPopup(`<b>Description:</b><br/>${description || 'No description provided.'}`)
      .on('click', function () {
        // Close previously opened popup
        if (currentPopup) {
          currentPopup.closePopup()
        }
        // Open the new popup
        this.openPopup()
        currentPopup = this // Set currentPopup to the newly opened one
      })
  }))
}

// Update the collector's location and route
const updateCollectorLocationAndRoute = () => {
  const collectorLatLng = [coords.value.latitude, coords.value.longitude]

  // Add or update the collector's marker
  if (!collectorMarker) {
    collectorMarker = leaflet
      .marker(collectorLatLng) // Default marker for collector
      .addTo(map)
      .bindPopup('You are here.')
  } else {
    collectorMarker.setLatLng(collectorLatLng).openPopup()
  }

  // Remove the previous route if it exists
  if (routeControl) map.removeControl(routeControl)

  // Add a new route control with road-aware routing
  routeControl = leaflet.Routing.control({
    waypoints: [
      leaflet.latLng(collectorLatLng), // Collector's location
      ...pinnedLocations.value.map((loc) => leaflet.latLng(loc.lat, loc.lng)), // Pinned locations
    ],
    routeWhileDragging: false,
    show: false, // Hide routing machine's UI
    lineOptions: {
      styles: [{ color: 'gray', weight: 4 }],
    },
  }).addTo(map)
}

// Toggle Geolocation Tracking
const onTrackingPause = () => {
  isTrackingPause.value = !isTrackingPause.value

  if (isTrackingPause.value) pause()
  else resume()
}

// Watch for changes in the collector's location
watchEffect(() => {
  if (
    coords.value.latitude !== Number.POSITIVE_INFINITY &&
    coords.value.longitude !== Number.POSITIVE_INFINITY
  ) {
    updateCollectorLocationAndRoute()
  } else {
    console.error('Geolocation data not available or invalid.')
  }
})

// Initialize the map and load pinned locations
onMounted(() => {
  // Initialize the map
  map = leaflet.map('map').setView(defaultLatLng, 16)

  // Load OpenStreetMap layer
  leaflet
    .tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    })
    .addTo(map)

  // Fetch and display pinned locations
  fetchAndAddMarkers()
})
</script>

<template>
  <v-card
    title="Pinned Locations"
    :subtitle="`LatLng: ${coords.latitude}, ${coords.longitude} | Date/Time: ${new Date(locatedAt).toLocaleString()}`">

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
