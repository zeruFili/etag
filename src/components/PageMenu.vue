<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { menuLinks, socialLinks, menuCards } from '../data/site'
import MenuIcon from './MenuIcon.vue'

const props = defineProps({
  open: { type: Boolean, default: false },
})
const emit = defineEmits(['close'])
const route = useRoute()

const isOpen = computed(() => props.open)

function close() {
  emit('close')
}
</script>

<template>
  <Transition name="page-menu">
    <div v-if="isOpen" class="page-menu">
      <div class="page-menu__chrome">
        <span class="page-menu__language">EN</span>
        <button class="page-menu__close" type="button" aria-label="Close menu" @click="close">
          <span class="page-menu__close-icon-wrap">
            <MenuIcon variant="close" />
          </span>
        </button>
      </div>
      <div class="page-menu__frame">
        <div class="page-menu__inner">
          <div class="page-menu__left">
            <nav class="page-menu__nav" aria-label="Main navigation">
              <router-link
                v-for="link in menuLinks"
                :key="link.href"
                :to="link.href"
                class="page-menu__main-link"
                :aria-current="route.path === link.href ? 'page' : undefined"
                @click="close"
              >
                <span class="page-menu__main-link-label page-menu__main-link-label--base">{{ link.label }}</span>
                <span class="page-menu__main-link-label page-menu__main-link-label--fill" aria-hidden="true">{{
                  link.label
                }}</span>
              </router-link>
              <span class="page-menu__divider" aria-hidden="true"></span>
            </nav>
            <div class="page-menu__socials">
              <a
                v-for="social in socialLinks"
                :key="social.href"
                :href="social.href"
                target="_blank"
                rel="noopener noreferrer"
                class="page-menu__social-link"
              >
                <span>{{ social.label }}</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div class="page-menu__cards">
            <router-link
              v-for="card in menuCards"
              :key="card.title"
              :to="card.to"
              class="page-menu__card"
              :class="{ 'page-menu__card--feature': menuCards.indexOf(card) === 2 }"
              @click="close"
            >
              <video
                class="page-menu__card-media"
                :src="card.media"
                autoplay
                muted
                loop
                playsinline
                preload="metadata"
              ></video>
              <span class="page-menu__card-title">{{ card.title }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.page-menu {
  --page-menu-gutter: 48px;
  --page-menu-top: 128px;
  --page-menu-bottom: 48px;
  --page-menu-divider-color: #e3e3e3;
  background: #f9f9f9;
  clip-path: inset(0 0 0 0);
  color: #000;
  font-family: 'Maison Neue', sans-serif;
  inset: 0;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  position: fixed;
  transform-origin: top center;
  will-change: clip-path, opacity;
  z-index: 80;
}
.page-menu__chrome {
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  left: max(48px, calc(50% - 816px));
  position: fixed;
  right: max(48px, calc(50% - 816px));
  top: 48px;
  z-index: 2;
}
.page-menu__language {
  color: #000;
  font-size: 14px;
  font-weight: 300;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin-top: 7px;
  opacity: 0.8;
  text-transform: uppercase;
}
.page-menu__close {
  appearance: none;
  background: transparent;
  border: 0;
  color: #000;
  cursor: pointer;
  display: grid;
  height: 32px;
  padding: 0;
  place-items: center;
  position: relative;
  width: 32px;
  z-index: 2;
}
.page-menu__close :deep(svg) {
  display: block;
  height: 32px;
  transform-origin: center;
  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
  width: 32px;
}
.page-menu__close-icon-wrap {
  animation: page-menu-close-settle 0.42s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
  display: block;
}
.page-menu__close:focus-visible :deep(svg),
.page-menu__close:hover :deep(svg) {
  transform: rotate(90deg);
}
@keyframes page-menu-close-settle {
  0% {
    transform: rotate(-90deg);
  }
  to {
    transform: rotate(0);
  }
}
.page-menu__frame {
  height: 862px;
  margin: var(--page-menu-top) auto var(--page-menu-bottom);
  overflow: hidden;
  width: 1632px;
}
.page-menu__inner {
  display: grid;
  gap: 24px;
  grid-template-columns: 666px 942px;
  height: 862px;
  position: relative;
  transform-origin: top left;
  width: 1632px;
}
.page-menu__left {
  display: flex;
  flex-direction: column;
  height: 862px;
  justify-content: space-between;
  width: 666px;
}
.page-menu__nav {
  display: flex;
  flex-direction: column;
  flex: 0 0 420px;
  width: 666px;
}
.page-menu__divider {
  display: block;
  flex: 0 0 auto;
  height: 0;
  position: relative;
  width: 100%;
}
.page-menu__divider::before {
  background: var(--page-menu-divider-color);
  content: '';
  display: block;
  height: 1px;
  inset: 0 0 auto;
  position: absolute;
  width: 100%;
}
.page-menu__main-link {
  align-items: center;
  box-sizing: border-box;
  color: transparent;
  display: flex;
  flex: 0 0 70px;
  font-size: 63px;
  font-weight: 600;
  letter-spacing: -0.05em;
  line-height: 1.1;
  padding-top: 3px;
  position: relative;
  text-decoration: none;
  text-transform: uppercase;
  white-space: nowrap;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 1px rgba(0, 0, 0, 0.32);
}
.page-menu__main-link-label {
  display: block;
  white-space: nowrap;
}
.page-menu__main-link-label--base {
  color: transparent;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 1px rgba(0, 0, 0, 0.32);
}
.page-menu__main-link-label--fill {
  align-items: center;
  box-sizing: border-box;
  color: #000;
  display: flex;
  inset: 0;
  padding-top: 3px;
  position: absolute;
  -webkit-text-fill-color: currentColor;
  -webkit-text-stroke: 0;
  clip-path: inset(0 0 100% 0);
  pointer-events: none;
  transition: clip-path 0.75s cubic-bezier(0.22, 1, 0.36, 1);
}
.page-menu__main-link:focus-visible .page-menu__main-link-label--fill,
.page-menu__main-link:hover .page-menu__main-link-label--fill,
.page-menu__main-link[aria-current='page'] .page-menu__main-link-label--fill {
  clip-path: inset(0 0 0 0);
}
.page-menu__socials {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.page-menu__social-link {
  align-items: center;
  color: #000;
  display: inline-flex;
  font-size: 14px;
  gap: 4px;
  letter-spacing: -0.02em;
  line-height: 1.1;
  text-decoration: none;
  transition: transform 0.22s ease, opacity 0.22s ease;
  width: fit-content;
}
.page-menu__social-link:focus-visible,
.page-menu__social-link:hover {
  transform: translate(8px);
}
.page-menu__cards {
  align-content: start;
  display: grid;
  gap: 24px;
  grid-template-columns: 419px 499px;
  height: 862px;
  width: 942px;
}
.page-menu__card {
  background: #fff;
  border-radius: 8px;
  color: #000;
  display: block;
  height: 419px;
  overflow: hidden;
  position: relative;
  text-decoration: none;
  transition: transform 0.26s ease, box-shadow 0.26s ease;
  width: 419px;
}
.page-menu__card::after {
  background: #ffffff38;
  content: '';
  inset: 0;
  pointer-events: none;
  position: absolute;
  z-index: 1;
}
.page-menu__card--feature {
  height: 862px;
  width: 499px;
}
.page-menu__card-media {
  display: block;
  filter: brightness(1.04) saturate(0.86);
  height: 100%;
  object-fit: cover;
  opacity: 0.44;
  pointer-events: none;
  position: relative;
  transition: transform 0.36s ease, opacity 0.36s ease, filter 0.36s ease;
  width: 100%;
  z-index: 0;
}
.page-menu__card-title {
  bottom: 32px;
  font-size: 32px;
  font-weight: 700;
  left: 32px;
  letter-spacing: -0.05em;
  line-height: 1.1;
  position: absolute;
  text-transform: uppercase;
  z-index: 2;
}
.page-menu__card:focus-visible,
.page-menu__card:hover {
  box-shadow: 0 28px 80px #0000001a;
  transform: translateY(-6px);
}
.page-menu__card:focus-visible .page-menu__card-media,
.page-menu__card:hover .page-menu__card-media {
  filter: brightness(1.01) saturate(0.94);
  opacity: 0.56;
  transform: scale(1.035);
}
.page-menu-enter-active,
.page-menu-leave-active {
  transition: clip-path 0.64s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.42s ease;
}
.page-menu-enter-from,
.page-menu-leave-to {
  clip-path: inset(0 0 100% 0);
  opacity: 0.2;
}
.page-menu-enter-to,
.page-menu-leave-from {
  clip-path: inset(0 0 0 0);
  opacity: 1;
}
@media (max-width: 960px) {
  .page-menu {
    --page-menu-gutter: 24px;
    --page-menu-top: 120px;
    --page-menu-bottom: 24px;
  }
  .page-menu__chrome {
    left: 24px;
    right: 24px;
    top: 24px;
  }
  .page-menu__frame {
    height: auto;
    margin-bottom: var(--page-menu-bottom);
    margin-top: var(--page-menu-top);
    width: min(calc(100% - var(--page-menu-gutter) * 2), 392px);
  }
  .page-menu__inner {
    gap: 60px;
    grid-template-columns: 1fr;
    height: auto;
    min-height: auto;
    transform: none;
    width: 100%;
  }
  .page-menu__left {
    gap: 60px;
    height: auto;
    justify-content: flex-start;
    width: 100%;
  }
  .page-menu__nav {
    flex: 0 0 auto;
    width: 100%;
  }
  .page-menu__main-link {
    flex-basis: 70px;
    font-size: 56px;
  }
  .page-menu__cards {
    grid-template-columns: 1fr;
    height: auto;
    width: 100%;
  }
  .page-menu__card,
  .page-menu__card--feature {
    height: 220px;
    width: 100%;
  }
  .page-menu__card-title {
    bottom: 24px;
    font-size: 24px;
    left: 24px;
  }
}
</style>
