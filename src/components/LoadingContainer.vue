<template>
  <div class="loading-container">
    <div class="loading-text"></div>
    <div class="spinner spinner-border"></div>
  </div>
</template>

<style scoped>
.loading-container {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(230, 235, 228, 0.6);
  z-index: 10000;
}

.loading-container .loading-text {
  position: absolute;
  top: calc(50% + 35px);
  left: calc(50% - 90px);
  font-size: 32px;
  color: gray;
}

.loading-container .spinner {
  position: absolute;
  width: 70px;
  height: 70px;
  top: calc(50% - 70px);
  left: calc(50% - 35px);
  color: gray;
}
</style>
