import { createApp, nextTick } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueApexCharts from 'vue3-apexcharts'
import './style.css'

// Create the Vue app instance
const app = createApp(App)

// Use Vuetify and VueApexCharts plugins
app.use(vuetify)
app.use(VueApexCharts)

// Mount the app
const appInstance = app.mount('#app')

// Load web fonts asynchronously
const loadFonts = async () => {
  try {
    const webfontLoader = await import('./plugins/webfontloader')
    webfontLoader.loadFonts()
  } catch (error) {
    console.error('Failed to load web fonts:', error)
  }
}

// Refresh all components every 5 seconds
setInterval(() => {
  nextTick(() => {
    appInstance.unmount()
    appInstance.mount('#app')
  })
}, 5000)

// Load web fonts and mount the app
loadFonts().then(() => {
  appInstance.mount('#app')
})