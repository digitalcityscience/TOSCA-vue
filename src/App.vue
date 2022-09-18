<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import TheMap from '@/components/TheMap.vue';
import TheNavbar from '@/components/TheNavbar.vue';
import TheSidebar from '@/components/TheSidebar.vue';
import AlertContainer from '@/components/AlertContainer.vue';
import LoadingContainer from '@/components/LoadingContainer.vue';
import ResultsModal from '@/components/ResultsModal.vue';
import { useGlobalStore } from '@/stores/global';

const globalStore = useGlobalStore();
const { isLoading } = storeToRefs(globalStore);

const showResultsModal = ref(false);
</script>

<template>
  <div class="d-flex flex-column h-100">
    <header class="card box-shadow">
      <TheNavbar @openResults="showResultsModal = true" />
    </header>
    <main class="d-flex flex-grow-1 main">
      <div id="sidebar" class="d-flex flex-column w-25 sidebar">
        <TheSidebar />
      </div>
      <div id="map-container" class="col card box-shadow">
        <TheMap />
      </div>
    </main>
    <AlertContainer />
    <LoadingContainer v-if="isLoading" />
  </div>
  <ResultsModal v-if="showResultsModal" @close="showResultsModal = false" />
</template>

<style scoped>
#map-container {
  padding: 0;
  position: relative;
  overflow-y: hidden;
}

#alert-anchor {
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 2000;
}

.alert {
  margin: 10px;
}

.alert .close {
  margin-left: 16px;
}

.tooltip {
  font-size: 1rem;
}

.tooltip-inner {
  max-width: 300px;
}
</style>
