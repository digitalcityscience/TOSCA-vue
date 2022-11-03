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

<style lang="scss">
#map {
  height: 100%;
  font-size: 0.9rem;

  .leaflet-control-container .leaflet-top.leaflet-right {
    height: 100%;
  }

  .leaflet-bottom {
    z-index: 999;
  }

  .leaflet-bar {
    a,
    a:hover {
      width: 40px !important;
      height: 40px !important;
      line-height: 40px !important;
      font-weight: normal !important;
    }
  }

  .leaflet-draw-toolbar {
    a {
      background-size: 400px 40px !important;
    }

    .leaflet-draw-draw-polygon,
    .leaflet-draw-draw-polygon.leaflet-disabled {
      background-position: -40px 0px !important;
    }

    .leaflet-draw-draw-circlemarker,
    .leaflet-draw-draw-circlemarker.leaflet-disabled {
      background-position: -360px 0px !important;
    }

    .leaflet-draw-edit-edit,
    .leaflet-draw-edit-edit.leaflet-disabled {
      background-position: -200px 0px !important;
    }

    .leaflet-draw-edit-remove,
    .leaflet-draw-edit-remove.leaflet-disabled {
      background-position: -240px 0px !important;
    }
  }

  .leaflet-draw-actions {
    left: 40px !important;

    a {
      font: inherit !important;
    }
  }

  .leaflet-draw-actions-top a,
  .leaflet-draw-actions-bottom a {
    height: 40px !important;
    line-height: 40px !important;
  }

  .leaflet-control-layers {
    width: 280px;
    max-height: calc(100% - 100px);
    overflow: auto;
  }

  .leaflet-control-layers-group-name {
    font-weight: bold;
  }

  #leaflet-legend-title {
    font-weight: bold;
  }

  #leaflet-legend-container {
    background-color: white;
    padding: 10px;
    border-radius: 5px;
  }

  #leaflet-legend-content {
    max-width: 50vw;
    max-height: 30vh;
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .leaflet-legend-item {
    padding: 10px 10px
  }

  .getFeatureClass {
    width: 300px;

    table {
      justify-content: center;
      align-items: center;
      width: 100%
    }

    div {
      overflow: auto;
      max-height: 250px;
    }

    tbody {
      position: relative;
      align-items: stretch;
    }

    tr {
      border: 1px solid black;
      word-break: break-word;
      white-space: pre-line;
    }

    td {
      padding: 5px;

    }

    tr td:first-of-type {
      font-weight: bold;
      border: 1px solid black;
      width: 50%;
    }

    p {
      font-weight: bold;
    }
  }
}
</style>
