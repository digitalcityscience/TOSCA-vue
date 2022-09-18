import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAlertsStore = defineStore('alerts', () => {
  const alerts = ref<Alert[]>([]);

  const pushAlert = (message: string) => {
    alerts.value.push({ message, timestamp: Date.now() });
  };

  const dismissAlert = (alert: Alert) => {
    alerts.value.splice(alerts.value.indexOf(alert), 1);
  };

  return {
    alerts,
    pushAlert,
    dismissAlert
  };
});
