<script setup>
defineProps({ theme: { type: String, default: 'light' } })
const emit = defineEmits(['open-menu'])
</script>

<template>
  <div class="error-page">
    <div class="error-page__content">
      <p class="error-page__code">404</p>
      <p class="error-page__message">The page you are looking for does not exist.</p>
      <router-link to="/" class="error-page__button">BACK TO HOME</router-link>
    </div>
  </div>
</template>

<style scoped>
.error-page {
  --error-accent: #a63437;
  background: linear-gradient(180deg, #030101 59.976%, var(--error-accent) 167.58%);
  color: #fff;
  display: grid;
  min-height: 100vh;
  overflow: hidden;
  place-items: center;
}
.error-page__content {
  align-items: center;
  display: flex;
  flex-direction: column;
  transform: translateY(-6px);
  width: min(335.35px, calc(100vw - 48px));
}
.error-page__code {
  color: var(--error-accent);
  font-family: 'Fraunces', serif;
  font-size: clamp(104px, 8.102vw, 140px);
  font-style: italic;
  font-variation-settings: 'SOFT' 0, 'WONK' 1;
  font-weight: 400;
  letter-spacing: clamp(-8.4px, -0.486vw, -5.2px);
  line-height: 1.01;
  margin: 0;
  text-align: center;
}
.error-page__message {
  font-size: clamp(18px, 1.389vw, 24px);
  letter-spacing: clamp(-1.68px, -0.097vw, -0.9px);
  line-height: 1.01;
  margin: 9px 0 47px;
  font-weight: 300;
  text-align: center;
}
.error-page__button {
  background: var(--error-accent);
  border: 0;
  border-radius: 999px;
  color: #fff;
  cursor: pointer;
  display: inline-grid;
  font-size: 14px;
  height: 40px;
  letter-spacing: 0.28px;
  line-height: 0.814;
  place-items: center;
  width: 154.833px;
  text-decoration: none;
  font-weight: 300;
}
.error-page__button:hover {
  opacity: 0.9;
}
</style>
