<script setup lang="ts">
import { ref } from 'vue';
import { WPS, upload } from '@/api/wps';
import { useAlertsStore } from '@/stores/alerts';
import { useGlobalStore } from '@/stores/global';
import ModuleButton from './shared/ModuleButton.vue';
import ModuleStep from './shared/ModuleStep.vue';

const { setIsLoading, exitModule } = useGlobalStore();
const { pushAlert } = useAlertsStore();

const currentStep = ref(0);
const basemapForm = ref();

const submit = async () => {
  setIsLoading(true);

  const formData = new FormData(basemapForm.value);

  try {
    const response = await upload(formData);
    await WPS.Execute('set_basemap', [{ identifier: 'filename', data: response }], []);
    currentStep.value++;
  } catch (err) {
    pushAlert((err as Error).message);
  } finally {
    setIsLoading(false);
  }
};
</script>

<template>
  <h2>Set basemap</h2>

  <ModuleStep v-if="currentStep === 0">
    If you set a new basemap, the existing basemap will be overwritten. Do you want to set a new basemap?
    <template #actions>
      <ModuleButton class="primary" @click="currentStep++">Yes</ModuleButton>
      <ModuleButton class="secondary" @click="exitModule()">No</ModuleButton>
    </template>
  </ModuleStep>

  <ModuleStep v-if="currentStep === 1">
    Select an OpenStreetMap (.osm) file to use as the basemap. You can download an OSM file from <a href="https://www.openstreetmap.org/" target="_blank" rel="noreferrer">openstreetmap.org</a>; see the manual for further help.
    <br />
    <small>Setting a new basemap may take a long time if the file is large.</small>
    <form ref="basemapForm" encType="multipart/form-data">
      <input type="file" name="file" />
    </form>
    <template #actions>
      <ModuleButton class="primary" @click="submit()">Submit</ModuleButton>
      <ModuleButton class="secondary" @click="exitModule()">Cancel</ModuleButton>
    </template>
  </ModuleStep>

  <ModuleStep v-if="currentStep === 2">
    Basemap has been set.
  </ModuleStep>
</template>
