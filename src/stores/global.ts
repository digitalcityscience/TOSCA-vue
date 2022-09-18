import { defineStore } from 'pinia';
import { ref, shallowRef } from 'vue';

export const useGlobalStore = defineStore('global', () => {
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
    isLoading,
    activeModule,
    activeModuleStep,
    setIsLoading,
    setActiveModule,
    exitModule
  };
});
