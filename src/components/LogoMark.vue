<script setup>
// Inline ETAG wordmark logo — color controlled by CSS `color`.
defineProps({
  viewBox: { type: String, default: '0 0 340 72' },
})
</script>

<template>
  <svg
    class="etag-logo"
    preserveAspectRatio="xMidYMid meet"
    width="100%"
    height="100%"
    style="display: block"
    :viewBox="viewBox"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <g fill="currentColor">
      <!-- E -->
      <rect x="0" y="0" width="18" height="72" />
      <rect x="18" y="0" width="62" height="18" />
      <rect x="18" y="27" width="52" height="18" />
      <rect x="18" y="54" width="62" height="18" />
      <!-- T -->
      <rect x="96" y="0" width="62" height="18" />
      <rect x="118" y="18" width="18" height="54" />
      <!-- A -->
      <path d="M176 72 L210 0 H228 L244 72 H224 L220 58 H194 L190 72 Z M198 40 H216 L207 12 Z" />
      <!-- G -->
 <rect x="258" y="0" width="64" height="18" />
      <rect x="258" y="0" width="18" height="72" />
      <rect x="258" y="54" width="64" height="18" />
      <rect x="280" y="36" width="42" height="18" />

    </g>
  </svg>
</template>

<style scoped>
.etag-logo {
  color: currentColor;
}
</style>
