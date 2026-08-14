<script setup>
import { ref, onMounted, computed } from 'vue'

const props = defineProps({
  label: { type: String, default: 'MORE DETAIL' },
  href: { type: String, default: '' },
  accent: { type: Boolean, default: false },
})

const emit = defineEmits(['click'])

const root = ref(null)
const expandedWidth = ref('77px')
const labelWidth = ref('0px')

const isLink = computed(() => !!props.href && props.href !== '#')

function onClick() {
  if (!isLink.value) {
    emit('click')
  }
}

onMounted(() => {
  const el = root.value
  if (!el) return
  const measure = el.querySelector('.home-cta-button__measure')
  if (measure) {
    expandedWidth.value = Math.ceil(measure.getBoundingClientRect().width) + 'px'
    const label = measure.querySelector('.home-cta-button__measure-label')
    if (label) labelWidth.value = label.getBoundingClientRect().width + 'px'
  }
})
</script>

<template>
  <span ref="root" class="home-cta-button-root">
    <router-link
      v-if="isLink"
      :to="href"
      class="home-cta-button"
      :class="{ 'is-accent': accent }"
      :style="{ '--home-cta-expanded-width': expandedWidth, '--home-cta-label-width': labelWidth }"
    >
      <span class="home-cta-button__measure" aria-hidden="true">
        <span class="home-cta-button__measure-label">{{ label }}</span>
        <span class="home-cta-button__measure-icon">→</span>
      </span>
      <span class="home-cta-button__label-wrap">
        <span class="home-cta-button__label">{{ label }}</span>
      </span>
      <span class="home-cta-button__icon">→</span>
    </router-link>
    <button
      v-else
      type="button"
      class="home-cta-button"
      :class="{ 'is-accent': accent }"
      :style="{ '--home-cta-expanded-width': expandedWidth, '--home-cta-label-width': labelWidth }"
      @click="onClick"
    >
      <span class="home-cta-button__measure" aria-hidden="true">
        <span class="home-cta-button__measure-label">{{ label }}</span>
        <span class="home-cta-button__measure-icon">→</span>
      </span>
      <span class="home-cta-button__label-wrap">
        <span class="home-cta-button__label">{{ label }}</span>
      </span>
      <span class="home-cta-button__icon">→</span>
    </button>
  </span>
</template>

<style scoped>
.home-cta-button-root {
  display: inline-flex;
}
.home-cta-button {
  --home-cta-expanded-width: 77px;
  --home-cta-label-width: 0px;
  align-items: center;
  appearance: none;
  background: #000;
  border: 0;
  border-radius: 222px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  font-family: 'Maison Neue', sans-serif;
  font-synthesis: none;
  gap: 0;
  height: 40px;
  justify-content: flex-end;
  overflow: hidden;
  padding: 0 32px;
  position: relative;
  text-decoration: none;
  transition: width 0.34s cubic-bezier(0.22, 1, 0.36, 1), padding 0.34s cubic-bezier(0.22, 1, 0.36, 1),
    gap 0.34s cubic-bezier(0.22, 1, 0.36, 1);
  white-space: nowrap;
  width: 77px;
}
.home-cta-button.is-accent {
  background: #a63437;
}
.home-cta-button:focus-visible {
  outline: 2px solid rgba(0, 0, 0, 0.18);
  outline-offset: 4px;
}
.home-cta-button__label,
.home-cta-button__measure-label {
  display: block;
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 0.28px;
  line-height: 1;
  text-transform: uppercase;
}
.home-cta-button__icon,
.home-cta-button__measure-icon {
  display: block;
  font-size: 18px;
  font-weight: 400;
  letter-spacing: -0.36px;
  line-height: 1;
}
.home-cta-button__label-wrap {
  align-items: center;
  display: inline-flex;
  opacity: 0;
  overflow: hidden;
  transform: translate(10px);
  transition: width 0.34s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease,
    transform 0.34s cubic-bezier(0.22, 1, 0.36, 1);
  width: 0;
}
.home-cta-button__measure {
  align-items: center;
  display: inline-flex;
  gap: 8px;
  left: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  visibility: hidden;
}
@media (hover: hover) and (pointer: fine) {
  .home-cta-button:hover {
    gap: 8px;
    padding-inline: 24px;
    width: var(--home-cta-expanded-width);
  }
  .home-cta-button:hover .home-cta-button__label-wrap {
    opacity: 1;
    transform: translate(0);
    width: var(--home-cta-label-width);
  }
}
.home-cta-button:focus-visible {
  gap: 8px;
  padding-inline: 24px;
  width: var(--home-cta-expanded-width);
}
.home-cta-button:focus-visible .home-cta-button__label-wrap {
  opacity: 1;
  transform: translate(0);
  width: var(--home-cta-label-width);
}
@media (max-width: 768px) {
  .home-cta-button {
    gap: 8px;
    padding-inline: 24px;
    width: max-content;
  }
  .home-cta-button__label-wrap {
    opacity: 1;
    transform: none;
    width: auto;
  }
}
</style>
