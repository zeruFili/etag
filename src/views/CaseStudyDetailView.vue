<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PageTopHeader from '../components/PageTopHeader.vue'
import YooFooter from '../components/YooFooter.vue'
import { caseStudies, buildCaseStudyDetail } from '../data/caseStudies'

defineProps({ theme: { type: String, default: 'dark' } })
const emit = defineEmits(['open-menu'])

const route = useRoute()

const detail = computed(() => {
  const cs = caseStudies.find((c) => c.slug === route.params.slug)
  if (cs) return buildCaseStudyDetail(cs)
  return buildCaseStudyDetail({
    slug: route.params.slug,
    title: String(route.params.slug).replace(/-/g, ' ').toUpperCase(),
    category: 'CASE STUDY',
    image: 'https://media.yoointerior.com/assets/case-study/detail/1778774968246-1.jpg',
  })
})
</script>

<template>
  <div class="case-study-detail">
    <PageTopHeader theme="dark" @open-menu="emit('open-menu')" />

    <section class="cs-hero">
      <img class="cs-hero-image" :src="detail.hero" :alt="detail.title" />
      <div class="cs-hero-overlay"></div>
      <h1 class="cs-title">
        <span>{{ detail.title }}</span>
      </h1>
      <div class="scroll-down">
        <p>SCROLL DOWN</p>
        <div class="scroll-icon"><span class="scroll-line"><span class="scroll-line-highlight"></span></span></div>
      </div>
    </section>

    <section v-for="(section, si) in detail.sections" :key="si" class="cs-section">
      <div class="cs-section-text">
        <h2 v-if="section.title" class="cs-section-title">{{ section.title }}</h2>
        <p class="cs-section-paragraph">{{ section.text }}</p>
      </div>
      <div v-if="section.images.length" class="cs-section-images" :class="`count-${section.images.length}`">
        <div v-for="(img, ii) in section.images" :key="ii" class="cs-section-image">
          <img :src="img" :alt="detail.title" loading="lazy" decoding="async" />
        </div>
      </div>
    </section>

    <section class="cs-meta">
      <div class="cs-meta-grid">
        <div class="cs-meta-item">
          <span class="cs-meta-label">Client</span>
          <span class="cs-meta-value">{{ detail.client || '\u2014' }}</span>
        </div>
        <div class="cs-meta-item">
          <span class="cs-meta-label">City,Country</span>
          <span class="cs-meta-value">{{ detail.city || '\u2014' }}</span>
        </div>
        <div class="cs-meta-item">
          <span class="cs-meta-label">Year</span>
          <span class="cs-meta-value">{{ detail.year || '\u2014' }}</span>
        </div>
        <div class="cs-meta-item">
          <span class="cs-meta-label">Expertise</span>
          <span class="cs-meta-value">{{ detail.expertise || '\u2014' }}</span>
        </div>
        <div class="cs-meta-item">
          <span class="cs-meta-label">Area</span>
          <span class="cs-meta-value">{{ detail.area || '\u2014' }}</span>
        </div>
        <div class="cs-meta-item">
          <span class="cs-meta-label">CATEGORY</span>
          <span class="cs-meta-value cs-meta-value--accent">{{ detail.category }}</span>
        </div>
      </div>
    </section>

    <nav class="cs-pagination">
      <router-link v-if="detail.prev" :to="`/case-study/${detail.prev.slug}`" class="cs-pagination-link">
        <span class="cs-pagination-label">PREV CASE STUDY</span>
        <span class="cs-pagination-title">{{ detail.prev.label }}</span>
      </router-link>
      <router-link v-else to="/case-study" class="cs-pagination-link">
        <span class="cs-pagination-label">PREV CASE STUDY</span>
        <span class="cs-pagination-title">CASE STUDIES</span>
      </router-link>
      <router-link v-if="detail.next" :to="`/case-study/${detail.next.slug}`" class="cs-pagination-link cs-pagination-link--next">
        <span class="cs-pagination-label">NEXT CASE STUDY</span>
        <span class="cs-pagination-title">{{ detail.next.label }}</span>
      </router-link>
    </nav>

    <YooFooter />
  </div>
</template>

<style scoped>
.case-study-detail {
  background: #f9f9f9;
  color: #000;
  font-family: 'Maison Neue', sans-serif;
  width: 100%;
}
.cs-hero {
  background: #000;
  height: 100svh;
  min-height: 720px;
  overflow: hidden;
  position: relative;
  width: 100%;
}
.cs-hero-image {
  display: block;
  height: 100%;
  inset: 0;
  object-fit: cover;
  position: absolute;
  width: 100%;
}
.cs-hero-overlay {
  background: #0006;
  inset: 0;
  position: absolute;
}
.cs-title {
  color: #fff;
  font-size: clamp(64px, 7vw, 112px);
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
  width: 2px;
}
.scroll-line-highlight {
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
.cs-section {
  margin: 0 auto;
  max-width: 1632px;
  padding: 96px 48px 0;
  display: flex;
  flex-direction: column;
  gap: 48px;
}
.cs-section-text {
  max-width: 816px;
}
.cs-section-title {
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.05em;
  line-height: 1;
  margin: 0 0 24px;
  text-transform: uppercase;
}
.cs-section-paragraph {
  font-size: 20px;
  font-weight: 300;
  letter-spacing: -0.02em;
  line-height: 1.5;
  margin: 0;
}
.cs-section-images {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(2, 1fr);
}
.cs-section-images.count-1 {
  grid-template-columns: 1fr;
}
.cs-section-image {
  border-radius: 8px;
  overflow: hidden;
}
.cs-section-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.cs-section-image {
  aspect-ratio: 4 / 3;
}
.cs-meta {
  margin: 0 auto;
  max-width: 1632px;
  padding: 96px 48px;
  width: 100%;
}
.cs-meta-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 32px;
}
.cs-meta-item {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.cs-meta-label {
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 0.24px;
  opacity: 0.3;
  text-transform: uppercase;
}
.cs-meta-value {
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -1px;
  line-height: 1.1;
  text-transform: uppercase;
}
.cs-meta-value--accent {
  color: #a63437;
}
.cs-pagination {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1632px;
  padding: 48px;
  width: 100%;
}
.cs-pagination-link {
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-decoration: none;
}
.cs-pagination-link--next {
  text-align: right;
}
.cs-pagination-label {
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 0.24px;
  opacity: 0.4;
  text-transform: uppercase;
}
.cs-pagination-title {
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.05em;
  line-height: 1.1;
  text-transform: uppercase;
}
.cs-pagination-link:hover .cs-pagination-title {
  color: #a63437;
}

@media (max-width: 1024px) {
  .cs-meta-grid {
    grid-template-columns: repeat(3, 1fr);
    row-gap: 40px;
  }
}
@media (max-width: 768px) {
  .cs-hero {
    height: 956px;
    min-height: 956px;
  }
  .cs-title {
    font-size: 56px;
    letter-spacing: -2.8px;
    width: calc(100% - 48px);
  }
  .cs-section {
    padding: 60px 24px 0;
  }
  .cs-section-paragraph {
    font-size: 18px;
  }
  .cs-section-images {
    grid-template-columns: 1fr;
  }
  .cs-meta {
    padding: 60px 24px;
  }
  .cs-meta-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .cs-pagination {
    padding: 40px 24px;
  }
  .cs-pagination-title {
    font-size: 18px;
  }
}
</style>
