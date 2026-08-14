<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const leaving = ref(false)
const revealing = ref(false)
const done = ref(false)

const revealDuration = 2500
const exitDuration = 420

onMounted(() => {
  revealing.value = true
  setTimeout(() => {
    leaving.value = true
    document.body.classList.remove('is-menu-open')
  }, revealDuration)
  setTimeout(() => {
    done.value = true
  }, revealDuration + exitDuration + 60)
})
</script>

<template>
  <div
    v-if="!done"
    class="site-opener"
    :class="{ 'is-leaving': leaving }"
    :style="{
      '--site-opener-reveal-duration': revealDuration + 'ms',
      '--site-opener-exit-duration': exitDuration + 'ms',
    }"
    role="presentation"
  >
    <div class="site-opener__frame">
      <div class="site-opener__copy" :class="{ 'is-revealing': revealing }">
        <p class="site-opener__line site-opener__line--main" aria-hidden="true">
          <span class="site-opener__accent">Welcome to</span>
          <span class="site-opener__core"> ETAG Interiors</span>
        </p>
        <span class="site-opener__edge-shadow" aria-hidden="true"></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.site-opener {
  background: #000;
  display: grid;
  inset: 0;
  opacity: 1;
  overflow: hidden;
  padding: clamp(12px, 3vw, 28px);
  place-items: center;
  position: fixed;
  transition: opacity var(--site-opener-exit-duration) ease, visibility var(--site-opener-exit-duration) ease;
  z-index: 2000;
}
.site-opener.is-leaving {
  opacity: 0;
  visibility: hidden;
}
.site-opener__frame {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  transition: transform var(--site-opener-exit-duration) cubic-bezier(0.22, 1, 0.36, 1),
    opacity var(--site-opener-exit-duration) ease;
  width: 100%;
}
.site-opener.is-leaving .site-opener__frame {
  opacity: 0.9;
  transform: translate3d(0, 10px, 0) scale(0.992);
}
.site-opener__copy {
  display: inline-grid;
  max-width: 100%;
  overflow: hidden;
  place-items: center;
  position: relative;
  transform: translateY(-25px);
}
.site-opener__line {
  letter-spacing: -0.01em;
  line-height: 1;
  margin: 0;
  text-rendering: geometricPrecision;
  white-space: nowrap;
}
.site-opener__line--main {
  clip-path: inset(0 100% 0 0);
  grid-area: 1/1;
  opacity: 1;
  text-shadow: none;
  will-change: clip-path;
}
.site-opener__copy.is-revealing .site-opener__line--main {
  animation: site-opener-text-reveal var(--site-opener-reveal-duration) linear both;
}
.site-opener__edge-shadow {
  background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.64) 44%, rgba(0, 0, 0, 0.92) 68%, transparent);
  bottom: -12%;
  left: 0;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  top: -12%;
  transform: translate(0);
  width: clamp(20px, 4vw, 58px);
  will-change: left, opacity;
  z-index: 2;
}
.site-opener__copy.is-revealing .site-opener__edge-shadow {
  animation: site-opener-edge-shadow var(--site-opener-reveal-duration) linear both;
}
.site-opener__accent {
  color: #a63437;
  font-family: 'Fraunces', serif;
  font-size: clamp(14px, 3.6vw, 51px);
  font-style: italic;
  font-weight: 500;
}
.site-opener__core {
  color: #fff;
  font-family: 'Maison Neue', sans-serif;
  font-size: clamp(12px, 3.25vw, 44px);
  font-weight: 400;
}
@keyframes site-opener-text-reveal {
  0% {
    clip-path: inset(0 100% 0 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}
@keyframes site-opener-edge-shadow {
  0% {
    left: 0;
    opacity: 0.78;
    transform: translate(0);
  }
  92% {
    left: 100%;
    opacity: 0.78;
    transform: translate(0);
  }
  to {
    left: 108%;
    opacity: 0;
    transform: translate(0);
  }
}
@media (prefers-reduced-motion: reduce) {
  .site-opener {
    --site-opener-reveal-duration: 1ms;
  }
  .site-opener__line--main {
    clip-path: inset(0 0 0 0);
    opacity: 1;
    transform: none;
  }
  .site-opener__edge-shadow {
    display: none;
  }
}
</style>
