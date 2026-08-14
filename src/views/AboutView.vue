<script setup>
import { ref, onMounted } from 'vue'
import PageTopHeader from '../components/PageTopHeader.vue'
import YooFooter from '../components/YooFooter.vue'
import HomeCtaButton from '../components/HomeCtaButton.vue'
import {
  aboutHero,
  aboutIntro,
  storyRows,
  teamLeads,
  teamMembers,
  teamSection,
  joinSection,
  references,
  referenceSrc,
  report,
} from '../data/about'
import { observeLineMasks, createScrollRevealUpdater } from '../composables/useReveal'

defineProps({ theme: { type: String, default: 'dark' } })
const emit = defineEmits(['open-menu'])

const restOpen = ref(false)
const restOfUs = ref(false)

onMounted(() => {
  observeLineMasks(document.querySelector('.about-page'))
  const revealEls = document.querySelectorAll('[data-scroll-reveal]')
  revealEls.forEach((el) => createScrollRevealUpdater(el))
})

function toggleRestOfUs() {
  restOpen.value = !restOpen.value
  restOfUs.value = true
}

function splitAccent(text) {
  // accent the last word
  const words = text.split(' ')
  const last = words[words.length - 1]
  const head = words.slice(0, -1).join(' ')
  return { head, last }
}
</script>

