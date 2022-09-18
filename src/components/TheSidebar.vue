<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '@/stores/global';

const globalStore = useGlobalStore();
const { activeModule } = storeToRefs(globalStore);
</script>

<template>
  <div id="dialog" className="flex-grow-1 card card-border box-shadow">
    <component v-if="activeModule" :is="activeModule"></component>
    <div v-else>
      <small>No process is currently running. Launch a module or setting from the navigation bar at the top.</small>
    </div>
  </div>
  <div className="card flex-row justify-content-center">
    <div className="d-block">
      <img alt="GIZ logo" id="giz-logo" src="@/assets/images/giz-logo.gif" />
      <img alt="HCU logo" id="hcu-logo" src="@/assets/images/hcu-logo.png" />
    </div>
  </div>
</template>

<style scoped>
#giz-logo {
  height: 40px;
  margin: 4px 12px 4px 0;
}

#hcu-logo {
  height: 32px;
  margin: 4px 0 12px;
}
</style>
