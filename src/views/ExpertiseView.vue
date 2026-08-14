<script setup>
import { onMounted, ref } from 'vue'
import PageTopHeader from '../components/PageTopHeader.vue'
import YooFooter from '../components/YooFooter.vue'
import HomeCtaButton from '../components/HomeCtaButton.vue'
import { expertisePage } from '../data/expertise'
import { observeLineMasks } from '../composables/useReveal'

defineProps({ theme: { type: String, default: 'light' } })
const emit = defineEmits(['open-menu'])

const dividerSrc = 'https://media.yoointerior.com/assets/expertise/sections/divider.svg'

// Split headline into main + accent words. Accent = last 1-2 words.
function headlineParts(headline) {
  const words = headline.split(' ')
  const accentSet = new Set()
  // heuristic: accent the last word, and word before last if it's short
  accentSet.add(words.length - 1)
  if (words.length > 2 && words[words.length - 2].length <= 4) accentSet.add(words.length - 2)
  return words.map((w, i) => ({ word: w, accent: accentSet.has(i) }))
}

onMounted(() => {
  observeLineMasks(document.querySelector('.expertise-page'))
})
</script>

<template>
  <div class="expertise-page">
    <PageTopHeader theme="light" @open-menu="emit('open-menu')" />
    <div class="expertise-page-shell">
      <div class="expertise-page-content">
        <h1 class="expertise-page-title">
          <span class="line-mask-motion-text__mask">
            <span class="line-mask-motion-text__line" data-line-reveal>{{ expertisePage.title }}</span>
          </span>
        </h1>
        <div class="expertise-page-intro-shell">
          <p class="expertise-page-intro">
            <span class="expertise-page-intro-line-mask">
              <span class="expertise-page-intro-line" data-line-reveal>
                Every line is a <span class="expertise-page-intro-accent">decision</span>, Every decision is a
                <span class="expertise-page-intro-accent">feeling</span>
              </span>
            </span>
          </p>
        </div>

        <div class="expertise-page-sections">
          <section
            v-for="section in expertisePage.sections"
            :key="section.id"
            class="expertise-section-row"
            :data-section-id="section.id"
          >
            <div class="expertise-section-panel">
              <div class="expertise-section-copy">
                <div class="expertise-section-intro">
                  <div class="expertise-section-step">
                    <p class="step-number">{{ section.step }}</p>
                    <p class="step-title">{{ section.name }}</p>
                  </div>
                  <p class="expertise-section-headline">
                    <template v-for="(part, i) in headlineParts(section.headline)" :key="i">
                      <span v-if="part.accent" class="headline-accent">{{ part.word }}</span>
                      <span v-else class="headline-main">{{ part.word }}</span>{{ ' ' }}
                    </template>
                  </p>
                  <p class="expertise-section-description">{{ section.description }}</p>
                  <HomeCtaButton class="expertise-section-cta" label="SEE ALL PROJECTS" href="/projects" />
                </div>
                <div class="expertise-section-details">
                  <div class="expertise-section-details-track">
                    <template v-for="detail in section.details" :key="detail.title">
                      <img class="detail-divider" :src="dividerSrc" alt="" aria-hidden="true" />
                      <h3 class="detail-title">{{ detail.title }}</h3>
                      <p class="detail-text" :class="{ 'is-row-one': section.id === 'design' }">{{ detail.text }}</p>
                    </template>
                    <img class="detail-divider" :src="dividerSrc" alt="" aria-hidden="true" />
                  </div>
                </div>
              </div>
              <div class="expertise-section-gallery">
                <article v-for="card in section.gallery" :key="card.title" class="expertise-card">
                  <div class="expertise-card-image-frame">
                    <video
                      v-if="card.media.type === 'video'"
                      class="expertise-card-image"
                      :src="card.media.src"
                      autoplay
                      muted
                      loop
                      playsinline
                      preload="metadata"
                      aria-hidden="true"
                    ></video>
                    <img
                      v-else
                      class="expertise-card-image"
                      :src="card.media.src"
                      :alt="card.title"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div class="expertise-card-meta">
                    <p class="expertise-card-category">{{ card.category }}</p>
                    <p class="expertise-card-title">{{ card.title }}</p>
                  </div>
                </article>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    <YooFooter />
  </div>
</template>

