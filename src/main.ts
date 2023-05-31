import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@/router'
import { vMaska } from 'maska'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import * as icons from '@/assets/icons'
import './assets/main.css'

library.add(icons)
const pinia = createPinia()
const app = createApp(App).use(router).use(pinia).component('font-awesome-icon', FontAwesomeIcon)
app.directive('maska', vMaska)
app.mount('#app')
