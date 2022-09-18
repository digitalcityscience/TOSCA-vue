<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  class: string;
}>();

const computedClass = computed(() => `btn btn-${props.class}`)
</script>

<template>
  <button type="button" :class="computedClass"><slot></slot></button>
</template>
