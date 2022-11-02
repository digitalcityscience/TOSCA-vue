import L from 'leaflet';
import 'leaflet-draw';
import 'leaflet-groupedlayercontrol';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { geoserverREST } from '@/api/geoserver';
import { useGlobalStore } from './global';

const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
const hot = L.tileLayer('https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors; Humanitarian map style by <a href="https://www.hotosm.org/">HOT</a>'
});

const baseLayers = {
  'OSM Standard style': osm,
  'OSM Humanitarian style': hot
};

const geoserverWorkspaces = ['raster', 'vector'];

export const useMapStore = defineStore('map', () => {
  const globalStore = useGlobalStore();

  const map = ref<L.Map>();
  const drawings = ref<L.FeatureGroup>();

  const initializeMap = (containerId: string, options: L.MapOptions) => {
    map.value = new L.Map(containerId, options);

    /* Drawing tool */
    drawings.value = L.featureGroup().addTo(map.value);

    map.value.addControl(new L.Control.Draw({
      edit: {
        featureGroup: drawings.value
      },
      draw: {
        polygon: {
          showArea: true
        },
        polyline: false,
        rectangle: false,
        circle: false,
        marker: false
      }
    }));

    map.value.on(L.Draw.Event.CREATED, event => {
      drawings.value?.addLayer(event.layer);
    });

    /* Scale bar */
    L.control.scale({ maxWidth: 300, position: 'bottomright' }).addTo(map.value);

    hot.addTo(map.value);
  };

  const initializeLayers = async () => {
    if (!map.value) {
      console.error('Failed to initialize map layers: map is not defined');
      return;
    }

    const overlayMaps: { [key: string]: L.Layer } = {};

    for (const workspace of geoserverWorkspaces) {
      // Raster layers
      const wmsLayers = await geoserverREST.GetWmsLayers(workspace);

      for (const wmsLayer of wmsLayers) {
        const wmsLayerInfo = await geoserverREST.GetWmsLayer(workspace, wmsLayer.name);

        overlayMaps[wmsLayerInfo.title] = L.tileLayer.wms(
          getWmsBaseUrl(workspace),
          {
            layers: wmsLayerInfo.name,
            format: 'image/png',
            transparent: true,
            maxZoom: 20,
            minZoom: 1
          }
        );
      }

      // Vector layers
      const featureTypes = await geoserverREST.GetFeatureTypes(workspace);

      for (const featureType of featureTypes) {
        const featureTypeInfo = await geoserverREST.GetFeatureType(workspace, featureType.name);

        overlayMaps[featureTypeInfo.title] = L.tileLayer.wms(
          getWmsBaseUrl(workspace),
          {
            layers: featureTypeInfo.name,
            format: 'image/png',
            transparent: true,
            maxZoom: 20,
            minZoom: 1
          }
        );
      }
    }

    L.control.layers(baseLayers, overlayMaps).addTo(map.value);
  };

  const getWmsBaseUrl = (workspace: string) => {
    return `${globalStore.geoserverUrl}${workspace}/wms`;
  }

  return {
    map,
    drawings,
    initializeMap,
    initializeLayers
  };
})
