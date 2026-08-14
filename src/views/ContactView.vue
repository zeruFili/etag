<script setup>
import { ref, computed, onMounted } from 'vue'
import PageTopHeader from '../components/PageTopHeader.vue'
import YooFooter from '../components/YooFooter.vue'
import { contactPage } from '../data/contact'
import { observeLineMasks } from '../composables/useReveal'

defineProps({ theme: { type: String, default: 'light' } })
const emit = defineEmits(['open-menu'])

const activeLocation = ref(0)
const location = computed(() => contactPage.locations[activeLocation.value])

onMounted(() => observeLineMasks(document.querySelector('.contact-page')))
</script>

<template>
  <div class="contact-page">
    <div class="contact-page-shell">
      <PageTopHeader theme="light" @open-menu="emit('open-menu')" />
      <section class="contact-hero">
        <h1 class="contact-title">
          <span class="line-mask-motion-text__mask">
            <span class="line-mask-motion-text__line" data-line-reveal>CONTACT</span>
          </span>
        </h1>
        <div class="contact-tagline-shell">
          <p class="contact-tagline">
            <span class="contact-tagline-line-mask">
              <span class="contact-tagline-line" data-line-reveal>
                We carry the flag of <span class="contact-tagline-accent">success,</span> around the
                <span class="contact-tagline-accent">world.</span>
              </span>
            </span>
          </p>
        </div>
      </section>
    </div>

    <section class="contact-map-shell">
      <div class="contact-map-stage">
        <div class="contact-tabs" role="tablist">
          <button
            v-for="(loc, i) in contactPage.locations"
            :key="loc.id"
            class="contact-tab"
            :class="{ 'is-active': activeLocation === i }"
            type="button"
            role="tab"
            :aria-selected="activeLocation === i"
            @click="activeLocation = i"
          >
            <span>{{ loc.tabLabel }}</span>
          </button>
        </div>
        <div class="contact-map-frame">
          <!-- Stylized map placeholder -->
          <div class="contact-map-placeholder">
            <div class="map-pin">
              <span class="map-pin-dot"></span>
            </div>
          </div>
        </div>
        <div class="contact-info-card">
          <h2 class="contact-info-title">{{ location.cardTitle }}</h2>
          <div class="contact-info-grid">
            <div class="contact-info-row">
              <span class="contact-info-label">ADDRESS</span>
              <span class="contact-info-value">{{ location.address }}</span>
            </div>
            <div class="contact-info-row">
              <span class="contact-info-label">PHONE</span>
              <a :href="`tel:${location.phone.replace(/\s/g, '')}`" class="contact-info-value">{{ location.phone }}</a>
            </div>
            <div class="contact-info-row">
              <span class="contact-info-label">EMAIL</span>
              <a :href="`mailto:${location.email}`" class="contact-info-value contact-info-value--accent">{{
                location.email
              }}</a>
            </div>
          </div>
          <a :href="location.ctaHref" class="contact-info-cta">{{ location.ctaLabel }}</a>
        </div>
      </div>
    </section>

    <YooFooter />
  </div>
</template>

