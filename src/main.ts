import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@/router'
import { vMaska } from 'maska'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faChalkboard,
  faHome,
  faUserGroup,
  faChalkboardTeacher,
  faWallet,
  faCaretUp,
  faFontAwesome,
  faCircleCheck,
  faCircleXmark,
  faUser
} from '@fortawesome/free-solid-svg-icons'
library.add(
  faChalkboard,
  faHome,
  faUserGroup,
  faChalkboard,
  faChalkboardTeacher,
  faWallet,
  faCaretUp,
  faFontAwesome,
  faCircleCheck,
  faCircleXmark,
  faUser
)
import './assets/main.css'
const pinia = createPinia()
const app = createApp(App).use(router).use(pinia).component('font-awesome-icon', FontAwesomeIcon)
app.directive('maska', vMaska)
app.mount('#app')
