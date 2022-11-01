import L from 'leaflet'
import 'leaflet-draw'
import 'leaflet-groupedlayercontrol'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { geoserverREST } from '@/api/geoserver';

const geoserverUrl = import.meta.env.VITE_GEOSERVER_URL;
const rasterWMS = geoserverUrl + 'geoserver/raster/wms';
const vectorWMS = geoserverUrl + 'geoserver/vector/wms';

const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})
const hot = L.tileLayer('https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors; Humanitarian map style by <a href="https://www.hotosm.org/">HOT</a>'
})

const baseLayers = {
  'OSM Standard style': osm,
  'OSM Humanitarian style': hot
}

const geoserverWorkspaces = ['vector'];

export const useMapStore = defineStore('map', () => {
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

  /**
   * Create WMS service based on layer config
   */
  const createWms = (layer: L.WMSOptions & { type: string; }) => {
    if (layer.type === 'vector') {
      return L.tileLayer.wms(vectorWMS, layer);
    }
    if (layer.type === 'raster') {
      return L.tileLayer.wms(rasterWMS, layer);
    }
    throw new Error('Invalid layer type');
  }

  const initializeLayers = async () => {
    if (!map.value) {
      console.error('Failed to initialize map layers: map is not defined');
      return;
    }

    const overlayMaps: { [key: string]: L.Layer } = {};

    const featureTypes = await Promise.all(
      geoserverWorkspaces.map(workspace => geoserverREST.GetFeatureTypesInWorkspace(workspace))).then(results => results.flat()
    );
    console.log(featureTypes)
    const featureTypeNames = featureTypes.map(ft => ft.name);
    const featureTypeInfos = await Promise.all(featureTypeNames.map(name => geoserverREST.GetFeatureType('vector', name)));
    console.log(featureTypeInfos)

    const layersConfig = featureTypeInfos.map(info => ({
      layers: info.name,
      format: 'image/png',
      transparent: true,
      maxZoom: 20,
      minZoom: 1,
      title: info.title,
      type: 'vector', // TODO: get resource type (vector/raster) from geoserver API
    }));

    for (const layer of layersConfig) {
      overlayMaps[layer.title] = createWms(layer);
    }

    L.control.layers(baseLayers, overlayMaps).addTo(map.value);
  };

  return {
    map,
    drawings,
    initializeMap,
    initializeLayers
  };
})
