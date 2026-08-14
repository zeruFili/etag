<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PageTopHeader from '../components/PageTopHeader.vue'
import YooFooter from '../components/YooFooter.vue'
import { projects, projectCategories, projectExpertises } from '../data/projects'
import { observeLineMasks } from '../composables/useReveal'

defineProps({ theme: { type: String, default: 'light' } })
const emit = defineEmits(['open-menu'])

const route = useRoute()
const router = useRouter()

const selectedExpertise = ref(route.query.expertise ? String(route.query.expertise).split(',') : [])
const selectedCategories = ref([])
const openExpertisePanel = ref(false)
const openCategoryPanel = ref(false)

watch(
  () => route.query.expertise,
  (val) => {
    selectedExpertise.value = val ? String(val).split(',') : []
  }
)

const expertises = computed(() => projectExpertises)
const categories = computed(() => projectCategories)

const filtered = computed(() => {
  return projects.filter((p) => {
    const eOk = selectedExpertise.value.length ? selectedExpertise.value.includes(p.expertise) : true
    const cOk = selectedCategories.value.length ? selectedCategories.value.includes(p.category) : true
    return eOk && cOk
  })
})

function toggleExpertise(e) {
  const i = selectedExpertise.value.indexOf(e)
  if (i >= 0) selectedExpertise.value.splice(i, 1)
  else selectedExpertise.value.push(e)
  syncQuery()
}
function toggleCategory(c) {
  const i = selectedCategories.value.indexOf(c)
  if (i >= 0) selectedCategories.value.splice(i, 1)
  else selectedCategories.value.push(c)
  syncQuery()
}
function clearFilters() {
  selectedExpertise.value = []
  selectedCategories.value = []
  syncQuery()
}
function syncQuery() {
  const q = {}
  if (selectedExpertise.value.length) q.expertise = selectedExpertise.value.join(',')
  router.replace({ query: q })
}

const hasFilters = computed(() => selectedExpertise.value.length > 0 || selectedCategories.value.length > 0)

// Build rows for the pattern layout.
const rows = computed(() => {
  const list = filtered.value
  const result = []
  let i = 0
  // Pattern: large(2), small, small ; small, large ; large, small ; wide(3), small ; small
  while (i < list.length) {
    const row = []
    const remaining = list.length - i
    if (remaining >= 3) {
      row.push({ ...list[i], span: 2, ratio: '804/804' })
      row.push({ ...list[i + 1], span: 1, ratio: '390/520' })
      row.push({ ...list[i + 2], span: 1, ratio: '390/520' })
      i += 3
    } else if (remaining === 2) {
      row.push({ ...list[i], span: 1, ratio: '390/520' })
      row.push({ ...list[i + 1], span: 3, ratio: '1218/684' })
      i += 2
    } else {
      row.push({ ...list[i], span: 2, ratio: '804/804' })
      i += 1
    }
    result.push(row)
  }
  return result
})

onMounted(() => {
  observeLineMasks(document.querySelector('.projects-page'))
})
</script>

