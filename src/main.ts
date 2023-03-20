import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@/router'
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
  faCircleXmark
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
  faCircleXmark
)
import './assets/main.css'
createApp(App)
  .use(router)
  .use(createPinia())
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
