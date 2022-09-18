<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAlertsStore } from '@/stores/alerts';

const alertsStore = useAlertsStore();
const { alerts } = storeToRefs(alertsStore);

const remove = (alert: Alert) => {
  alertsStore.dismissAlert(alert);
};
</script>

<template>
  <div class="alert-container">
    <div v-for="alert in alerts" :key="alert.timestamp" class="alert alert-danger" role="alert" >
      <span>{{ alert.message }}</span>
      <button class="btn btn-light" data-dismiss="alert" @click="remove(alert)">×</button>
    </div>
  </div>
</template>

<style scoped>
.alert-container {
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 2000;
}
</style>