<style scoped>
.contact-page {
  background: #f9f9f9;
  color: #000;
  font-family: 'Maison Neue', sans-serif;
  overflow-x: clip;
  width: 100%;
}
.contact-page-shell {
  box-sizing: border-box;
  margin: 0 auto;
  width: min(100%, 1728px);
  padding: 48px 48px 0;
  position: relative;
}
.contact-hero {
  padding: clamp(232px, 20.197vw, 349px) 0 clamp(72px, 7.407vw, 128px);
  width: 100%;
}
.contact-title {
  font-size: clamp(88px, 6.481vw, 112px);
  font-weight: 700;
  letter-spacing: -0.05em;
  line-height: 0.814;
  margin: 0;
  text-align: center;
  text-transform: uppercase;
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
.contact-tagline-shell {
  margin: clamp(64px, 5.556vw, 96px) 0 -0.06em;
  overflow: hidden;
  padding-bottom: 0.06em;
  position: relative;
}
.contact-tagline {
  font-size: clamp(64px, 5.093vw, 88px);
  font-weight: 300;
  letter-spacing: -0.07em;
  line-height: 1.16;
  margin: 0;
  white-space: pre-wrap;
}
.contact-tagline-line-mask {
  display: block;
  margin-bottom: -0.28em;
  overflow: hidden;
  padding-bottom: 0.28em;
}
.contact-tagline-line {
  display: inline-block;
  opacity: 0;
  transform: translateY(100%);
  transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s ease;
}
.contact-tagline-line[data-line-reveal] {
  opacity: 1;
  transform: translateY(0);
}
.contact-tagline-accent {
  color: #a63437;
  font-family: 'Fraunces', serif;
  font-size: clamp(72px, 5.903vw, 102px);
  font-style: italic;
  font-variation-settings: 'SOFT' 0, 'WONK' 1;
  font-weight: 400;
  letter-spacing: -0.06em;
  line-height: inherit;
}
.contact-map-shell {
  box-sizing: border-box;
  margin-left: calc(50% - 50vw);
  width: 100vw;
}
.contact-map-stage {
  background: #ece9e2;
  isolation: isolate;
  overflow: hidden;
  position: relative;
  z-index: 0;
}
.contact-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  left: 48px;
  position: absolute;
  top: 48px;
  z-index: 1000;
}
.contact-tab {
  align-items: center;
  background: #000;
  border: 0;
  border-radius: 999px;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  font-size: 14px;
  height: 36px;
  justify-content: center;
  letter-spacing: -0.02em;
  line-height: 1.1;
  min-width: 126px;
  overflow: hidden;
  padding: 0 14px;
  position: relative;
}
.contact-tab::before {
  background: #a63437;
  content: '';
  inset: 0;
  position: absolute;
  transform: translateY(-101%);
  transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1);
}
.contact-tab span {
  position: relative;
  z-index: 1;
}
.contact-tab.is-active::before,
.contact-tab:hover::before {
  transform: translateY(0);
}
.contact-map-frame,
.contact-map-placeholder {
  height: 869px;
  width: 100%;
}
.contact-map-placeholder {
  background: linear-gradient(180deg, #ffffff70, #ffffff24),
    linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 0),
    linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 0);
  background-size: auto, 32px 32px, 32px 32px;
  position: relative;
}
.map-pin {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.map-pin-dot {
  display: block;
  width: 22px;
  height: 22px;
  background: #a63437;
  border-radius: 50%;
  box-shadow: 0 0 0 8px rgba(166, 52, 55, 0.2);
}
.contact-info-card {
  backdrop-filter: blur(6px);
  background: #fffffff5;
  border-radius: 8px;
  bottom: 48px;
  box-shadow: 0 4px 4px #0c0c0d0d, 0 4px 4px #0c0c0d1a;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding: 32px;
  position: absolute;
  right: 48px;
  width: 443px;
  z-index: 1000;
}
.contact-info-title {
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.05em;
  line-height: 0.814;
  margin: 0;
  text-transform: uppercase;
}
.contact-info-grid {
  display: flex;
  flex-direction: column;
  gap: 23px;
}
.contact-info-row {
  align-items: flex-start;
  display: flex;
  gap: 24px;
}
.contact-info-label {
  flex-shrink: 0;
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 0.02em;
  line-height: 0.814;
  opacity: 0.3;
  text-transform: uppercase;
  width: 55px;
}
.contact-info-value {
  color: #000;
  flex: 1 1 auto;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: -0.05em;
  line-height: 1.1;
  min-width: 0;
  text-decoration: none;
}
.contact-info-value--accent {
  color: #a63437;
  font-weight: 600;
  text-decoration: underline;
}
.contact-info-cta {
  align-items: center;
  background: #000;
  border-radius: 999px;
  color: #fff;
  display: inline-flex;
  font-size: 14px;
  font-weight: 300;
  gap: 8px;
  justify-content: center;
  letter-spacing: 0.02em;
  line-height: 0.814;
  min-height: 40px;
  text-decoration: none;
  text-transform: uppercase;
  width: 100%;
}
@media (max-width: 1024px) {
  .contact-tabs {
    left: 32px;
    top: 32px;
  }
  .contact-map-frame,
  .contact-map-placeholder {
    height: 760px;
  }
  .contact-info-card {
    bottom: 32px;
    right: 32px;
    width: min(443px, calc(100% - 64px));
  }
}
@media (max-width: 768px) {
  .contact-page-shell {
    padding: 24px 24px 0;
    width: 100%;
  }
  .contact-hero {
    padding: 435px 0 44px;
  }
  .contact-title {
    font-size: 56px;
  }
  .contact-tagline-shell {
    margin-top: 38px;
  }
  .contact-tagline {
    font-size: 42px;
  }
  .contact-tagline-accent {
    font-size: 48px;
  }
  .contact-tabs {
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    left: 50%;
    right: auto;
    top: 32px;
    transform: translate(-50%);
    width: min(392px, calc(100% - 48px));
  }
  .contact-tab {
    min-width: 0;
    width: 100%;
  }
  .contact-map-stage {
    background: #fff;
  }
  .contact-map-frame,
  .contact-map-placeholder {
    height: 587px;
  }
  .contact-info-card {
    border-radius: 0;
    bottom: auto;
    gap: 32px;
    margin: -1px 0 0;
    padding: 32px;
    position: relative;
    right: auto;
    width: 100%;
  }
  .contact-info-title {
    font-size: 24px;
  }
  .contact-info-value {
    font-size: 14px;
    line-height: 1.3;
  }
}
</style>
