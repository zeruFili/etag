<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PageTopHeader from '../components/PageTopHeader.vue'
import YooFooter from '../components/YooFooter.vue'
import { projects } from '../data/projects'

defineProps({ theme: { type: String, default: 'dark' } })
const emit = defineEmits(['open-menu'])

const route = useRoute()

const project = computed(() => {
  const found = projects.find((p) => p.slug === route.params.slug)
  if (found) {
    return {
      ...found,
      hero: found.hero || (found.thumb ? found.thumb.src : null),
      gallery: found.gallery || [],
    }
  }
  // fallback for slugs not in the detailed list
  return {
    slug: route.params.slug,
    title: String(route.params.slug).replace(/-/g, ' ').toUpperCase(),
    category: 'PROJECT',
    client: 'ETAG INTERIORS',
    city: 'ADDIS ABABA, ETHIOPIA',
    year: '2026',
    area: '\u2014',
    hero: 'https://media.yoointerior.com/assets/projects/detail/1777041941157-yoointerior_nobu-istanbul_19.jpg',
    gallery: [],
  }
})

const idx = computed(() => projects.findIndex((p) => p.slug === route.params.slug))
const prev = computed(() => (idx.value > 0 ? projects[idx.value - 1] : null))
const next = computed(() => (idx.value >= 0 && idx.value < projects.length - 1 ? projects[idx.value + 1] : null))
</script>

<template>
  <div class="project-detail">
    <PageTopHeader theme="dark" @open-menu="emit('open-menu')" />

    <section class="detail-hero">
      <img class="detail-hero-image" :src="project.hero" :alt="project.title" />
      <div class="detail-hero-overlay"></div>
      <h1 class="detail-title">
        <span class="detail-title-name">{{ project.title }}</span>
        <span v-if="project.subtitle" class="detail-title-sub">{{ project.subtitle }}</span>
      </h1>
      <div class="scroll-down">
        <p>SCROLL DOWN</p>
        <div class="scroll-icon"><span class="scroll-line"><span class="scroll-line-highlight"></span></span></div>
      </div>
    </section>

    <section class="detail-meta">
      <div class="detail-meta-grid">
        <div class="detail-meta-item">
          <span class="detail-meta-label">Client</span>
          <span class="detail-meta-value">{{ project.client || '\u2014' }}</span>
        </div>
        <div class="detail-meta-item">
          <span class="detail-meta-label">City,Country</span>
          <span class="detail-meta-value">{{ project.city || '\u2014' }}</span>
        </div>
        <div class="detail-meta-item">
          <span class="detail-meta-label">Year</span>
          <span class="detail-meta-value">{{ project.year || '\u2014' }}</span>
        </div>
        <div class="detail-meta-item">
          <span class="detail-meta-label">Expertise</span>
          <span class="detail-meta-value">{{ project.expertise || '\u2014' }}</span>
        </div>
        <div class="detail-meta-item">
          <span class="detail-meta-label">Area</span>
          <span class="detail-meta-value">{{ project.area || '\u2014' }}</span>
        </div>
        <div class="detail-meta-item">
          <span class="detail-meta-label">CATEGORY</span>
          <span class="detail-meta-value detail-meta-value--accent">{{ project.category }}</span>
        </div>
      </div>
    </section>

    <section class="detail-gallery">
      <div v-for="(img, i) in project.gallery" :key="i" class="detail-gallery-item" :class="`slot-${i}`">
        <img :src="img" :alt="`${project.title} image ${i + 1}`" loading="lazy" decoding="async" />
      </div>
      <div v-if="!project.gallery.length" class="detail-gallery-item slot-0">
        <img :src="project.hero" :alt="project.title" />
      </div>
    </section>

    <nav class="detail-pagination">
      <router-link v-if="prev" :to="`/projects/${prev.slug}`" class="detail-pagination-link">
        <span class="detail-pagination-label">PREV PROJECT</span>
        <span class="detail-pagination-title">{{ prev.title }}</span>
      </router-link>
      <router-link v-else to="/projects" class="detail-pagination-link">
        <span class="detail-pagination-label">PREV PROJECT</span>
        <span class="detail-pagination-title">PROJECTS</span>
      </router-link>
      <router-link v-if="next" :to="`/projects/${next.slug}`" class="detail-pagination-link detail-pagination-link--next">
        <span class="detail-pagination-label">NEXT PROJECT</span>
        <span class="detail-pagination-title">{{ next.title }}</span>
      </router-link>
    </nav>

    <YooFooter />
  </div>
