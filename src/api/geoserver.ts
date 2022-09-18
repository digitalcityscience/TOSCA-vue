const baseURL = import.meta.env.VITE_GEOSERVER_URL + 'geoserver/rest/';
const headers = new Headers({
  'Authorization': 'Basic ' + btoa(`${import.meta.env.VITE_GEOSERVER_USERNAME}:${import.meta.env.VITE_GEOSERVER_PASSWORD}`)
});

export const geoserverREST = {
  /**
   * Gets all featureTypes(layers) information stored in a specific workspace
   */
  GetFeatureTypesInWorkspace: async (workspace: string) => {
    const response = await fetch(baseURL + `workspaces/${workspace}/featuretypes.json`, { headers });
    const data = await response.json();
    return data.featureTypes.featureType;
  },

  /**
   * Gets information about one particular featureType(layer)
   */
  GetFeatureType: async (workspace: string, name: string) => {
    const response = await fetch(baseURL + `workspaces/${workspace}/featuretypes/${name}.json`, { headers });
    const data = await response.json();
    return data.featureType;
  },
};
