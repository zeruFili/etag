import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/main.css'

// Prevent the browser from restoring a previous scroll position on reload,
// so the site always starts at the top (hero section).
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

createApp(App).use(router).mount('#app')

// Ensure a fresh visit always starts at the very top.
window.scrollTo(0, 0)
