<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { WPS } from '@/api/wps';
import { useAlertsStore } from '@/stores/alerts';
import { useGlobalStore } from '@/stores/global';
import ModuleButton from './shared/ModuleButton.vue';
import ModuleStep from './shared/ModuleStep.vue';

const globalStore = useGlobalStore();
const { setIsLoading, exitModule } = globalStore;
const { activeModuleStep } = storeToRefs(globalStore);

const { pushAlert } = useAlertsStore();

const input = ref();

const submit = async () => {
  if (!isNaN(parseInt(input.value))) {
    setIsLoading(true);

    try {
      await WPS.Execute('set_resolution', [{identifier: 'resolution', data: input.value}], []);
      activeModuleStep.value++;
    } catch (err) {
      pushAlert((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }
};
</script>

<template>
  <h2>Set resolution</h2>

  <ModuleStep v-if="activeModuleStep === 0">
    Set the resolution in meters.
    <br />
    <input type="number" v-model="input" />
    <template #actions>
      <ModuleButton class="primary" @click="submit()">Submit</ModuleButton>
      <ModuleButton class="secondary" @click="exitModule()">Cancel</ModuleButton>
    </template>
  </ModuleStep>

  <ModuleStep v-if="activeModuleStep === 1">
    Resolution has been set.
  </ModuleStep>
</template>