<template>
  <div class="projects-page">
    <div class="projects-desktop">
      <PageTopHeader theme="light" @open-menu="emit('open-menu')" />
      <div class="projects-main">
        <h1 class="projects-title">
          <span class="line-mask-motion-text__mask">
            <span class="line-mask-motion-text__line" data-line-reveal>PROJECTS</span>
          </span>
        </h1>

        <div class="projects-list-container">
          <div class="projects-header-row">
            <div class="projects-header-tabs">
              <button class="chip chip-soft" type="button" @click="openExpertisePanel = !openExpertisePanel">
                <span>Expertise</span>
                <span class="chip-icon" aria-hidden="true">{{ selectedExpertise.length ? '\u2212' : '+' }}</span>
              </button>
              <button class="chip chip-soft" type="button" @click="openCategoryPanel = !openCategoryPanel">
                <span>Category</span>
                <span class="chip-icon" aria-hidden="true">{{ selectedCategories.length ? '\u2212' : '+' }}</span>
              </button>
            </div>
          </div>

          <!-- Inline filter panel -->
          <div v-if="openExpertisePanel" class="projects-category-panel">
            <p class="panel-title">Expertise</p>
            <div class="panel-options">
              <button
                v-for="e in expertises"
                :key="e"
                class="chip"
                :class="selectedExpertise.includes(e) ? 'chip-solid' : 'chip-light'"
                type="button"
                @click="toggleExpertise(e)"
              >
                {{ e }}
              </button>
            </div>
          </div>
          <div v-if="openCategoryPanel" class="projects-category-panel projects-category-panel--wide">
            <p class="panel-title">Category</p>
            <div class="panel-options">
              <button
                v-for="c in categories"
                :key="c"
                class="chip"
                :class="selectedCategories.includes(c) ? 'chip-solid' : 'chip-light'"
                type="button"
                @click="toggleCategory(c)"
              >
                {{ c }}
              </button>
            </div>
          </div>

          <div class="projects-divider"></div>

          <div v-if="hasFilters" class="projects-filter-summary-row">
            <div class="projects-selected-groups">
              <div v-if="selectedExpertise.length" class="projects-selected-group">
                <p class="selected-group-label">Expertise</p>
                <div class="selected-group-chips">
                  <span v-for="e in selectedExpertise" :key="e" class="chip chip-solid projects-selected-chip">{{
                    e
                  }}</span>
                </div>
              </div>
              <div v-if="selectedCategories.length" class="projects-selected-group">
                <p class="selected-group-label">Category</p>
                <div class="selected-group-chips">
                  <span v-for="c in selectedCategories" :key="c" class="chip chip-solid projects-selected-chip">{{
                    c
                  }}</span>
                </div>
              </div>
            </div>
            <button class="chip chip-outline projects-header-clear" type="button" @click="clearFilters">Clear</button>
          </div>

          <div v-if="filtered.length" class="projects-pattern">
            <div v-for="(row, ri) in rows" :key="ri" class="projects-pattern-row">
              <router-link
                v-for="p in row"
                :key="p.slug"
                :to="`/projects/${p.slug}`"
                class="project-card project-card-pattern"
                :style="{ gridColumn: `span ${p.span}` }"
              >
                <div class="project-image" :style="{ aspectRatio: p.ratio }">
                  <video
                    v-if="p.thumb.type === 'video'"
                    :src="p.thumb.src"
                    autoplay
                    muted
                    loop
                    playsinline
                    preload="metadata"
                  ></video>
                  <img v-else :src="p.thumb.src" :alt="p.title" loading="lazy" decoding="async" />
                </div>
                <div class="project-info">
                  <p class="project-category">{{ p.category }}</p>
                  <p class="project-title">{{ p.title }}</p>
                </div>
              </router-link>
            </div>
          </div>
          <div v-else class="projects-empty-state">
            <p class="projects-empty-state__title">No projects found</p>
            <p class="projects-empty-state__description">Try adjusting your filters.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile -->
    <div class="projects-mobile">
      <PageTopHeader theme="light" @open-menu="emit('open-menu')" />
      <div class="projects-mobile-content">
        <h1 class="projects-mobile-title">PROJECTS</h1>
        <div class="projects-mobile-list">
          <div
            v-for="(p, i) in filtered"
            :key="p.slug"
            class="projects-mobile-row"
            :class="
              i % 3 === 0 ? 'projects-mobile-row--start' : i % 3 === 1 ? 'projects-mobile-row--end' : 'projects-mobile-row--center'
            "
          >
            <router-link :to="`/projects/${p.slug}`" class="projects-mobile-card" :style="{ width: i % 3 === 1 ? '234px' : '288px' }">
              <div
                class="projects-mobile-image"
                :style="{ aspectRatio: i % 3 === 1 ? '234/312' : '288/288' }"
              >
                <video
                  v-if="p.thumb.type === 'video'"
                  :src="p.thumb.src"
                  autoplay
                  muted
                  loop
                  playsinline
                  preload="metadata"
                ></video>
                <img v-else :src="p.thumb.src" :alt="p.title" loading="lazy" decoding="async" />
              </div>
              <div class="projects-mobile-info">
                <p class="project-category">{{ p.category }}</p>
                <p class="project-title">{{ p.title }}</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <YooFooter />
  </div>
</template>

