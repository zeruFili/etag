<script setup>
// Inline menu (hamburger) icon — color controlled by CSS `color`/stroke currentColor.
defineProps({
  variant: { type: String, default: 'menu' }, // 'menu' | 'close'
})
</script>

<template>
  <svg
    class="menu-icon"
    preserveAspectRatio="none"
    width="100%"
    height="100%"
    overflow="visible"
    style="display: block"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <g v-if="variant === 'menu'">
      <path d="M3.08177 11.5H28.9182" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      <path d="M3.08177 20.5H28.9182" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    </g>
    <g v-else>
      <path d="M6.86719 25L25.1363 6.73087" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      <path d="M6.86719 7L25.1363 25.2691" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    </g>
  </svg>
</template>
