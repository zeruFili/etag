<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import SiteOpener from './components/SiteOpener.vue'
import PageMenu from './components/PageMenu.vue'
import AwwwardsBadge from './components/AwwwardsBadge.vue'

const route = useRoute()
const menuOpen = ref(false)

const theme = computed(() => route.meta.theme || 'dark')

function openMenu() {
  menuOpen.value = true
  document.body.style.overflow = 'hidden'
}
function closeMenu() {
  menuOpen.value = false
  document.body.style.overflow = ''
}

watch(
  () => route.path,
  () => closeMenu()
)

// Esc closes the menu
function onKey(e) {
  if (e.key === 'Escape') closeMenu()
}
onMounted(() => window.addEventListener('keydown', onKey))

function handleOpenMenu() {
  openMenu()
}
</script>

<template>
  <div class="min-h-screen">
    <SiteOpener />
    <PageMenu :open="menuOpen" @close="closeMenu" />
    <AwwwardsBadge />
    <div class="public-layout-shell min-h-screen">
      <router-view v-slot="{ Component }">
        <component :is="Component" :theme="theme" @open-menu="handleOpenMenu" />
      </router-view>
    </div>
  </div>
</template>

<style scoped>
.public-layout-shell {
  overflow-x: clip;
  overflow-y: visible;
}
</style>