<style scoped>
.projects-page {
  background: #fff;
  color: #000;
  font-family: 'Maison Neue', sans-serif;
  width: 100%;
}
.projects-desktop {
  margin: 0 auto;
  overflow: hidden;
  padding: 0 48px 160px;
  position: relative;
  width: min(100%, 1728px);
}
.projects-main {
  margin: 0 auto;
  padding-top: 399px;
  position: relative;
  width: min(100%, 1632px);
}
.projects-title {
  font-size: 112px;
  font-weight: 700;
  letter-spacing: -5.6px;
  line-height: 0.814;
  margin: 0;
  text-align: center;
  text-transform: uppercase;
  width: 100%;
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
.projects-list-container {
  margin-top: 96px;
  position: relative;
}
.projects-header-row {
  align-items: center;
  display: flex;
  justify-content: flex-start;
  min-height: 36px;
  width: 100%;
}
.projects-header-tabs {
  align-items: center;
  display: flex;
  gap: 8px;
}
.projects-divider {
  background: #00000029;
  height: 1px;
  margin-top: 32px;
  width: 100%;
}
.projects-filter-summary-row {
  align-items: center;
  display: flex;
  gap: 32px;
  justify-content: space-between;
  margin-top: 32px;
  width: 100%;
}
.projects-selected-groups {
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
}
.projects-selected-group {
  align-items: center;
  display: inline-flex;
  flex-direction: row;
  gap: 12px;
}
.selected-group-label {
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.28px;
  line-height: 1.1;
  margin: 0;
  opacity: 0.5;
}
.selected-group-chips {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.projects-header-clear {
  flex: 0 0 auto;
}
.projects-pattern {
  display: flex;
  flex-direction: column;
  gap: 48px;
  margin-top: 32px;
}
.projects-pattern-row {
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
.project-image img,
.project-image video {
  display: block;
  height: 100%;
  inset: 0;
  object-fit: cover;
  position: absolute;
  transition: transform 0.22s ease;
  width: 100%;
  will-change: transform;
}
@media (hover: hover) and (pointer: fine) {
  .project-card:hover .project-image {
    border-radius: 8px 8px 8px 48px;
  }
  .project-card:hover .project-image img,
  .project-card:hover .project-image video {
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
.projects-empty-state {
  background: #0000000a;
  border-radius: 16px;
  margin-top: 32px;
  padding: 32px;
}
.projects-empty-state__title {
  font-size: 20px;
  letter-spacing: -0.04em;
  line-height: 1.1;
  margin: 0;
  text-transform: uppercase;
}
.projects-empty-state__description {
  font-size: 14px;
  line-height: 1.5;
  margin: 10px 0 0;
  opacity: 0.6;
}

/* chips */
.chip {
  border: 0;
  border-radius: 222px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'Maison Neue', sans-serif;
  font-size: 14px;
  letter-spacing: -0.28px;
  line-height: 1.1;
  min-height: 36px;
  padding: 0 14px;
  white-space: nowrap;
}
.chip-icon {
  font-size: 18px;
  font-weight: 300;
  line-height: 1;
}
.chip-soft {
  background: #d5d5d5;
  color: #000;
}
.chip-light {
  background: #fff;
  color: #000;
  border: 1px solid #353535;
}
.chip-solid {
  background: #000;
  color: #fff;
}
.chip-outline {
  background: transparent;
  border: 1px solid #353535;
  color: #000;
}
.projects-category-panel {
  background: #dcdcdc;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  left: 0;
  padding: 24px;
  position: absolute;
  top: 52px;
  width: 432px;
  z-index: 4;
}
.projects-category-panel--wide {
  width: 480px;
}
.panel-title {
  font-size: 14px;
  font-weight: 300;
  letter-spacing: -0.28px;
  line-height: 1.1;
  margin: 0;
}
.panel-options {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

/* mobile */
.projects-mobile {
  background: #fff;
  display: none;
}
.projects-mobile-content {
  margin: 0 auto;
  padding: 459px 0 60px;
  width: min(392px, calc(100% - 48px));
}
.projects-mobile-title {
  font-size: 56px;
  font-weight: 700;
  letter-spacing: -2.8px;
  line-height: 0.814;
  margin: 0;
  text-align: center;
  text-transform: uppercase;
}
.projects-mobile-list {
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin: 60px auto 0;
  width: auto;
}
.projects-mobile-row {
  display: flex;
  width: 100%;
}
.projects-mobile-row--start {
  justify-content: flex-start;
}
.projects-mobile-row--end {
  justify-content: flex-end;
}
.projects-mobile-row--center {
  justify-content: center;
}
.projects-mobile-card {
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 100%;
  text-decoration: none;
}
.projects-mobile-image {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  transition: border-radius 0.26s cubic-bezier(0.22, 1, 0.36, 1);
  width: 100%;
}
.projects-mobile-image img,
.projects-mobile-image video {
  display: block;
  height: 100%;
  inset: 0;
  object-fit: cover;
  position: absolute;
  transition: transform 0.22s ease;
  width: 100%;
}
.projects-mobile-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-transform: uppercase;
  width: 100%;
}
.projects-mobile-info .project-category {
  font-size: 10px;
  letter-spacing: 0.2px;
}
.projects-mobile-info .project-title {
  font-size: 17px;
  letter-spacing: -0.85px;
}

@media (max-width: 1180px) and (min-width: 560px) {
  .projects-desktop {
    padding: 0 24px 120px;
  }
  .projects-main {
    padding-top: 280px;
    width: min(100%, 960px);
  }
  .projects-title {
    font-size: clamp(72px, 8vw, 88px);
    letter-spacing: -4px;
  }
  .projects-list-container {
    margin-top: 72px;
  }
  .projects-pattern {
    gap: 24px;
    margin-top: 40px;
  }
  .projects-pattern-row {
    gap: 20px;
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
  .project-card {
    gap: 14px;
  }
  .project-title {
    font-size: 18px;
    letter-spacing: -0.9px;
  }
}
@media (max-width: 559px) {
  .projects-desktop {
    display: none;
  }
  .projects-mobile {
    display: block;
  }
}
</style>
