<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import LogoMark from './LogoMark.vue'
import MenuIcon from './MenuIcon.vue'

const props = defineProps({
  theme: { type: String, default: 'dark' },
})

const route = useRoute()
const color = computed(() => (props.theme === 'light' ? '#000' : '#fff'))

const emit = defineEmits(['open-menu'])

function openMenu() {
  emit('open-menu')
}
</script>

<template>
  <header class="page-top-header page-top-header--visible" :style="{ color }">
    <router-link to="/" class="page-top-header-logo" aria-label="ETAG">
      <LogoMark />
    </router-link>
    <button class="page-top-header-menu" type="button" aria-label="Menu" :aria-expanded="false" @click="openMenu">
      <MenuIcon variant="menu" />
    </button>
  </header>
</template>

<style scoped>
.page-top-header {
  --page-top-header-gutter: 48px;
  --page-top-header-max-width: 1632px;
  --page-top-header-top: 48px;
  align-items: flex-start;
  backface-visibility: hidden;
  display: flex;
  height: 72px;
  justify-content: space-between;
  left: 50%;
  pointer-events: none;
  position: fixed;
  top: var(--page-top-header-top);
  transform: translate3d(-50%, 0, 0);
  width: min(calc(100% - var(--page-top-header-gutter) * 2), var(--page-top-header-max-width));
  z-index: 40;
}
.page-top-header-logo {
  height: 72px;
  overflow: hidden;
  pointer-events: auto;
  width: 226.844px;
  display: block;
}
.page-top-header-logo :deep(svg) {
  height: 100%;
  width: 100%;
}
.page-top-header-menu {
  appearance: none;
  background: transparent;
  border: 0;
  cursor: pointer;
  display: grid;
  height: 32px;
  padding: 0;
  place-items: center;
  pointer-events: auto;
  width: 32px;
  color: inherit;
}
.page-top-header-menu :deep(svg) {
  height: 32px;
  width: 32px;
  transform-origin: center;
  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}
.page-top-header-menu:focus-visible :deep(svg),
.page-top-header-menu:hover :deep(svg) {
  transform: rotate(90deg);
}
@media (max-width: 768px) {
  .page-top-header {
    --page-top-header-gutter: 24px;
    --page-top-header-max-width: 392px;
    --page-top-header-top: 24px;
    height: 56px;
  }
  .page-top-header-logo {
    height: 56px;
    width: 176.435px;
  }
}
</style>
