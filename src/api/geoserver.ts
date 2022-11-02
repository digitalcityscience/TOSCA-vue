import { useGlobalStore } from "@/stores/global";

export const geoserverREST = {
  baseUrl() {
    return `${useGlobalStore().geoserverUrl}rest/`;
  },

  headers() {
    return new Headers({
      'Authorization': `Basic ${useGlobalStore().geoserverBasicAuth}`
    });
  },

  GetFeatureTypes: async (workspaceName: string) => {
    const response = await fetch(
      `${geoserverREST.baseUrl()}workspaces/${workspaceName}/featuretypes.json`,
      { headers: geoserverREST.headers() }
    );
    const data: GS.FeatureTypes = await response.json();
    return data.featureTypes?.featureType || [];
  },

  GetFeatureType: async (workspaceName: string, featureTypeName: string) => {
    const response = await fetch(
      `${geoserverREST.baseUrl()}workspaces/${workspaceName}/featuretypes/${featureTypeName}.json`,
      { headers: geoserverREST.headers() }
    );
    const data: GS.FeatureType = await response.json();
    return data.featureType;
  },

  GetWmsLayers: async (workspaceName: string) => {
    const response = await fetch(
      `${geoserverREST.baseUrl()}workspaces/${workspaceName}/wmslayers.json`,
      { headers: geoserverREST.headers() }
    );
    const data: GS.WMSLayers = await response.json();
    return data.wmsLayers?.wmsLayer || [];
  },

  GetWmsLayer: async (workspaceName: string, wmslayerName: string) => {
    const response = await fetch(
      `${geoserverREST.baseUrl()}workspaces/${workspaceName}/wmslayers/${wmslayerName}.json`,
      { headers: geoserverREST.headers() }
    );
    const data: GS.WMSLayer = await response.json();
    return data.wmsLayer;
  },
};
