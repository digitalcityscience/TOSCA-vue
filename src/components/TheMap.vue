<script setup lang="ts">
import L from 'leaflet';
import { onMounted } from 'vue';
import { useMapStore } from '@/stores/map';

const initialLatitude = import.meta.env.VITE_LATITUDE;
const initialLongitude = import.meta.env.VITE_LONGITUDE;

const { initializeMap, initializeLayers } = useMapStore();

onMounted(() => {
  initializeMap('map', {
    center: new L.LatLng(initialLatitude, initialLongitude),
    zoom: 13,
    minZoom: 4,
    touchZoom: true
  });

  initializeLayers();
});
</script>

<template>
  <div id="map"></div>
</template>

<style scoped>
#map {
  height: 100%;
}
</style>
