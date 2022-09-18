<script setup lang="ts">
import { onMounted } from 'vue';
import { WPS } from '@/api/wps';
import { useAlertsStore } from '@/stores/alerts';
import { useGlobalStore } from '@/stores/global';

const { exitModule } = useGlobalStore();
const { pushAlert } = useAlertsStore();

onMounted(async () => {
  try {
    const document = await WPS.Execute('say_hello', [{identifier: 'name', data: 'Vue'}], []);
    alert(document
      .getElementsByTagName("wps:ProcessOutputs")[0]
      .getElementsByTagName("wps:Output")[0]
      .getElementsByTagName("wps:Data")[0]
      .getElementsByTagName("wps:LiteralData")[0]
      .textContent);
  } catch (err) {
    pushAlert((err as Error).message);
  } finally {
    exitModule();
  }
});
</script>

<template>
  {{ }}
</template>
