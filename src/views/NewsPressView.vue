<script setup>
import { onMounted, computed } from 'vue'
import PageTopHeader from '../components/PageTopHeader.vue'
import YooFooter from '../components/YooFooter.vue'
import { newsItems } from '../data/news'
import { observeLineMasks } from '../composables/useReveal'

defineProps({ theme: { type: String, default: 'light' } })
const emit = defineEmits(['open-menu'])

const rows = computed(() => {
  const result = []
  let i = 0
  while (i < newsItems.length) {
    const remaining = newsItems.length - i
    if (remaining >= 3) {
      result.push([newsItems[i], newsItems[i + 1], newsItems[i + 2]])
      i += 3
    } else {
      result.push(newsItems.slice(i))
      i = newsItems.length
    }
  }
  return result
})

onMounted(() => observeLineMasks(document.querySelector('.news-page')))
</script>

<template>
  <div class="news-page">
    <PageTopHeader theme="light" @open-menu="emit('open-menu')" />
    <div class="news-content">
      <h1 class="news-title">
        <span class="line-mask-motion-text__mask">
          <span class="line-mask-motion-text__line" data-line-reveal>NEWS &amp; PRESS</span>
        </span>
      </h1>
      <div class="news-grid">
        <div v-for="(row, ri) in rows" :key="ri" class="news-row">
          <router-link
            v-for="item in row"
            :key="item.slug"
            :to="`/news-press/${item.slug}`"
            class="news-card"
          >
            <div class="news-image" :style="{ aspectRatio: row.length === 1 ? '1632/794' : '804/520' }">
              <img :src="item.image" :alt="item.title" loading="lazy" decoding="async" />
            </div>
            <div class="news-info">
              <h2 class="news-item-title">{{ item.title }}</h2>
              <p class="news-date">{{ item.date }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <YooFooter />
  </div>
</template>

<style scoped>
.news-page {
  background: #fff;
  color: #000;
  font-family: 'Maison Neue', sans-serif;
  width: 100%;
}
.news-content {
  margin: 0 auto;
  max-width: 1728px;
  padding: 300px 48px 160px;
}
.news-title {
  font-size: clamp(72px, 7vw, 112px);
  font-weight: 700;
  letter-spacing: -5.6px;
  line-height: 0.814;
  margin: 0 0 96px;
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
.news-grid {
  display: flex;
  flex-direction: column;
  gap: 48px;
}
.news-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.news-row:has(.news-card:only-child) {
  grid-template-columns: 1fr;
}
.news-card {
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-decoration: none;
}
.news-image {
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  transition: border-radius 0.26s cubic-bezier(0.22, 1, 0.36, 1);
  width: 100%;
}
.news-image img {
  display: block;
  height: 100%;
  inset: 0;
  object-fit: cover;
  position: absolute;
  transition: transform 0.22s ease;
  width: 100%;
}
@media (hover: hover) and (pointer: fine) {
  .news-card:hover .news-image {
    border-radius: 8px 8px 8px 48px;
  }
  .news-card:hover .news-image img {
    transform: scale(1.02);
  }
}
.news-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.news-item-title {
  font-size: 20px;
  font-weight: 400;
  letter-spacing: -0.5px;
  line-height: 1.2;
  margin: 0;
}
.news-date {
  font-size: 11px;
  font-weight: 300;
  letter-spacing: 0.22px;
  margin: 0;
  opacity: 0.5;
  text-transform: uppercase;
}
@media (max-width: 768px) {
  .news-content {
    padding: 200px 24px 80px;
  }
  .news-title {
    font-size: 56px;
    letter-spacing: -2.8px;
    margin-bottom: 60px;
  }
  .news-row {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
</style>