</template>

<style scoped>
.project-detail {
  background: #f9f9f9;
  color: #000;
  font-family: 'Maison Neue', sans-serif;
  width: 100%;
}
.detail-hero {
  background: #000;
  height: 100svh;
  min-height: 720px;
  overflow: hidden;
  position: relative;
  width: 100%;
}
.detail-hero-image {
  display: block;
  height: 100%;
  inset: 0;
  object-fit: cover;
  object-position: center;
  position: absolute;
  width: 100%;
}
.detail-hero-overlay {
  background: #0006;
  inset: 0;
  position: absolute;
}
.detail-title {
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
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.detail-title-name,
.detail-title-sub {
  display: block;
}
.detail-title-sub {
  font-size: 0.5em;
  letter-spacing: -2px;
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
.detail-meta {
  margin: 0 auto;
  max-width: 1632px;
  padding: 96px 48px;
  width: 100%;
}
.detail-meta-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 32px;
}
.detail-meta-item {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.detail-meta-label {
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 0.24px;
  line-height: 0.814;
  opacity: 0.3;
  text-transform: uppercase;
}
.detail-meta-value {
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -1px;
  line-height: 1.1;
  text-transform: uppercase;
}
.detail-meta-value--accent {
  color: #a63437;
}
.detail-gallery {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin: 0 auto;
  max-width: 1632px;
  padding: 0 48px 96px;
}
.detail-gallery-item {
  border-radius: 8px;
  overflow: hidden;
}
.detail-gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.detail-gallery-item.slot-0 {
  grid-column: span 2;
  aspect-ratio: 16 / 9;
}
.detail-gallery-item.slot-1,
.detail-gallery-item.slot-2 {
  aspect-ratio: 3 / 4;
}
.detail-gallery-item.slot-3 {
  aspect-ratio: 4 / 3;
}
.detail-gallery-item.slot-4 {
  aspect-ratio: 1 / 1;
}
.detail-gallery-item.slot-5 {
  aspect-ratio: 3 / 4;
}
.detail-gallery-item.slot-6 {
  grid-column: span 2;
  aspect-ratio: 16 / 9;
}
.detail-gallery-item.slot-7 {
  aspect-ratio: 3 / 4;
}
.detail-gallery-item.slot-8 {
  aspect-ratio: 390 / 520;
}
.detail-pagination {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1632px;
  padding: 48px;
  width: 100%;
}
.detail-pagination-link {
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-decoration: none;
}
.detail-pagination-link--next {
  text-align: right;
}
.detail-pagination-label {
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 0.24px;
  opacity: 0.4;
  text-transform: uppercase;
}
.detail-pagination-title {
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.05em;
  line-height: 1.1;
  text-transform: uppercase;
}
.detail-pagination-link:hover .detail-pagination-title {
  color: #a63437;
}

@media (max-width: 1024px) {
  .detail-meta-grid {
    grid-template-columns: repeat(3, 1fr);
    row-gap: 40px;
  }
}
@media (max-width: 768px) {
  .detail-hero {
    height: 956px;
    min-height: 956px;
  }
  .detail-title {
    font-size: 56px;
    letter-spacing: -2.8px;
    width: calc(100% - 48px);
  }
  .detail-meta {
    padding: 60px 24px;
  }
  .detail-meta-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .detail-gallery {
    grid-template-columns: 1fr;
    padding: 0 24px 60px;
  }
  .detail-gallery-item.slot-0 {
    grid-column: span 1;
  }
  .detail-pagination {
    padding: 40px 24px;
  }
  .detail-pagination-title {
    font-size: 18px;
  }
}
</style>
