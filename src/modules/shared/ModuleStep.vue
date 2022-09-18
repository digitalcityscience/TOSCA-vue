<template>
  <slot></slot>
  <div class="btn-group">
    <slot name="actions"></slot>
  </div>
</template>

<style scoped>
.btn-group {
  margin-top: 1em;
}
</style>
