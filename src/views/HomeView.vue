<script setup>
import { ref, computed, onMounted } from 'vue'
import PageTopHeader from '../components/PageTopHeader.vue'
import YooFooter from '../components/YooFooter.vue'
import HomeCtaButton from '../components/HomeCtaButton.vue'
import { assets } from '../data/site'
import { homeProjects } from '../data/projects'
import { homeExpertise } from '../data/expertise'
import { observeLineMasks } from '../composables/useReveal'

defineProps({ theme: { type: String, default: 'dark' } })
const emit = defineEmits(['open-menu'])

const activeTab = ref(0)
const videoReady = ref(false)

const activeExpertise = computed(() => homeExpertise[activeTab.value])

// Split headline into accent words (accentWords defined per tab).
function currentHeadline() {
  const text = activeExpertise.value.headline
  const accents = activeExpertise.value.accentWords || []
  const words = text.split(' ')
  return words.map((w) => ({ word: w, accent: accents.includes(w) }))
}

// Projects rows layout (desktop) matching the reference widths.
const projectRows = [
  {
    className: 'row-1',
    cards: [
      { ...homeProjects[0], widthClass: 'w-804', imgClass: '', imgH: null },
      { ...homeProjects[1], widthClass: 'w-390', imgClass: 'h-520', imgH: null },
      { ...homeProjects[2], widthClass: 'w-390', imgClass: 'h-520', imgH: null },
    ],
  },
  {
    className: 'row-2',
    cards: [
      { ...homeProjects[3], widthClass: 'w-390', imgClass: 'h-520', imgH: null },
      { ...homeProjects[4], widthClass: 'w-804', imgClass: '', imgH: null },
    ],
  },
  {
    className: 'row-3',
    cards: [
      { ...homeProjects[5], widthClass: 'w-942', imgClass: 'h-529', imgH: null },
      { ...homeProjects[6], widthClass: 'w-390', imgClass: 'h-529', imgH: null },
    ],
  },
]

onMounted(() => {
  const video = document.querySelector('.hero-video')
  if (video) {
    video.addEventListener('canplay', () => (videoReady.value = true))
    if (video.readyState >= 3) videoReady.value = true
  }
  const root = document.querySelector('.home-page')
  if (root) observeLineMasks(root)
})

function onTab(i) {
  activeTab.value = i
}
</script>