<style scoped>
.expertise-page {
  --expertise-page-background: #fff;
  --expertise-page-header-width: 1632px;
  --expertise-page-header-gutter: 48px;
  --expertise-page-inline-padding: max(var(--expertise-page-header-gutter), calc((100vw - var(--expertise-page-header-width)) / 2));
  background: var(--expertise-page-background);
  color: #000;
  font-family: 'Maison Neue', sans-serif;
  overflow-x: clip;
  width: 100%;
}
.expertise-page-shell {
  box-sizing: border-box;
  margin: 0 auto;
  padding: clamp(24px, 2.778vw, 48px) 0 clamp(96px, 8.333vw, 144px);
  position: relative;
  width: 100%;
}
.expertise-page-content {
  padding-top: clamp(280px, 20.37vw, 352px);
  width: 100%;
}
.expertise-page-title {
  font-family: 'Maison Neue', sans-serif;
  font-size: clamp(88px, 6.481vw, 112px);
  font-weight: 700;
  letter-spacing: -5.6px;
  line-height: 0.814;
  margin: 0;
  text-align: center;
  text-transform: uppercase;
}
.expertise-page-title,
.expertise-page-intro-shell {
  box-sizing: border-box;
  padding: 0 var(--expertise-page-inline-padding);
  width: 100%;
}
.expertise-page-intro-shell {
  margin: clamp(60px, 4.804vw, 83px) 0 -0.06em;
  overflow: hidden;
  padding-bottom: 0.06em;
  position: relative;
}
.expertise-page-intro {
  font-size: clamp(64px, 5.093vw, 88px);
  font-weight: 300;
  letter-spacing: -0.07em;
  line-height: 1.16;
  margin: 0;
  white-space: pre-wrap;
  width: 100%;
}
.expertise-page-intro-line-mask {
  display: block;
  margin-bottom: -0.28em;
  overflow: hidden;
  padding-bottom: 0.28em;
}
.expertise-page-intro-line {
  display: inline-block;
  line-height: inherit;
  opacity: 0;
  transform: translateY(100%);
  transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s ease;
}
.expertise-page-intro-line[data-line-reveal] {
  opacity: 1;
  transform: translateY(0);
}
.expertise-page-intro-accent {
  color: #a63437;
  font-family: 'Fraunces', serif;
  font-size: clamp(72px, 5.903vw, 102px);
  font-style: italic;
  font-variation-settings: 'SOFT' 0, 'WONK' 1;
  font-weight: 400;
  letter-spacing: -0.06em;
  line-height: inherit;
}
.line-mask-motion-text__mask {
  display: block;
  overflow: hidden;
}
.line-mask-motion-text__line {
  display: inline-block;
  opacity: 0;
  transform: translateY(150%);
  transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s ease;
}
.line-mask-motion-text__line[data-line-reveal] {
  opacity: 1;
  transform: translateY(0);
}
.expertise-page-sections {
  align-items: stretch;
  display: flex;
  flex-direction: column;
  gap: 0;
  isolation: isolate;
  margin-top: clamp(80px, 5.903vw, 102px);
  width: 100%;
}

