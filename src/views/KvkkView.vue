<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PageTopHeader from '../components/PageTopHeader.vue'
import YooFooter from '../components/YooFooter.vue'
import { legalLinks } from '../data/site'

defineProps({ theme: { type: String, default: 'light' } })
const emit = defineEmits(['open-menu'])

const route = useRoute()
const current = computed(() =>
  legalLinks.find((l) => l.href === route.path)
)

const title = computed(() => (current.value ? current.value.label : 'Data Privacy'))
</script>

<template>
  <div class="kvkk-page">
    <PageTopHeader theme="light" @open-menu="emit('open-menu')" />
    <div class="kvkk-content">
      <h1 class="kvkk-title">{{ title }}</h1>
      <div class="kvkk-body">
        <p>
          This page contains legal and privacy disclosures published by ETAG Interiors in accordance with the relevant data
          protection regulations. The documents listed below outline how personal data is collected, processed, and
          protected.
        </p>
        <p>
          For detailed information on any specific subject, please review the individual disclosure texts available from
          the links in the footer, or contact us directly at
          <a href="mailto:info@etaginteriors.com" class="kvkk-link">info@etaginteriors.com</a>.
        </p>
      </div>
    </div>
    <YooFooter />
  </div>
</template>

<style scoped>
.kvkk-page {
  background: #f9f9f9;
  color: #000;
  font-family: 'Maison Neue', sans-serif;
  width: 100%;
}
.kvkk-content {
  margin: 0 auto;
  max-width: 880px;
  padding: 220px 48px 160px;
}
.kvkk-title {
  font-size: clamp(48px, 6vw, 88px);
  font-weight: 700;
  letter-spacing: -0.05em;
  line-height: 0.95;
  margin: 0 0 48px;
  text-transform: uppercase;
}
.kvkk-body {
  font-size: 20px;
  font-weight: 300;
  line-height: 1.6;
  letter-spacing: -0.01em;
}
.kvkk-body p + p {
  margin-top: 24px;
}
.kvkk-link {
  color: #a63437;
}
@media (max-width: 768px) {
  .kvkk-content {
    padding: 140px 24px 80px;
  }
  .kvkk-title {
    font-size: 40px;
  }
  .kvkk-body {
    font-size: 18px;
  }
}
</style>
