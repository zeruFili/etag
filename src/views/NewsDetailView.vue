<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PageTopHeader from '../components/PageTopHeader.vue'
import YooFooter from '../components/YooFooter.vue'
import { newsItems } from '../data/news'

defineProps({ theme: { type: String, default: 'light' } })
const emit = defineEmits(['open-menu'])

const route = useRoute()
const item = computed(() => newsItems.find((n) => n.slug === route.params.slug))
</script>

<template>
  <div class="news-detail">
    <PageTopHeader theme="light" @open-menu="emit('open-menu')" />
    <div v-if="item" class="news-detail-content">
      <div class="news-detail-image">
        <img :src="item.image" :alt="item.title" />
      </div>
      <div class="news-detail-body">
        <p class="news-detail-date">{{ item.date }}</p>
        <h1 class="news-detail-title">{{ item.title }}</h1>
        <p class="news-detail-text">{{ item.body }}</p>
        <router-link to="/news-press" class="news-back">← Back to News &amp; Press</router-link>
      </div>
    </div>
    <YooFooter />
  </div>
</template>

<style scoped>
.news-detail {
  background: #fff;
  color: #000;
  font-family: 'Maison Neue', sans-serif;
  width: 100%;
}
.news-detail-content {
  margin: 0 auto;
  max-width: 1080px;
  padding: 200px 48px 120px;
}
.news-detail-image {
  border-radius: 8px;
  overflow: hidden;
}
.news-detail-image img {
  width: 100%;
  display: block;
}
.news-detail-body {
  padding-top: 48px;
}
.news-detail-date {
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 0.24px;
  opacity: 0.5;
  text-transform: uppercase;
  margin: 0 0 16px;
}
.news-detail-title {
  font-size: clamp(40px, 5vw, 72px);
  font-weight: 700;
  letter-spacing: -0.05em;
  line-height: 1.05;
  margin: 0 0 32px;
}
.news-detail-text {
  font-size: 20px;
  font-weight: 300;
  letter-spacing: -0.02em;
  line-height: 1.5;
  margin: 0 0 48px;
}
.news-back {
  font-size: 14px;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.28px;
}
.news-back:hover {
  color: #a63437;
}
@media (max-width: 768px) {
  .news-detail-content {
    padding: 120px 24px 80px;
  }
  .news-detail-text {
    font-size: 18px;
  }
}
</style>
