import { defineStore } from 'pinia';
import { ref, shallowRef } from 'vue';

export const useGlobalStore = defineStore('global', () => {
  let geoserverUrl: string = import.meta.env.VITE_GEOSERVER_URL;
  if (!geoserverUrl.match(/\/$/)) {
    geoserverUrl += '/'
  }
  const geoserverBasicAuth = btoa(`${import.meta.env.VITE_GEOSERVER_USERNAME}:${import.meta.env.VITE_GEOSERVER_PASSWORD}`)

  const isLoading = ref(false);
  const activeModule = shallowRef<Module | null>(null);
  const activeModuleStep = ref(0);

  const setIsLoading = (value: boolean) => {
    isLoading.value = value;
  };

  const setActiveModule = (module: Module, step: number) => {
    activeModule.value = module;
    activeModuleStep.value = step;
  };

  const exitModule = () => {
    activeModule.value = null;
    activeModuleStep.value = 0;
  };

  return {
    geoserverUrl,
    geoserverBasicAuth,
    isLoading,
    activeModule,
    activeModuleStep,
    setIsLoading,
    setActiveModule,
    exitModule
  };
});
