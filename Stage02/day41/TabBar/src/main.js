import { createApp } from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHouse, faMagnifyingGlass, faUserGroup, faGear } from '@fortawesome/free-solid-svg-icons'
library.add(faHouse, faMagnifyingGlass, faUserGroup, faGear)
createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
