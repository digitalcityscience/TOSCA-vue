<script setup lang="ts">
import { useGlobalStore } from '@/stores/global';
import SetBasemap from '@/modules/SetBasemap.vue';
import SetResolutionModule from '@/modules/SetResolution.vue';
import SetSelectionModule from '@/modules/SetSelection.vue';
import TestWPS from '@/modules/TestWPS.vue';

const { setActiveModule } = useGlobalStore();

const launch = (module: Module) => {
  setActiveModule(module, 0);
};
</script>

<template>
  <nav class="navbar navbar-expand navbar-light">
    <div class="navbar-brand fw-bold">TOSCA</div>
    <ul class="navbar-nav flex-grow-1 justify-content-space-evenly">
      <li class="nav-item d-flex align-items-center">
        <span class="d-inline-block align-middle m-2">Modules</span>
        <select defaultValue="time_map" id="launch-module-menu" class="form-select form-select-lg me-2">
          <option value="time_map">Calculate time map</option>
          <option value="query">Query area</option>
        </select>
        <button class="btn btn-success btn-lg me-2" @click="() => {}">▷&nbsp;Run</button>
        <button class="btn btn-light btn-lg" id="result-btn" @click="$emit('openResults')">Results</button>
      </li>
      <li class="nav-item flex-grow-1"></li>
      <li class="nav-item d-flex align-items-center">
        <div class=" dropdown">
          <a class="btn btn-light btn-lg dropdown-toggle" id="settings-menu" role="button" data-bs-toggle="dropdown">Settings</a>
          <ul class="dropdown-menu" aria-labelledby="settings-menu">
            <li>
              <a class="btn dropdown-item" @click="launch(TestWPS)">Test WPS</a>
            </li>
            <li>
              <a class="btn dropdown-item" @click="launch(SetBasemap)">Set basemap</a>
            </li>
            <li>
              <a class="btn dropdown-item" @click="launch(SetSelectionModule)">Set selection</a>
            </li>
            <li>
              <a class="btn dropdown-item" @click="launch(SetResolutionModule)">Set resolution</a>
            </li>
          </ul>
        </div>
      </li>
      <li class="nav-item">
        <a class="btn btn-secondary btn-lg" href="https://github.com/digitalcityscience/TOSCA/wiki" target="_blank">
          Help
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  padding: .5rem 1rem;
}

.navbar .navbar-brand {
  font-size: 1.3rem;
}

.navbar .navbar-nav > li {
  margin-left: 24px;
}

.navbar .dropdown-menu {
  z-index: 1001;
}

.navbar .btn-lg,
.navbar .custom-select-lg {
  font-size: inherit;
}
</style>
