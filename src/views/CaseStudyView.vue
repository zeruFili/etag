<script setup>
import { computed, onMounted } from 'vue'
import PageTopHeader from '../components/PageTopHeader.vue'
import YooFooter from '../components/YooFooter.vue'
import { caseStudies } from '../data/caseStudies'
import { observeLineMasks } from '../composables/useReveal'

defineProps({ theme: { type: String, default: 'dark' } })
const emit = defineEmits(['open-menu'])

const rows = computed(() => {
  const list = caseStudies
  const result = []
  let i = 0
  while (i < list.length) {
    const remaining = list.length - i
    if (remaining >= 3) {
      result.push([{ ...list[i], span: 2, ratio: '804/804' }, { ...list[i + 1], span: 1, ratio: '390/520' }, { ...list[i + 2], span: 1, ratio: '390/520' }])
      i += 3
    } else if (remaining === 2) {
      result.push([{ ...list[i], span: 2, ratio: '804/804' }, { ...list[i + 1], span: 2, ratio: '804/804' }])
      i += 2
    } else {
      result.push([{ ...list[i], span: 4, ratio: '1632/794' }])
      i += 1
    }
  }
  return result
})

onMounted(() => observeLineMasks(document.querySelector('.case-study-page')))
</script>

<template>
  <div class="case-study-page">
    <div class="case-study-hero">
      <img
        class="case-study-hero-bg"
        src="https://media.yoointerior.com/assets/about/hero/1778764985785-ads-z-tasar-m-1-.png"
        alt=""
        aria-hidden="true"
      />
      <div class="case-study-hero-overlay"></div>
      <PageTopHeader theme="dark" @open-menu="emit('open-menu')" />
      <h1 class="case-study-title">
        <span class="line-mask-motion-text__mask">
          <span class="line-mask-motion-text__line" data-line-reveal>CASE STUDY</span>
        </span>
      </h1>
    </div>

    <div class="case-study-content">
      <div class="case-study-list">
        <div v-for="(row, ri) in rows" :key="ri" class="case-study-row">
          <router-link
            v-for="cs in row"
            :key="cs.slug"
            :to="`/case-study/${cs.slug}`"
            class="project-card"
            :style="{ gridColumn: `span ${cs.span}` }"
          >
            <div class="project-image" :style="{ aspectRatio: cs.ratio }">
              <img :src="cs.image" :alt="cs.title" loading="lazy" decoding="async" />
            </div>
            <div class="project-info">
              <p class="project-category">{{ cs.category }}</p>
              <p class="project-title">{{ cs.title }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <YooFooter />
  </div>
</template>

<style scoped>
.case-study-page {
  background: #f9f9f9;
  color: #000;
  font-family: 'Maison Neue', sans-serif;
  width: 100%;
}
.case-study-hero {
  background: #000;
  height: 100svh;
  min-height: 720px;
  overflow: hidden;
  position: relative;
  width: 100%;
}
.case-study-hero-bg {
  display: block;
  height: 100%;
  inset: 0;
  object-fit: cover;
  position: absolute;
  width: 100%;
  opacity: 0.6;
}
.case-study-hero-overlay {
  background: #0006;
  inset: 0;
  position: absolute;
}
.case-study-title {
  color: #fff;
  font-size: clamp(72px, 7vw, 112px);
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
.case-study-content {
  margin: 0 auto;
  padding: 96px 48px 160px;
  max-width: 1728px;
}
.case-study-list {
  display: flex;
  flex-direction: column;
  gap: 48px;
  margin: 0 auto;
  max-width: 1632px;
}
.case-study-row {
  align-items: start;
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
.project-card {
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-decoration: none;
}
.project-image {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  transition: border-radius 0.26s cubic-bezier(0.22, 1, 0.36, 1);
  width: 100%;
}
.project-image img {
  display: block;
  height: 100%;
  inset: 0;
  object-fit: cover;
  position: absolute;
  transition: transform 0.22s ease;
  width: 100%;
}
@media (hover: hover) and (pointer: fine) {
  .project-card:hover .project-image {
    border-radius: 8px 8px 8px 48px;
  }
  .project-card:hover .project-image img {
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
.project-category {
  font-size: 11px;
  font-weight: 300;
  letter-spacing: 0.22px;
  line-height: 0.814;
  margin: 0;
}
.project-title {
  font-size: 20px;
  font-weight: 400;
  letter-spacing: -1px;
  line-height: 1.1;
  margin: 0;
}
@media (max-width: 768px) {
  .case-study-hero {
    height: 956px;
    min-height: 956px;
  }
  .case-study-title {
    font-size: 56px;
    letter-spacing: -2.8px;
    width: calc(100% - 48px);
  }
  .case-study-content {
    padding: 60px 24px 80px;
  }
  .case-study-list {
    gap: 40px;
  }
  .case-study-row {
    grid-template-columns: 1fr;
  }
  .project-card {
    width: 73.469%;
  }
  .project-card:nth-child(even) {
    align-self: flex-end;
    width: 59.694%;
  }
  .project-info {
    gap: 12px;
  }
  .project-category {
    font-size: 10px;
    letter-spacing: 0.2px;
  }
  .project-title {
    font-size: 17px;
    letter-spacing: -0.85px;
  }
}
</style>
