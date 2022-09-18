<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { WPS } from '@/api/wps';
import { useAlertsStore } from '@/stores/alerts';
import { useGlobalStore } from '@/stores/global';
import { useMapStore } from '@/stores/map';
import ModuleButton from './shared/ModuleButton.vue';
import ModuleStep from './shared/ModuleStep.vue';

const globalStore = useGlobalStore();
const { setIsLoading, exitModule } = globalStore;
const { activeModuleStep } = storeToRefs(globalStore);

const { pushAlert } = useAlertsStore();

const { drawings } = storeToRefs(useMapStore());
const geojson = drawings.value?.toGeoJSON();

const submit = async () => {
  setIsLoading(true);

  try {
    await WPS.Execute('set_selection', [], [{
      identifier: 'selection',
      data: JSON.stringify(geojson)
    }]);
    activeModuleStep.value++;
  } catch (err) {
    pushAlert((err as Error).message);
  } finally {
    setIsLoading(false);
  }
};
</script>

<template>
  <h2>Set selection</h2>

  <ModuleStep v-if="activeModuleStep === 0">
    A ‘selection’ is a selected part of the basemap area. Calculations will only be performed for that selection. Use the polygon tool to set the selection. When you have finished drawing, click ‘Save’ to set your drawing as selection.
    <br/>
    <small>The selection area has to overlap with the basemap boundary.</small>
    <template #actions>
      <ModuleButton class="primary" @click="submit()">Save</ModuleButton>
      <ModuleButton class="secondary" @click="exitModule()">Cancel</ModuleButton>
    </template>
  </ModuleStep>

  <ModuleStep v-if="activeModuleStep === 1">
    Selection has been set.
  </ModuleStep>
</template>