<template>
  <div class="about-page" style="--about-accent: #a63437">
    <!-- HERO -->
    <section class="about-hero">
      <img class="about-hero-bg about-hero-bg-desktop" :src="aboutHero.desktop" alt="" aria-hidden="true" />
      <img class="about-hero-bg about-hero-bg-mobile" :src="aboutHero.mobile" alt="" aria-hidden="true" />
      <div class="about-hero-overlay" aria-hidden="true"></div>
      <PageTopHeader theme="dark" @open-menu="emit('open-menu')" />
      <h1 class="about-hero-title">
        <span class="line-mask-motion-text__mask">
          <span class="line-mask-motion-text__line" data-line-reveal>{{ aboutHero.title }}</span>
        </span>
      </h1>
      <div class="about-hero-scroll">
        <p>SCROLL DOWN</p>
        <div class="about-hero-scroll-icon">
          <span class="about-scroll-line"><span class="about-scroll-line-highlight"></span></span>
        </div>
      </div>
    </section>

    <div class="about-page-shell">
      <div class="about-page-canvas">
        <div class="about-content">
          <!-- INTRO -->
          <section class="about-intro">
            <div class="about-intro-heading-wrap">
              <div class="about-intro-heading-shell">
                <p class="about-intro-heading">
                  <span class="about-intro-heading-line-mask">
                    <span class="about-intro-heading-line" data-line-reveal>
                      A great <span class="about-intro-heading-accent">team</span> finds a way to
                      <span class="about-intro-heading-accent">win</span>
                    </span>
                  </span>
                </p>
              </div>
              <div class="about-signature">
                <img src="https://media.yoointerior.com/assets/about/icons/divider-line.svg" alt="" aria-hidden="true" />
                <span>{{ aboutIntro.signature }}</span>
              </div>
            </div>
            <p class="about-intro-description" data-scroll-reveal>{{ aboutIntro.description }}</p>
          </section>

          <!-- STORY -->
          <section class="about-story">
            <div class="story-row row-primary">
              <div class="story-text-column">
                <div class="story-showcase-image">
                  <video
                    v-if="storyRows[0].media.type === 'video'"
                    :src="storyRows[0].media.src"
                    autoplay
                    muted
                    loop
                    playsinline
                    aria-hidden="true"
                  ></video>
                  <img v-else :src="storyRows[0].media.src" alt="" aria-hidden="true" />
                </div>
                <div class="story-copy">
                  <div class="story-heading-shell">
                    <p class="story-heading">
                      <span class="story-heading-line-mask">
                        <span class="story-heading-line" data-line-reveal>
                          Design is a journey shaped through
                          <span class="story-heading-accent">research</span> and
                          <span class="story-heading-accent">spatial</span>
                          <span class="story-heading-accent">understanding</span>
                        </span>
                      </span>
                    </p>
                  </div>
                  <p class="story-description" data-scroll-reveal>{{ storyRows[0].description }}</p>
                </div>
              </div>
              <div class="story-image-column story-image-main">
                <img :src="storyRows[1].media.src" :alt="''" loading="lazy" decoding="async" />
              </div>
            </div>

            <div class="story-row row-secondary">
              <div class="story-image-column story-image-secondary">
                <img :src="storyRows[1].mediaSecondary.src" :alt="''" loading="lazy" decoding="async" />
              </div>
              <div class="story-side-column">
                <div class="story-tertiary-image">
                  <video
                    v-if="storyRows[2].media.type === 'video'"
                    :src="storyRows[2].media.src"
                    autoplay
                    muted
                    loop
                    playsinline
                    aria-hidden="true"
                  ></video>
                  <img v-else :src="storyRows[2].media.src" alt="" aria-hidden="true" />
                </div>
                <div class="story-paragraphs">
                  <p v-for="(para, i) in storyRows[2].paragraphs" :key="i" data-scroll-reveal>{{ para }}</p>
                </div>
              </div>
            </div>
          </section>

          <!-- TEAM -->
          <section class="about-team">
            <div class="about-section-heading">
              <h2 class="about-section-title">{{ teamSection.title }}</h2>
              <div class="about-section-subtitle-shell">
                <p class="about-section-subtitle">
                  <span class="about-section-subtitle-line-mask">
                    <span class="about-section-subtitle-line" data-line-reveal>
                      <span class="section-main">{{ teamSection.subtitle.split(' ').slice(0, -1).join(' ') }}</span>
                      <span class="section-accent">{{ teamSection.subtitle.split(' ').slice(-1)[0] }}</span>
                    </span>
                  </span>
                </p>
              </div>
            </div>

            <div class="team-cards-group">
              <div class="team-cards-row">
                <article
                  v-for="lead in teamLeads"
                  :key="lead.name"
                  class="team-lead-card"
                  tabindex="0"
                >
                  <img :src="lead.image" :alt="lead.name" loading="lazy" decoding="async" />
                  <div class="team-lead-overlay">
                    <p class="team-lead-name">{{ lead.name }}</p>
                    <img
                      class="team-lead-divider"
                      src="https://media.yoointerior.com/assets/about/icons/team-card-divider.svg"
                      alt=""
                      aria-hidden="true"
                    />
                    <div class="team-lead-meta">
                      <div class="team-meta-col">
                        <p class="team-meta-label">ROLE</p>
                        <p class="team-meta-value">{{ lead.role }}</p>
                      </div>
                      <div class="team-meta-col">
                        <p class="team-meta-label">EDUCATION</p>
                        <p class="team-meta-value">{{ lead.education }}</p>
                      </div>
                    </div>
                  </div>
                  <button class="team-member-more" type="button" :class="{ 'is-active': false }" aria-label="More">
                    <img src="https://media.yoointerior.com/assets/about/icons/more.svg" alt="" aria-hidden="true" />
                  </button>
                </article>
              </div>

              <div class="rest-of-us-stack">
                <HomeCtaButton
                  class="rest-of-us-btn"
                  :class="{ 'is-open': restOpen }"
                  label="REST OF US"
                  @click="toggleRestOfUs"
                />
                <div class="rest-of-us-gallery-shell" :class="{ 'is-open': restOpen }">
                  <div class="rest-of-us-gallery-inner">
                    <div class="rest-of-us-gallery-grid">
                      <article
                        v-for="(member, i) in teamMembers"
                        :key="member.name"
                        class="rest-of-us-gallery-card"
                        :class="{ 'has-overlay': member.role || member.education }"
                        :style="{ '--rest-of-us-card-delay': Math.min(0.28, i * 0.04) + 's' }"
                        tabindex="0"
                      >
                        <img :src="member.image" :alt="member.name" loading="lazy" decoding="async" />
                        <div class="team-lead-overlay rest-of-us-gallery-overlay">
                          <p class="team-lead-name rest-of-us-gallery-name">{{ member.name }}</p>
                          <img
                            class="team-lead-divider"
                            src="https://media.yoointerior.com/assets/about/icons/team-card-divider.svg"
                            alt=""
                            aria-hidden="true"
                          />
                          <div v-if="member.role || member.education" class="team-lead-meta rest-of-us-gallery-meta">
                            <div v-if="member.role" class="team-meta-col">
                              <p class="team-meta-label">ROLE</p>
                              <p class="team-meta-value">{{ member.role }}</p>
                            </div>
                            <div v-if="member.education" class="team-meta-col">
                              <p class="team-meta-label">EDUCATION</p>
                              <p class="team-meta-value">{{ member.education }}</p>
                            </div>
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- JOIN -->
          <section class="about-join">
            <div class="about-join-copy">
              <div class="about-join-copy-inner">
                <p class="about-join-title">
                  <span class="section-main">{{ joinSection.title.split('?')[0] }}?</span>
                </p>
                <p class="about-join-description">{{ joinSection.description }}</p>
                <HomeCtaButton class="join-cta-btn" :label="joinSection.cta" href="/contact" />
              </div>
            </div>
            <div class="about-join-image">
              <img :src="joinSection.image" alt="" loading="lazy" decoding="async" />
            </div>
          </section>

          <!-- REFERENCES -->
          <section class="about-references">
            <div class="about-section-heading">
              <h2 class="about-section-title">{{ references.title }}</h2>
              <div class="about-section-subtitle-shell">
                <p class="about-section-subtitle">
                  <span class="about-section-subtitle-line-mask">
                    <span class="about-section-subtitle-line" data-line-reveal>
                      <span class="section-main">{{ references.subtitle.split(' ').slice(0, -1).join(' ') }}</span>
                      <span class="section-accent">{{ references.subtitle.split(' ').slice(-1)[0] }}</span>
                    </span>
                  </span>
                </p>
              </div>
            </div>
            <div class="about-references-logos">
              <div class="reference-logo-row reference-logo-row-top">
                <div class="reference-logo-row-track reference-logo-row-top-inner">
                  <div v-for="g in 2" :key="'top-' + g" class="reference-logo-group" aria-hidden="true">
                    <div v-for="logo in references.topLogos" :key="logo" class="reference-logo-shell">
                      <img :src="referenceSrc(logo)" alt="" class="reference-logo" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="reference-logo-row reference-logo-row-bottom">
                <div class="reference-logo-row-track reference-logo-row-bottom-inner">
                  <div v-for="g in 6" :key="'bot-' + g" class="reference-logo-group" aria-hidden="true">
                    <div v-for="logo in references.bottomLogos" :key="logo" class="reference-logo-shell">
                      <img :src="referenceSrc(logo)" alt="" class="reference-logo" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- REPORT -->
          <section class="about-report">
            <div class="about-report-image">
              <img :src="report.image" alt="" loading="lazy" decoding="async" />
            </div>
            <div class="about-report-copy">
              <div class="about-report-copy-inner">
                <p class="about-report-title"><span class="section-main">{{ report.title }}</span></p>
                <p class="about-report-description">{{ report.description }}</p>
                <HomeCtaButton class="report-download-btn" label="Download" accent @click.prevent />
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
.about-page {
  --about-content-max-width: 1632px;
  --about-page-gutter: 48px;
  --about-page-section-gap: 240px;
  --about-page-content-width: min(calc(100% - var(--about-page-gutter) * 2), var(--about-content-max-width));
  color: #000;
  font-family: 'Maison Neue', sans-serif;
  margin: 0;
  overflow-x: hidden;
  background: #fff;
  position: relative;
  width: 100%;
}
.about-hero {
  background: #000;
  height: 100svh;
  min-height: 720px;
  overflow: hidden;
  position: relative;
  width: 100%;
}
.about-hero-bg {
  display: block;
  height: 100%;
  inset: 0;
  object-fit: cover;
  object-position: center;
  position: absolute;
  width: 100%;
}
.about-hero-bg-mobile {
  display: none;
}
.about-hero-overlay {
  background: #0006;
  inset: 0;
  position: absolute;
}
.about-hero-title {
  color: #fff;
  font-size: 112px;
  font-weight: 700;
  left: 50%;
  letter-spacing: -5.6px;
  line-height: 0.814;
  margin: 0;
  position: absolute;
  text-align: center;
  text-transform: uppercase;
  top: 50%;
  transform: translate(-50%, -50%);
  width: min(calc(100% - 96px), 1632px);
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
.about-hero-scroll {
  align-items: center;
  bottom: 33px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  left: 50%;
  position: absolute;
  transform: translate(-50%);
}
.about-hero-scroll p {
  color: #fff;
  font-size: 11px;
  font-weight:300;
  letter-spacing: -0.11px;
  line-height: 1.1;
  margin: 0;
  text-transform: uppercase;
}
.about-hero-scroll-icon {
  height: 38px;
  opacity: 0.5;
  position: relative;
  width: 10px;
}
.about-scroll-line {
  background: #ffffff57;
  height: 42px;
}
.about-scroll-line,
.about-scroll-line-highlight {
  border-radius: 999px;
  display: block;
  left: 50%;
  position: absolute;
  top: 0;
  transform: translate(-50%);
  width: 2px;
}
.about-scroll-line-highlight {
  animation: scroll-highlight 1.7s ease-in-out infinite;
  background: #fff;
  height: 12px;
}
@keyframes scroll-highlight {
  0%,
  to {
    height: 10px;
    opacity: 0.98;
  }
  50% {
    height: 16px;
    opacity: 1;
  }
}
.about-content {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: var(--about-page-section-gap);
  margin: 0 auto;
  padding: 96px 0 240px;
  position: relative;
  width: var(--about-page-content-width);
}
.about-intro {
  display: flex;
  flex-direction: column;
  gap: 96px;
}
.about-intro-heading-wrap {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.about-intro-heading-shell {
  margin-bottom: -0.06em;
  overflow: hidden;
  padding-bottom: 0.06em;
  position: relative;
}
.about-intro-heading {
  font-size: 88px;
  font-weight: 300;
  letter-spacing: -6.16px;
  line-height: 1.16;
  margin: 0;
  white-space: pre-wrap;
}
.about-intro-heading-line-mask {
  display: block;
  margin-bottom: -0.28em;
  overflow: hidden;
  padding-bottom: 0.28em;
}
.about-intro-heading-line {
  display: inline-block;
  opacity: 0;
  transform: translateY(100%);
  transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s ease;
}
.about-intro-heading-line[data-line-reveal] {
  opacity: 1;
  transform: translateY(0);
}
.about-intro-heading-accent {
  color: var(--about-accent);
  font-family: 'Fraunces', serif;
  font-size: 102px;
  font-style: italic;
  font-variation-settings: 'SOFT' 0, 'WONK' 1;
  font-weight: 400;
  letter-spacing: -6.12px;
  line-height: inherit;
}
.about-signature {
  align-items: center;
  display: flex;
  font-size: 14px;
  font-weight: 300;
  gap: 12px;
  justify-content: flex-end;
  letter-spacing: -0.14px;
  line-height: 1.1;
  margin-left: auto;
  max-width: 1078px;
  width: 66.053%;
}
.about-signature img {
  display: block;
  height: 1px;
  width: 15.5px;
}
.about-intro-description {
  font-size: 22px;
  font-weight: 300;
  letter-spacing: -1.54px;
  line-height: 1.24;
  margin: 0 0 0 auto;
  max-width: 816px;
  width: 50%;
}
[data-scroll-reveal] {
  --scroll-reveal-progress: 0;
  color: color-mix(
    in srgb,
    rgba(0, 0, 0, 0.28) calc((1 - var(--scroll-reveal-progress)) * 100%),
    #000 calc(var(--scroll-reveal-progress) * 100%)
  );
}
.about-story {
  display: flex;
  flex-direction: column;
  gap: 240px;
}
.story-row {
  align-items: stretch;
  display: flex;
  width: 100%;
}
.story-text-column {
  box-sizing: border-box;
  display: flex;
  flex: 0 0 50%;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
  padding: 0 clamp(48px, 5.392vw, 88px);
  gap: 48px;
}
.story-showcase-image {
  aspect-ratio: 640 / 340.179;
  background: #111;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  width: 100%;
}
.story-showcase-image img,
.story-showcase-image video,
.story-tertiary-image img,
.story-tertiary-image video,
.story-image-column img {
  display: block;
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.story-copy {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
}
.story-heading-shell {
  margin-bottom: -0.06em;
  overflow: hidden;
  padding-bottom: 0.06em;
  position: relative;
}
.story-heading {
  font-size: 40px;
  font-weight: 300;
  letter-spacing: -2.8px;
  line-height: 1.14;
  margin: 0;
}
.story-heading-line-mask {
  display: block;
  margin-bottom: -0.28em;
  overflow: hidden;
  padding-bottom: 0.28em;
}
.story-heading-line {
  display: inline-block;
  opacity: 0;
  transform: translateY(100%);
  transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s ease;
}
.story-heading-line[data-line-reveal] {
  opacity: 1;
  transform: translateY(0);
}
.story-heading-accent {
  color: var(--about-accent);
  font-family: 'Fraunces', serif;
  font-size: 45px;
  font-style: italic;
  font-variation-settings: 'SOFT' 0, 'WONK' 1;
  font-weight: 400;
  letter-spacing: -3.15px;
  line-height: inherit;
}
.story-description {
  font-size: 22px;
  font-weight: 300;
  letter-spacing: -1.54px;
  line-height: 1.24;
  margin: 0;
}
.story-image-column {
  background: #111;
  border-radius: 8px;
  flex: 0 0 50%;
  min-width: 0;
  overflow: hidden;
  position: relative;
}
.story-image-main {
  aspect-ratio: 816 / 1073.333;
}
.story-image-secondary {
  aspect-ratio: 816 / 1088;
}
.story-side-column {
  box-sizing: border-box;
  display: flex;
  flex: 0 0 50%;
  flex-direction: column;
  gap: 96px;
  justify-content: center;
  min-width: 0;
  padding: 0 clamp(48px, 5.392vw, 88px);
}
.story-tertiary-image {
  aspect-ratio: 640 / 359.801;
  background: #111;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  width: 100%;
}
.story-paragraphs {
  font-size: 22px;
  font-weight: 300;
  letter-spacing: -1.54px;
  line-height: 1.24;
  width: 100%;
}
.story-paragraphs p {
  margin: 0;
}
.story-paragraphs p + p {
  margin-top: 24px;
}
.about-team {
  display: flex;
  flex-direction: column;
  gap: 96px;
}
.about-section-heading {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.about-section-title {
  font-size: 88px;
  font-weight: 300;
  letter-spacing: -6.16px;
  line-height: 1;
  margin: 0;
}
.about-section-subtitle-shell {
  margin-bottom: -0.06em;
  overflow: hidden;
  padding-bottom: 0.06em;
  position: relative;
}
.about-section-subtitle {
  line-height: 1.14;
  margin: 0;
}
.about-section-subtitle,
.section-main {
  font-size: 40px;
  font-weight: 300;
  letter-spacing: -2.8px;
}
.about-section-subtitle-line-mask {
  display: block;
  margin-bottom: -0.28em;
  overflow: hidden;
  padding-bottom: 0.28em;
}
.about-section-subtitle-line {
  display: inline-block;
  opacity: 0;
  transform: translateY(100%);
  transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s ease;
}
.about-section-subtitle-line[data-line-reveal] {
  opacity: 1;
  transform: translateY(0);
}
.section-accent {
  color: var(--about-accent);
  font-family: 'Fraunces', serif;
  font-size: 45px;
  font-style: italic;
  font-variation-settings: 'SOFT' 0, 'WONK' 1;
  font-weight: 400;
  letter-spacing: -3.15px;
  line-height: inherit;
}
.team-cards-group {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 96px;
  width: 100%;
}
.team-cards-row {
  align-items: flex-start;
  display: flex;
  gap: 24px;
  justify-content: space-between;
  width: 100%;
}
.team-lead-card {
  align-items: flex-end;
  aspect-ratio: 528 / 704;
  backface-visibility: hidden;
  border-radius: 8px;
  box-sizing: border-box;
  display: flex;
  flex: 1 1 0;
  min-width: 0;
  overflow: hidden;
  padding: 16px;
  position: relative;
  transition: border-radius 0.26s cubic-bezier(0.22, 1, 0.36, 1);
}
.team-lead-card > img {
  height: 100%;
  inset: 0;
  object-fit: cover;
  position: absolute;
  width: 100%;
  z-index: 0;
}
.team-lead-overlay {
  backdrop-filter: blur(16px);
  background: #0006;
  border-radius: 8px;
  box-sizing: border-box;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 32px;
  opacity: 0;
  padding: 32px;
  pointer-events: none;
  position: relative;
  transform: translateY(18px);
  transition: border-radius 0.26s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.34s ease, transform 0.34s ease,
    visibility 0s linear 0.34s;
  visibility: hidden;
  width: 100%;
  z-index: 2;
}
.team-lead-name {
  font-size: 20px;
  font-weight: 400;
  letter-spacing: -1px;
  line-height: 1.1;
  margin: 0;
  text-transform: uppercase;
}
.team-lead-divider {
  display: block;
  height: 1px;
  width: 100%;
}
.team-lead-meta {
  display: flex;
  gap: 48px;
}
.team-meta-col {
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  gap: 15px;
  min-width: 0;
}
.team-meta-label {
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 0.24px;
  line-height: 0.814;
  margin: 0;
  opacity: 0.6;
  text-transform: uppercase;
}
.team-meta-value {
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.8px;
  line-height: 1.1;
  margin: 0;
}
.team-member-more {
  align-items: center;
  appearance: none;
  background: #000;
  border: 0;
  border-radius: 2222px;
  bottom: 24px;
  cursor: pointer;
  display: none;
  height: 40px;
  justify-content: center;
  padding: 0;
  position: absolute;
  right: 24px;
  width: 40px;
  z-index: 3;
}
.team-member-more img {
  display: block;
  height: 32px;
  width: 32px;
}
@media (hover: hover) and (pointer: fine) {
  .team-lead-card:hover,
  .team-lead-card:hover .team-lead-overlay {
    border-radius: 8px 8px 8px 48px;
  }
  .team-lead-card:hover .team-lead-overlay {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
    transition-delay: 0s;
    visibility: visible;
  }
}
.rest-of-us-stack {
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.rest-of-us-btn {
  align-self: center;
}
.rest-of-us-btn :deep(.home-cta-button__icon),
.rest-of-us-btn :deep(.home-cta-button__measure-icon) {
  transition: transform 0.34s cubic-bezier(0.22, 1, 0.36, 1);
}
.rest-of-us-btn.is-open :deep(.home-cta-button__icon),
.rest-of-us-btn.is-open :deep(.home-cta-button__measure-icon) {
  transform: rotate(90deg);
}
.rest-of-us-gallery-shell {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  pointer-events: none;
  transform: translateY(-24px);
  transition: grid-template-rows 0.52s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.28s ease,
    transform 0.52s cubic-bezier(0.22, 1, 0.36, 1);
  width: 100%;
}
.rest-of-us-gallery-shell.is-open {
  grid-template-rows: 1fr;
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}
.rest-of-us-gallery-inner {
  min-height: 0;
  overflow: hidden;
  padding-top: 0;
  transition: padding-top 0.52s cubic-bezier(0.22, 1, 0.36, 1);
}
.rest-of-us-gallery-shell.is-open .rest-of-us-gallery-inner {
  padding-top: 40px;
}
.rest-of-us-gallery-grid {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
.rest-of-us-gallery-card {
  aspect-ratio: 390 / 520;
  backface-visibility: hidden;
  background: #d9d5d2;
  border-radius: 8px;
  opacity: 0;
  overflow: hidden;
  position: relative;
  transform: translateY(32px) scale(0.975);
  transition: border-radius 0.26s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease,
    transform 0.56s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--rest-of-us-card-delay, 0s);
}
.rest-of-us-gallery-shell.is-open .rest-of-us-gallery-card {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.rest-of-us-gallery-card > img {
  display: block;
  height: 100%;
  object-fit: cover;
  width: 100%;
}
.rest-of-us-gallery-overlay {
  bottom: 0;
  gap: 10px;
  left: 0;
  padding: 24px;
  position: absolute;
  right: 0;
  transform: translateY(14px);
  width: 100%;
  border-radius: 0;
}
.rest-of-us-gallery-name {
  font-size: 18px;
  letter-spacing: -0.9px;
}
.rest-of-us-gallery-meta {
  flex-direction: column;
  gap: 10px;
}
.rest-of-us-gallery-meta .team-meta-col {
  gap: 10px;
}
.rest-of-us-gallery-meta .team-meta-label {
  font-size: 11px;
  letter-spacing: 0.22px;
}
.rest-of-us-gallery-meta .team-meta-value {
  font-size: 14px;
  letter-spacing: -0.7px;
}
@media (hover: hover) and (pointer: fine) {
  .rest-of-us-gallery-card.has-overlay:hover .rest-of-us-gallery-overlay {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
    transition-delay: 0s;
    visibility: visible;
  }
}
.about-join {
  align-items: stretch;
  display: flex;
  width: 100%;
}
.about-join-copy {
  align-items: center;
  aspect-ratio: 816 / 458;
  background: #e4e1de;
  border-radius: 8px 0 0 8px;
  box-sizing: border-box;
  display: flex;
  flex: 0 0 50%;
  justify-content: center;
  min-width: 0;
  padding: 0 clamp(48px, 5.392vw, 88px);
}
.about-join-copy-inner {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 640px;
  width: 100%;
}
.about-join-title {
  font-size: 40px;
  font-weight: 300;
  letter-spacing: -2.8px;
  line-height: 1.08;
  margin: 0;
}
.about-join-description {
  font-size: 22px;
  font-weight: 300;
  letter-spacing: -1.54px;
  line-height: 1.24;
  margin: 0;
}
.about-join-image {
  aspect-ratio: 816 / 458;
  border-radius: 0 8px 8px 0;
  flex: 0 0 50%;
  min-width: 0;
  overflow: hidden;
}
.about-join-image img {
  display: block;
  height: 100%;
  object-fit: cover;
  object-position: center;
  width: 100%;
}
.about-references {
  display: flex;
  flex-direction: column;
  gap: 96px;
}
.about-references-logos {
  --about-reference-logo-gap: 24px;
  --about-reference-logo-marquee-distance: calc(-50% - var(--about-reference-logo-gap) / 2);
  --about-reference-logo-top-duration: 44s;
  --about-reference-logo-bottom-duration: 52s;
  --about-reference-logo-size: 250px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
}
.reference-logo-row {
  overflow: hidden;
  width: 100%;
}
.reference-logo-row-track {
  width: max-content;
  will-change: transform;
}
.reference-logo-group,
.reference-logo-row-track {
  align-items: center;
  display: flex;
  gap: var(--about-reference-logo-gap);
}
.reference-logo-group {
  flex: none;
}
.reference-logo-row-top-inner {
  animation: reference-marquee-left var(--about-reference-logo-top-duration) linear infinite reverse;
}
.reference-logo-row-bottom-inner {
  animation: reference-marquee-left var(--about-reference-logo-bottom-duration) linear infinite;
}
.reference-logo-shell {
  align-items: center;
  background: #f7f7f7;
  border-radius: 8px;
  display: flex;
  flex: 0 0 var(--about-reference-logo-size);
  height: var(--about-reference-logo-size);
  justify-content: center;
  overflow: hidden;
  width: var(--about-reference-logo-size);
}
.reference-logo {
  display: block;
  flex: none;
  height: 100%;
  object-fit: contain;
  object-position: center;
  width: 100%;
  padding: 32px;
}
@keyframes reference-marquee-left {
  0% {
    transform: translateZ(0);
  }
  to {
    transform: translate3d(var(--about-reference-logo-marquee-distance), 0, 0);
  }
}
.about-report {
  align-items: stretch;
  display: flex;
  width: 100%;
}
.about-report-image {
  aspect-ratio: 816 / 458;
  flex: 0 0 50%;
  min-width: 0;
  overflow: hidden;
}
.about-report-image img {
  display: block;
  height: 100%;
  object-fit: cover;
  object-position: center;
  width: 100%;
}
.about-report-copy {
  align-items: center;
  aspect-ratio: 816 / 458;
  background: #e4e1de;
  border-radius: 0 8px 8px 0;
  box-sizing: border-box;
  display: flex;
  flex: 0 0 50%;
  justify-content: center;
  min-width: 0;
  padding: 0 clamp(48px, 5.392vw, 88px);
}
.about-report-copy-inner {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 640px;
  width: 100%;
}
.about-report-title {
  font-size: 40px;
  font-weight: 300;
  letter-spacing: -2.8px;
  line-height: 1.08;
  margin: 0;
}
.about-report-description {
  font-size: 22px;
  font-weight: 300;
  letter-spacing: -1.54px;
  line-height: 1.24;
  margin: 0;
}

@media (max-width: 1200px) {
  .about-page {
    --about-page-gutter: 32px;
    --about-page-section-gap: 120px;
  }
  .about-content {
    padding: 72px 0 160px;
  }
  .about-intro,
  .about-references,
  .about-team,
  .team-cards-group {
    gap: 72px;
  }
  .about-story {
    gap: 120px;
  }
  .about-intro-description,
  .about-signature {
    max-width: none;
    width: 100%;
  }
  .about-join,
  .about-report,
  .story-row {
    flex-direction: column;
    gap: 72px;
  }
  .about-join-copy,
  .about-join-image,
  .about-report-copy,
  .about-report-image,
  .story-image-column,
  .story-side-column,
  .story-text-column {
    flex-basis: auto;
    width: 100%;
  }
  .story-side-column,
  .story-text-column {
    padding: 0;
  }
  .team-cards-row {
    flex-direction: column;
  }
  .about-join-copy,
  .about-report-copy {
    aspect-ratio: auto;
    min-height: 320px;
    padding: 72px 48px;
  }
  .rest-of-us-gallery-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .about-page {
    --about-page-gutter: 24px;
    --about-page-section-gap: 60px;
    --about-story-mobile-gap: 36px;
    width: 100%;
  }
  .about-hero {
    height: 956px;
    min-height: 956px;
  }
  .about-hero-bg-desktop {
    display: none;
  }
  .about-hero-bg-mobile {
    display: block;
  }
  .about-hero-title {
    font-size: 56px;
    letter-spacing: -2.8px;
    width: calc(100% - 48px);
  }
  .about-content {
    gap: 60px;
    padding: 60px 24px 64px;
    position: static;
    width: 100%;
  }
  .about-intro {
    gap: 60px;
  }
  .about-intro-heading {
    font-size: 42px;
    letter-spacing: -2.94px;
  }
  .about-intro-heading-accent {
    font-size: 48px;
    letter-spacing: -2.88px;
  }
  .about-intro-description {
    font-size: 20px;
    letter-spacing: -1.4px;
  }
  .story-row {
    flex-direction: column;
    gap: var(--about-story-mobile-gap);
  }
  .story-text-column {
    gap: var(--about-story-mobile-gap);
    padding: 0;
  }
  .story-showcase-image {
    aspect-ratio: 392 / 208.36;
  }
  .story-heading {
    font-size: 28px;
    letter-spacing: -1.96px;
  }
  .story-heading-accent {
    font-size: 32px;
    letter-spacing: -2.24px;
  }
  .story-description {
    font-size: 20px;
    letter-spacing: -1.4px;
  }
  .story-image-main,
  .story-image-secondary {
    aspect-ratio: 392 / 522.667;
  }
  .story-side-column {
    gap: var(--about-story-mobile-gap);
    padding: 0;
  }
  .story-tertiary-image {
    aspect-ratio: 392 / 220.378;
  }
  .story-paragraphs {
    font-size: 20px;
    letter-spacing: -1.4px;
  }
  .about-team {
    gap: 60px;
  }
  .about-section-heading {
    gap: 24px;
  }
  .about-section-title {
    font-size: 42px;
    letter-spacing: -2.94px;
  }
  .about-section-subtitle,
  .section-main {
    font-size: 28px;
    letter-spacing: -1.96px;
  }
  .section-accent {
    font-size: 32px;
    letter-spacing: -2.24px;
  }
  .team-cards-row {
    display: grid;
    grid-template-columns: 1fr;
    justify-items: stretch;
  }
  .team-cards-group {
    gap: 24px;
  }
  .team-lead-card {
    aspect-ratio: 392 / 522.667;
    width: 100%;
  }
  .team-lead-overlay {
    gap: 24px;
    padding: 24px;
  }
  .team-lead-meta {
    flex-direction: column;
    gap: 24px;
  }
  .team-member-more {
    display: inline-flex;
  }
  .rest-of-us-gallery-grid {
    gap: 12px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .rest-of-us-gallery-overlay {
    padding: 18px;
  }
  .rest-of-us-gallery-name {
    font-size: 16px;
    letter-spacing: -0.8px;
  }
  .about-join {
    flex-direction: column;
    gap: 0;
  }
  .about-join-copy {
    border-radius: 8px 8px 0 0;
    padding: 60px 24px;
    width: 100%;
  }
  .about-join-description {
    font-size: 20px;
    letter-spacing: -1.4px;
  }
  .about-join-image {
    border-radius: 0 0 8px 8px;
    height: 458px;
    width: 100%;
  }
  .about-references {
    gap: 60px;
  }
  .about-references-logos {
    --about-reference-logo-gap: 12px;
    --about-reference-logo-size: 124px;
    gap: 12px;
  }
  .reference-logo {
    padding: 20px;
  }
  .about-report {
    flex-direction: column-reverse;
    gap: 0;
  }
  .about-report-copy {
    border-radius: 8px 8px 0 0;
    padding: 60px 24px;
    width: 100%;
  }
  .about-report-description {
    font-size: 20px;
    letter-spacing: -1.4px;
  }
  .about-report-image {
    border-radius: 0 0 8px 8px;
    height: 458px;
    width: 100%;
  }
}
</style>
