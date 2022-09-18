import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

import App from './App.vue'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