<template>
  <div class="home-page">
    <!-- HERO -->
    <section class="hero">
      <div class="hero-bg-layer" aria-hidden="true">
        <video
          class="hero-video"
          :class="{ 'is-ready': videoReady }"
          :src="assets.heroVideo"
          autoplay
          muted
          playsinline
          loop
          preload="auto"
          disablepictureinpicture
          disableremoteplayback
        ></video>
        <div class="hero-overlay"></div>
      </div>
      <PageTopHeader theme="dark" @open-menu="emit('open-menu')" />
      <div class="hero-links">
        <a href="#home-expertise-section" class="hero-link-button hero-link-active" aria-label="EXPERTISE">
          <span class="hero-link-label hero-link-label--base">EXPERTISE</span>
          <span class="hero-link-label hero-link-label--fill" aria-hidden="true">EXPERTISE</span>
        </a>
        <a href="#home-projects-section" class="hero-link-button hero-link-inactive" aria-label="PROJECTS">
          <span class="hero-link-label hero-link-label--base">PROJECTS</span>
          <span class="hero-link-label hero-link-label--fill" aria-hidden="true">PROJECTS</span>
        </a>
      </div>
      <div class="scroll-down">
        <p>SCROLL DOWN</p>
        <div class="scroll-icon">
          <span class="scroll-line" aria-hidden="true"><span class="scroll-line-highlight"></span></span>
        </div>
      </div>
    </section>

    <!-- EXPERTISE -->
    <section id="home-expertise-section" class="expertise">
      <div class="expertise-canvas">
        <div class="section-nav">
          <p class="active">EXPERTISE</p>
          <p class="inactive">PROJECTS</p>
        </div>
        <div class="expertise-stage">
          <div class="expertise-left">
            <div class="expertise-copy-shell">
              <p class="big-copy" :key="activeTab">
                <span class="big-copy-line-mask">
                  <span class="big-copy-line" data-line-reveal>
                    <template v-for="(part, i) in currentHeadline()" :key="i">
                      <span v-if="part.accent" class="big-copy-accent">{{ part.word }}</span>
                      <template v-else>{{ part.word }}</template>{{ ' ' }}
                    </template>
                  </span>
                </span>
              </p>
            </div>
            <HomeCtaButton class="expertise-btn" :label="activeExpertise.cta" :href="activeExpertise.href" />
          </div>
          <div class="expertise-right" role="tablist" aria-label="Homepage expertise tabs">
            <button
              v-for="(tab, i) in homeExpertise"
              :key="tab.id"
              type="button"
              class="expertise-tab"
              :class="{ 'is-active': activeTab === i }"
              role="tab"
              :aria-selected="activeTab === i"
              :tabindex="activeTab === i ? 0 : -1"
              @click="onTab(i)"
            >
              <span class="expertise-tab__label expertise-tab__label--base">{{ tab.label }}</span>
              <span class="expertise-tab__label expertise-tab__label--fill" aria-hidden="true">{{ tab.label }}</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- PROJECTS -->
    <div id="home-projects-section" class="home-page-shell">
      <div class="home-page-canvas">
        <section class="projects">
          <p class="bg-word bg-word-1">SELECTED PROJECTS</p>
          <p class="bg-word bg-word-2">SELECTED PROJECTS</p>
          <p class="bg-word bg-word-3">SELECTED PROJECTS</p>
          <div class="section-nav projects-nav">
            <p class="inactive">WHAT WE DO</p>
            <p class="active">PROJECTS</p>
          </div>
          <div class="projects-container">
            <div class="projects-copy-shell">
              <p class="projects-copy">
                <span class="projects-copy-line-mask">
                  <span class="projects-copy-line" data-line-reveal
                    >Offering <span class="projects-copy-accent">perfectionist</span>
                    <span class="projects-copy-accent">solutions,</span>
                    leveraging our global <span class="projects-copy-accent">experiences.</span>
                  </span>
                </span>
              </p>
            </div>
            <div class="projects-list">
              <div v-for="row in projectRows" :key="row.className" class="project-row" :class="row.className">
                <router-link
                  v-for="(card, ci) in row.cards"
                  :key="ci"
                  :to="`/projects/${card.slug}`"
                  class="project-card project-card-link"
                  :class="[`project-card-${ci + 1 + (row.className === 'row-2' ? 3 : row.className === 'row-3' ? 5 : 0)}`, card.widthClass]"
                  :aria-label="card.title"
                >
                  <div class="project-image" :class="card.imgClass">
                    <div class="project-media-crop">
                      <img :src="card.image" :alt="card.title" class="project-media-element" loading="lazy" decoding="async" />
                    </div>
                  </div>
                  <div class="project-info">
                    <p class="cat">{{ card.category }}</p>
                    <p class="title">{{ card.title }}</p>
                  </div>
                </router-link>
              </div>
            </div>
            <HomeCtaButton class="projects-btn" label="SEE ALL PROJECTS" href="/projects" />
          </div>
        </section>
      </div>
    </div>

    <YooFooter />
  </div>
</template>

<style scoped>
.home-page {
  align-items: stretch;
  background: #f9f9f9;
  color: #000;
  display: flex;
  flex-direction: column;
  font-family: 'Maison Neue', sans-serif;
  font-synthesis: none;
  overflow-x: clip;
  width: 100%;
}
.home-page > * {
  flex: 0 0 auto;
  width: 100%;
}