/* Sections */
.expertise-section-row {
  --expertise-section-row-padding: var(--expertise-page-inline-padding, max(48px, calc(50vw - 816px)));
  min-height: calc(max(760px, 100svh));
  position: relative;
  z-index: 1;
}
.expertise-section-panel {
  background: var(--expertise-page-background, #fff);
  width: 100%;
  align-items: stretch;
  box-sizing: border-box;
  column-gap: clamp(24px, 2.778vw, 48px);
  display: grid;
  grid-template-columns: minmax(320px, 34.497%) minmax(0, 1fr);
  height: max(760px, 100svh);
  overflow: hidden;
  padding: calc(var(--expertise-section-row-padding) + 30px) var(--expertise-section-row-padding)
    var(--expertise-section-row-padding);
  position: sticky;
  top: 0;
  z-index: 1;
}
.expertise-section-copy {
  display: flex;
  flex-direction: column;
  gap: clamp(42px, 3.167vw, 72px);
  height: 100%;
  min-height: 0;
  min-width: 0;
  overflow: hidden;
  width: 100%;
}
.expertise-section-intro {
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 32px;
  min-width: 0;
  width: 100%;
}
.expertise-section-step {
  align-items: center;
  color: #000;
  display: inline-flex;
  font-size: 32px;
  letter-spacing: -1.6px;
  line-height: 1;
  text-transform: uppercase;
  gap: 8px;
}
.expertise-section-step p {
  margin: 0;
}
.step-number {
  font-weight: 300;
}
.step-title {
  font-weight: 500;
}
.expertise-section-headline {
  color: #000;
  font-size: 0;
  line-height: 0;
  margin: 0;
  width: 100%;
}
.headline-main {
  font-family: 'Maison Neue', sans-serif;
  font-size: clamp(32px, 2.315vw, 40px);
  font-weight: 300;
  letter-spacing: -0.07em;
  line-height: 1;
}
.headline-accent {
  color: #a63437;
  font-family: 'Fraunces', serif;
  font-size: clamp(36px, 2.604vw, 45px);
  font-style: italic;
  font-variation-settings: 'SOFT' 0, 'WONK' 1;
  font-weight: 400;
  letter-spacing: -0.062em;
  line-height: 1;
}
.expertise-section-description {
  color: #000;
  font-size: clamp(20px, 1.273vw, 22px);
  font-weight: 300;
  line-height: 1.24;
  margin: 0;
  white-space: pre-line;
}
.expertise-section-cta {
  align-self: flex-start;
}
.expertise-section-details {
  flex: 1 1 auto;
  mask-image: linear-gradient(180deg, transparent, #000 42px, #000 calc(100% - 30px), transparent);
  -webkit-mask-image: linear-gradient(180deg, transparent, #000 42px, #000 calc(100% - 30px), transparent);
  min-height: 0;
  min-width: 0;
  overflow: hidden;
  width: 100%;
}
.expertise-section-details-track {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}
.detail-divider {
  display: block;
  height: 1px;
  object-fit: cover;
  width: 100%;
}
.detail-text,
.detail-title {
  color: #000;
  margin: 0;
}
.detail-title {
  font-size: 24px;
  font-weight: 500;
  line-height: 1.24;
}
.detail-text {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.3;
}
.detail-text.is-row-one {
  font-size: 17px;
  line-height: 1.4;
}
.expertise-section-gallery {
  align-items: flex-start;
  align-self: flex-start;
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  height: fit-content;
  min-width: 0;
  width: 100%;
}
.expertise-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
  width: 100%;
}
.expertise-card-image-frame {
  aspect-ratio: 390 / 520;
  background: #d9d9d9;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  width: 100%;
}
.expertise-card-image {
  display: block;
  height: 100%;
  object-fit: cover;
  object-position: center;
  position: absolute;
  width: 100%;
}
.expertise-card-meta {
  color: #000;
  display: flex;
  flex-direction: column;
  gap: 15px;
  text-transform: uppercase;
  width: 100%;
}
.expertise-card-category,
.expertise-card-title {
  margin: 0;
}
.expertise-card-category {
  font-size: 11px;
  font-weight: 300;
  letter-spacing: 0.22px;
  line-height: 0.814;
}
.expertise-card-title {
  font-size: 20px;
  font-weight: 400;
  letter-spacing: -1px;
  line-height: 1.1;
}

@media (max-width: 960px) {
  .expertise-section-row {
    min-height: auto;
  }
  .expertise-section-panel {
    grid-template-columns: 1fr;
    height: auto;
    position: relative;
    row-gap: 48px;
    top: auto;
    padding: 48px var(--expertise-section-row-padding);
  }
  .expertise-section-copy,
  .expertise-section-details {
    height: auto;
    overflow: visible;
  }
  .expertise-section-details {
    mask-image: none;
    -webkit-mask-image: none;
  }
}

@media (max-width: 768px) {
  .expertise-page {
    --expertise-page-header-width: 392px;
    --expertise-page-header-gutter: 24px;
    --expertise-page-inline-padding: 0;
    background: #fff;
  }
  .expertise-page-shell {
    margin: 0 auto;
    padding: 24px 24px 64px;
    width: min(100%, 440px);
  }
  .expertise-page-content {
    padding-top: 435px;
  }
  .expertise-page-title {
    font-size: 56px;
    letter-spacing: -2.8px;
    padding: 0;
  }
  .expertise-page-intro-shell {
    margin: 53px 0 -0.06em;
    padding: 0 0 0.06em;
  }
  .expertise-page-intro {
    font-size: 42px;
    letter-spacing: -2.94px;
  }
  .expertise-page-intro-accent {
    font-size: 48px;
    letter-spacing: -2.88px;
  }
  .expertise-page-sections {
    gap: 60px;
    isolation: auto;
    margin-top: 102px;
  }
  .expertise-section-panel {
    background: transparent;
    gap: 48px;
    overflow: visible;
    padding: 0;
    width: 100%;
  }
  .expertise-section-gallery {
    gap: 24px;
    grid-template-columns: 1fr;
  }
  .expertise-section-copy {
    gap: 48px;
  }
  .expertise-section-intro {
    gap: 32px;
  }
  .expertise-section-step {
    font-size: 24px;
    letter-spacing: -1.2px;
  }
  .headline-main {
    font-size: 28px;
    letter-spacing: -2.8px;
  }
  .headline-accent {
    font-size: 32px;
    letter-spacing: -2.24px;
  }
  .detail-title,
  .expertise-section-description {
    font-size: 20px;
  }
  .detail-text {
    font-size: 14px;
    line-height: 1.4;
  }
  .expertise-card {
    gap: 12px;
  }
  .expertise-card-meta {
    gap: 12px;
  }
  .expertise-card-category {
    font-size: 10px;
    letter-spacing: 0.2px;
  }
  .expertise-card-title {
    font-size: 17px;
    letter-spacing: -0.85px;
  }
}
</style>
