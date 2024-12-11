<script setup>
import leaflet from 'leaflet';
import { ref, onMounted, watchEffect } from 'vue';
import { supabase } from '@/utils/supabase';
import { useAuthUserStore } from '@/stores/authUser';

// Reactive properties
const formData = ref({
  latitude: null,
  longitude: null,
  description: '',
  user_id: '', // Include user_id in the form data
  status: 'pending', // Default status is 'pending'
});

const authStore = useAuthUserStore();

// Variables
let map;
let draggableMarker;
const showPopup = ref(false); // Controls the visibility of the success message
const popupMessage = ref(''); // Message content for the popup

// Add marker to map and make it draggable
const addDraggableMarker = (latlng) => {
  if (draggableMarker) {
    map.removeLayer(draggableMarker);
  }

  draggableMarker = leaflet
    .marker(latlng, { draggable: true })
    .addTo(map)
    .bindPopup('Drag this marker to adjust the location.')
    .openPopup();

  // Update form data when the marker is dragged
  draggableMarker.on('dragend', (e) => {
    const { lat, lng } = e.target.getLatLng();
    formData.value.latitude = lat;
    formData.value.longitude = lng;
  });
};

// Show success popup message
const displayPopup = (message) => {
  popupMessage.value = message;
  showPopup.value = true;

  // Automatically hide the popup after 3 seconds
  setTimeout(() => {
    showPopup.value = false;
  }, 3000);
};

// Attempt to get the user's current location and pin it
const pinUserCurrentLocation = () => {
  if (!navigator.geolocation) {
    displayPopup('Geolocation is not supported by your browser.');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      formData.value.latitude = latitude;
      formData.value.longitude = longitude;

      // Center the map on the user's location
      map.setView([latitude, longitude], 15);
      addDraggableMarker({ lat: latitude, lng: longitude });

      displayPopup('Your current location has been tentatively pinned. Please submit it.');
    },
    (error) => {
      console.error('Error getting location:', error.message);
      displayPopup('Unable to retrieve your location.');
    }
  );
};

// Handle map click to place a draggable marker
const onMapClick = (e) => {
  formData.value.latitude = e.latlng.lat;
  formData.value.longitude = e.latlng.lng;
  addDraggableMarker(e.latlng);
};

// Store data on submit
const submitData = async () => {
  formData.value.user_id = authStore.userData?.id || null; // Retrieve user_id from auth store

  if (!formData.value.user_id) {
    console.error('Error: User is not authenticated or user_id is missing.');
    return;
  }

  if (!formData.value.latitude || !formData.value.longitude) {
    displayPopup('Error: Latitude and longitude must be selected on the map.');
    return;
  }

  if (!formData.value.description.trim()) {
    displayPopup('Description is required!');
    return;
  }

  try {
    // Insert data into the waste_markers table
    const { data, error } = await supabase.from('waste_markers').insert([
      {
        ...formData.value, // Use the existing form data
        status: 'pending', // Ensure the status is set to 'pending'
      },
    ]);

    if (error) {
      console.error('Error storing location:', error.message);
    } else {
      leaflet
        .marker([formData.value.latitude, formData.value.longitude])
        .addTo(map)
        .bindPopup('Location Submitted!')
        .openPopup();

      // Show success popup
      displayPopup('Location submitted successfully!');

      // Clear form after successful submission
      formData.value.latitude = null;
      formData.value.longitude = null;
      formData.value.description = '';
      if (draggableMarker) {
        map.removeLayer(draggableMarker);
        draggableMarker = null;
      }
      console.log('Location stored successfully!');
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
};

// Watch for changes in latitude and longitude and log to the console
watchEffect(() => {
  if (formData.value.latitude && formData.value.longitude) {
    console.log(
      `Marker position changed: Latitude: ${formData.value.latitude}, Longitude: ${formData.value.longitude}`
    );
  }
});

// Initialize map and attempt to pin user's current location on mount
onMounted(() => {
  const defaultLatLng = [8.94740526304622, 125.54397750841223]; // Butuan Coords
  map = leaflet.map('map').setView(defaultLatLng, 15);

  leaflet
    .tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    })
    .addTo(map);

  // Automatically pin current location on login
  pinUserCurrentLocation();

  // Allow user to pin locations by clicking on the map
  map.on('click', onMapClick);
});
</script>

<template>
  <v-card class="custom-card">
    <v-card-title class="pt-5 py-5">
      <v-row align="center" dense>
        <v-icon color="green-darken-1" class="mr-2">mdi-pin</v-icon>
        <span class="pinning">Pin the Location</span>
      </v-row>
    </v-card-title>
    <v-card-text>
      <div id="map" style="height: 500px;"></div>
      <v-text-field
        v-model="formData.description"
        label="Additional Description"
        outlined
        dense
        class="mt-4"
        v-slot:prepend-inner
      >
        <v-icon color="green-darken-4">mdi-text-box-outline</v-icon>
      </v-text-field>
    </v-card-text>
  </v-card>
  <br>

  <!-- Submit Button -->
  <v-btn
    color="green darken-1"
    class="mt-4 mx-auto d-block"
    elevation="2"
    @click="submitData"
  >
    Submit Location
  </v-btn>
  <br>

  <!-- Success Popup -->
  <v-alert
    v-if="showPopup"
    type="success"
    border="top"
    class="text-center mt-3"
    outlined
  >
    {{ popupMessage }}
  </v-alert>
</template>

<style scoped>
#map {
  width: 100%;
  height: 500px;
}

.pinning {
  font-size: 18px;
}

.custom-card {
  margin-top: 5px;
  margin-left: 16px;
  margin-right: 16px;
}
</style>