/* HERO */
.hero {
  background: #000;
  font-family: 'Maison Neue', sans-serif;
  height: 100svh;
  min-height: 720px;
  overflow: hidden;
  position: relative;
  width: 100%;
}
.hero-bg-layer {
  background: #000;
  inset: 0;
  position: absolute;
}
.hero-overlay {
  background: linear-gradient(180deg, #0000004d, #0000001f 34%, #0006);
  inset: 0;
  pointer-events: none;
  position: absolute;
}
.hero-video {
  display: block;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: 0;
  transform: scale(1.02);
  transition: opacity 0.6s ease;
  width: 100%;
  pointer-events: none;
  position: absolute;
  inset: 0;
}
.hero-video.is-ready {
  opacity: 1;
}
.hero-links {
  align-items: center;
  bottom: 48px;
  color: transparent;
  display: flex;
  font-size: 112px;
  font-weight: 700;
  justify-content: space-between;
  left: 50%;
  letter-spacing: -5.6px;
  line-height: 0.814;
  position: absolute;
  text-transform: uppercase;
  transform: translate(-50%);
  width: min(calc(100% - 96px), 1632px);
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 1px #fff;
  pointer-events: none;
  z-index: 3;
}
.hero-link-button {
  background: transparent;
  border: 0;
  color: transparent;
  flex: none;
  font: inherit;
  letter-spacing: inherit;
  line-height: inherit;
  margin: 0;
  padding: 0;
  position: relative;
  text-transform: inherit;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 1px #fff;
  cursor: pointer;
  opacity: 0.5;
  pointer-events: auto;
  text-decoration: none;
  transition: opacity 0.22s ease;
  display: inline-block;
}
.hero-link-label {
  display: block;
  white-space: nowrap;
}
.hero-link-label--base {
  color: transparent;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 1px #fff;
}
.hero-link-label--fill {
  color: #fff;
  inset: -0.18em -5px -0.22em -4px;
  padding-top: 0.18em;
  position: absolute;
  -webkit-text-fill-color: currentColor;
  -webkit-text-stroke: 0;
  clip-path: inset(0 0 100% 0);
  pointer-events: none;
  text-shadow: 0 0 0 #fff, 0.55px 0 0 #fff, -0.55px 0 0 #fff;
  transition: clip-path 0.75s cubic-bezier(0.22, 1, 0.36, 1);
}
.hero-link-button:hover,
.hero-link-button:focus-visible {
  opacity: 1;
}
.hero-link-button:hover .hero-link-label--fill,
.hero-link-button:focus-visible .hero-link-label--fill,
.hero-link-button.hero-link-active .hero-link-label--fill {
  clip-path: inset(0 0 0 0);
}
.hero-link-button.hero-link-active {
  opacity: 1;
}
.hero-link-button.hero-link-inactive {
  opacity: 0.5;
}
.scroll-down {
  align-items: center;
  bottom: 33px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  left: 50%;
  position: absolute;
  transform: translate(-50%);
}
.scroll-down p {
  color: #fff;
  font-size: 11px;
  font-weight: 300;
  letter-spacing: -0.11px;
  line-height: 1.1;
  margin: 0;
  text-align: center;
  text-transform: uppercase;
}
.scroll-icon {
  height: 38px;
  opacity: 0.5;
  position: relative;
  width: 10px;
}
.scroll-line {
  background: #ffffff57;
  height: 42px;
}
.scroll-line,
.scroll-line-highlight {
  border-radius: 999px;
  display: block;
  left: 50%;
  position: absolute;
  top: 0;
  transform: translate(-50%);
  transform-origin: center top;
  width: 2px;
}
.scroll-line-highlight {
  animation: hero-scroll-line-highlight 1.7s ease-in-out infinite;
  background: #fff;
  height: 12px;
}
@keyframes hero-scroll-line-highlight {
  0%,
  to {
    height: 10px;
    opacity: 0.98;
    width: 2px;
  }
  50% {
    height: 16px;
    opacity: 1;
    width: 3px;
  }
}

/* EXPERTISE */
.expertise {
  position: relative;
  --expertise-side-padding: clamp(24px, 2.8vw, 48px);
  --expertise-top-padding: clamp(32px, 4.5svh, 48px);
  background: #f9f9f9;
  font-family: 'Maison Neue', sans-serif;
  min-height: max(720px, 100svh);
  width: 100%;
}
.expertise-canvas {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: clamp(28px, 3.5svh, 44px);
  height: 100svh;
  margin: 0 auto;
  min-height: 720px;
  overflow: clip;
  padding: var(--expertise-top-padding) var(--expertise-side-padding);
  position: sticky;
  top: 0;
  width: min(100%, 1728px);
}
.section-nav {
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  font-size: clamp(36px, 2.8vw, 48px);
  font-weight: 700;
  justify-content: space-between;
  letter-spacing: -2.4px;
  line-height: 0.814;
  margin: 0 auto;
  text-transform: uppercase;
  width: min(100%, 1633px);
}
.section-nav p {
  margin: 0;
}
.section-nav .active {
  color: #000;
}
.section-nav .inactive {
  color: transparent;
  opacity: 0.3;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 1px #000;
}
.expertise-stage {
  flex: 1 1 auto;
  min-height: 0;
  position: relative;
}
.expertise-left {
  display: flex;
  flex-direction: column;
  gap: clamp(32px, 5svh, 60px);
  left: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: min(1220px, calc(100% - clamp(280px, 31vw, 520px)));
}
.expertise-copy-shell {
  align-items: flex-start;
  display: flex;
  margin-bottom: -0.06em;
  min-height: clamp(168px, 19vw, 264px);
  overflow: hidden;
  padding-bottom: 0.06em;
  position: relative;
}
.big-copy {
  font-size: clamp(42px, 5.05vw, 88px);
  font-weight: 300;
  letter-spacing: -6.16px;
  line-height: 1.16;
  margin: 0;
  white-space: pre-wrap;
  width: 100%;
}
.big-copy-line-mask {
  display: block;
  margin-bottom: -0.28em;
  overflow: hidden;
  padding-bottom: 0.28em;
}
.big-copy-line {
  display: inline-block;
  line-height: inherit;
  will-change: transform;
  opacity: 0;
  transform: translateY(100%);
  transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s ease;
}
.big-copy-line[data-line-reveal] {
  opacity: 1;
  transform: translateY(0);
}
.big-copy-accent {
  color: #a63437;
  display: inline-block;
  font-family: 'Fraunces', serif;
  font-size: clamp(48px, 5.9vw, 102px);
  font-style: italic;
  font-variation-settings: 'SOFT' 0, 'WONK' 1;
  font-weight: 400;
  letter-spacing: -6.12px;
  line-height: 1;
  vertical-align: baseline;
}
.expertise-btn {
  align-self: flex-start;
}
.expertise-right {
  align-items: flex-end;
  bottom: 0;
  display: flex;
  flex-direction: column;
  font-size: clamp(48px, 6.5vw, 112px);
  font-weight: 700;
  gap: clamp(6px, 1.1svh, 12px);
  letter-spacing: -5.6px;
  line-height: 0.814;
  position: absolute;
  right: 0;
  text-transform: uppercase;
}
.expertise-tab {
  background: transparent;
  border: 0;
  color: inherit;
  cursor: pointer;
  font: inherit;
  letter-spacing: inherit;
  line-height: inherit;
  padding: 0;
  position: relative;
  text-transform: inherit;
}
.expertise-tab__label {
  display: block;
  white-space: nowrap;
}
.expertise-tab__label--base {
  color: rgba(0, 0, 0, 0.2);
}
.expertise-tab__label--fill {
  clip-path: inset(0 0 100% 0);
  color: #000;
  inset: -0.18em -5px -0.22em -4px;
  padding-top: 0.18em;
  pointer-events: none;
  position: absolute;
  transition: clip-path 2.14s cubic-bezier(0.22, 1, 0.36, 1);
}
.expertise-tab.is-active .expertise-tab__label--fill,
.expertise-tab:hover .expertise-tab__label--fill {
  clip-path: inset(0 0 0 0);
}

/* PROJECTS (fixed 1728px canvas scaled down) */
.home-page-shell {
  --home-scale: min(1, calc(100vw / 1728px));
  background: #fff;
  display: flex;
  height: calc(3480px * var(--home-scale));
  justify-content: center;
  overflow: hidden;
  position: relative;
  width: 100%;
}
.home-page-shell::before {
  background: #0000001a;
  content: '';
  height: 1px;
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
}
.home-page-canvas {
  transform: scale(var(--home-scale));
  transform-origin: top center;
  width: 1728px;
}
.projects {
  background: #fff;
  font-family: 'Maison Neue', sans-serif;
  height: 3480px;
  overflow: visible;
  position: relative;
  width: 1728px;
  --bg-word-stroke-color: rgba(0, 0, 0, 0.1);
}
.bg-word {
  left: calc((1728px - 100vw / var(--home-scale, 1)) / 2);
  position: absolute;
  --bg-word-travel-start: -120%;
  --bg-word-travel-end: calc(100vw / var(--home-scale, 1) + 120px);
  color: transparent;
  font-size: 263.742px;
  font-style: italic;
  font-weight: 700;
  letter-spacing: -13.187px;
  line-height: 0.814;
  margin: 0;
  text-transform: uppercase;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 1px var(--bg-word-stroke-color);
  animation: bg-word-marquee-x 24s linear infinite;
  pointer-events: none;
  white-space: nowrap;
  will-change: transform;
}
.bg-word-1 {
  top: 1309.5px;
}
.bg-word-2 {
  animation-duration: 28s;
  animation-name: bg-word-marquee-x-reverse;
  top: 2010px;
}
.bg-word-3 {
  animation-duration: 26s;
  top: 3048px;
}
@keyframes bg-word-marquee-x {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(calc(100vw / var(--home-scale, 1) + 240px), 0, 0);
  }
}
@keyframes bg-word-marquee-x-reverse {
  0% {
    transform: translate3d(calc(100vw / var(--home-scale, 1) + 240px), 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
.projects-nav {
  top: 44px;
  position: absolute;
}
.projects-container {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 96px;
  left: 48px;
  position: absolute;
  top: 399px;
  width: 1632px;
}
.projects-copy-shell {
  margin-bottom: -0.06em;
  overflow: hidden;
  padding-bottom: 0.06em;
  position: relative;
  width: 100%;
}
.projects-copy {
  font-size: 88px;
  font-weight: 300;
  letter-spacing: -6.16px;
  line-height: 1.16;
  margin: 0;
  white-space: pre-wrap;
  width: 100%;
}
.projects-copy-line-mask {
  display: block;
  margin-bottom: -0.28em;
  overflow: hidden;
  padding-bottom: 0.28em;
}
.projects-copy-line {
  display: inline-block;
  line-height: inherit;
  will-change: transform;
  opacity: 0;
  transform: translateY(100%);
  transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s ease;
}
.projects-copy-line[data-line-reveal] {
  opacity: 1;
  transform: translateY(0);
}
.projects-copy-accent {
  color: #a63437;
  font-family: 'Fraunces', serif;
  font-size: 102px;
  font-style: italic;
  font-variation-settings: 'SOFT' 0, 'WONK' 1;
  font-weight: 400;
  letter-spacing: -6.12px;
  line-height: inherit;
}
.projects-list {
  display: flex;
  flex-direction: column;
  gap: 48px;
  width: 1632px;
}
.project-row {
  display: flex;
  gap: 24px;
}
.row-1,
.row-2 {
  align-items: flex-start;
}
.row-2 {
  justify-content: flex-end;
}
.row-3 {
  align-items: flex-start;
  justify-content: space-between;
}
.project-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  transform-origin: top left;
  z-index: 2;
}
.project-card-link {
  color: inherit;
  cursor: pointer;
  text-decoration: none;
}
.w-804 {
  width: 804px;
}
.w-390 {
  width: 390px;
}
.w-942 {
  width: 942px;
}
.project-image {
  backface-visibility: hidden;
  border-radius: 8px;
  height: 804px;
  overflow: hidden;
  position: relative;
  transition: border-radius 0.26s cubic-bezier(0.22, 1, 0.36, 1);
  width: 100%;
}
.project-media-crop {
  position: absolute;
  inset: 0;
  transform-origin: top left;
  transition: transform 0.22s ease;
}
.project-media-element {
  display: block;
  height: 100%;
  object-fit: cover;
  width: 100%;
  pointer-events: none;
}
.h-520 {
  height: 520px;
}
.h-529 {
  height: 529px;
}
@media (hover: hover) and (pointer: fine) {
  .project-card-link:hover .project-image,
  .project-card-link:focus-visible .project-image {
    border-radius: 8px 8px 8px 48px;
  }
  .project-card-link:hover .project-media-crop,
  .project-card-link:focus-visible .project-media-crop {
    transform: scale(1.02);
  }
}
.project-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
  text-transform: uppercase;
  width: 100%;
}
.project-info .cat {
  font-size: 11px;
  font-weight: 300;
  letter-spacing: 0.22px;
  line-height: 0.814;
  margin: 0;
}
.project-info .title {
  font-size: 20px;
  font-weight: 400;
  letter-spacing: -1px;
  line-height: 1.1;
  margin: 0;
}

@media (max-width: 1024px) {
  .hero {
    min-height: 640px;
  }
  .hero-links {
    bottom: 32px;
    font-size: clamp(48px, 9vw, 80px);
    letter-spacing: -0.05em;
    width: calc(100% - 48px);
  }
  .scroll-down {
    bottom: 24px;
  }
  .expertise-left {
    width: min(100%, calc(100% - 304px));
  }
}

@media (max-width: 768px) {
  .hero {
    height: 980px;
    min-height: 980px;
    overflow: visible;
    padding-bottom: 24px;
  }
  .hero-links {
    font-size: 28px;
    letter-spacing: -1.12px;
    left: 50%;
    top: calc(100svh - 24px - 24px);
    transform: translateX(-50%);
    width: min(392px, calc(100% - 48px));
  }
  .scroll-down {
    bottom: 44px;
  }
  .scroll-down p {
    display: none;
  }
  .expertise {
    min-height: max(956px, 100svh);
    background: #f5f5f5;
    --expertise-side-padding: 24px;
    --expertise-top-padding: 32px;
  }
  .expertise-canvas {
    gap: 24px;
    height: min(956px, 100svh);
    min-height: 0;
  }
  .section-nav {
    font-size: 28px;
    letter-spacing: -1.12px;
    width: min(392px, 100%);
  }
  .expertise-left {
    gap: 32px;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: min(392px, 100%);
  }
  .expertise-copy-shell {
    min-height: 240px;
  }
  .big-copy {
    font-size: 42px;
    letter-spacing: -3.22px;
  }
  .big-copy-accent {
    font-size: 48px;
    letter-spacing: -2.88px;
  }
  .expertise-right {
    align-items: flex-end;
    bottom: 0;
    font-size: 53px;
    gap: 6px;
    left: 0;
    letter-spacing: -2.65px;
    line-height: 37px;
    right: auto;
    width: min(392px, 100%);
  }
  .expertise-tab {
    line-height: 37px;
  }

  /* Projects mobile */
  .home-page-shell {
    --home-scale: 1;
    background: #f5f5f5;
    height: auto;
    justify-content: stretch;
    overflow: visible;
  }
  .home-page-shell::before {
    display: none;
  }
  .home-page-canvas {
    transform: none;
    width: 100%;
  }
  .projects {
    background: #f5f5f5;
    height: auto;
    overflow: visible;
    width: 100%;
  }
  .bg-word,
  .section-nav {
    display: none;
  }
  .projects-container {
    align-items: stretch;
    gap: 40px;
    left: auto;
    margin: 0 auto;
    padding: 60px 0;
    position: relative;
    top: auto;
    width: min(392px, calc(100% - 48px));
  }
  .projects-copy {
    font-size: 42px;
    letter-spacing: -3.22px;
  }
  .projects-copy-accent {
    font-size: 48px;
    letter-spacing: -2.88px;
  }
  .projects-list {
    display: block;
    width: 100%;
  }
  .project-row {
    flex-direction: column;
    gap: 40px;
  }
  .project-row + .project-row {
    margin-top: 40px;
  }
  .project-card {
    gap: 12px;
    width: auto !important;
  }
  .project-card:nth-child(odd) {
    width: 73.469% !important;
    align-self: flex-start;
  }
  .project-card:nth-child(even) {
    width: 59.694% !important;
    align-self: flex-end;
  }
  .project-image {
    border-radius: 8px !important;
    height: auto;
    width: 100%;
  }
  .project-image.h-520,
  .project-image.h-529 {
    aspect-ratio: 3 / 4;
  }
  .project-image:not(.h-520):not(.h-529) {
    aspect-ratio: 1 / 1;
  }
  .project-info {
    gap: 12px;
  }
  .project-info .cat {
    font-size: 10px;
    letter-spacing: 0.2px;
  }
  .project-info .title {
    font-size: 17px;
    letter-spacing: -0.85px;
  }
  .projects-btn {
    margin-left: 18.88%;
  }
}
</style>
