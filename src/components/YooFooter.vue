<script setup>
import { navLinks, socialLinks, footerInfo, assets } from '../data/site'
import LogoMark from './LogoMark.vue'
import etagLogoUrl from '../assets/ETAG_logo.svg'
</script>

<template>
  <footer class="yoo-footer">
    <img :src="assets.topLine" alt="" aria-hidden="true" class="footer-top-line" />
    <div class="footer-container">
      <div class="footer-links">
        <router-link to="/" class="footer-logo-wrap" aria-label="Go to homepage">
          <span class="footer-logo" style="color: #000"><LogoMark /></span>
        </router-link>
        <nav class="footer-nav" aria-label="Footer navigation">
          <router-link v-for="link in navLinks" :key="link.href" :to="link.href" class="nav-link">
            {{ link.label }}
          </router-link>
        </nav>
        <div class="social-links">
          <a
            v-for="social in socialLinks"
            :key="social.href"
            :href="social.href"
            target="_blank"
            rel="noreferrer noopener"
            class="social-link"
          >
            <span>{{ social.label }}</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
      <div class="footer-info">
        <p class="info-text">{{ footerInfo.lineOne }}</p>
        <p class="info-text">{{ footerInfo.lineTwo }}</p>
      </div>
      <div class="footer-background">
        <img :src="etagLogoUrl" class="bg-tile" alt="" aria-hidden="true" />
      </div>
    </div>
  </footer>
</template>

<style scoped>
.yoo-footer {
  background: #fff;
  color: #000;
  font-family: 'Maison Neue', sans-serif;
  font-synthesis: none;
  min-height: 1123px;
  overflow: hidden;
  position: relative;
}
.footer-top-line {
  height: 1px;
  left: 0;
  opacity: 0.22;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: 100%;
}
.footer-container {
  display: flex;
  flex-direction: column;
  gap: 96px;
  isolation: isolate;
  margin: 0 auto;
  max-width: 1728px;
  padding-top: 96px;
  position: relative;
  width: 100%;
}
.footer-links {
  align-items: flex-start;
  display: flex;
  gap: 70px;
  padding: 0 48px;
  position: relative;
  z-index: 2;
}
.footer-links > * {
  min-width: 0;
}
.footer-logo-wrap {
  display: block;
  flex-shrink: 0;
  height: 72.9546px;
  width: 229.838px;
}
.footer-logo {
  display: block;
  height: 100%;
  width: 100%;
}
.footer-logo :deep(svg) {
  height: 100%;
  width: 100%;
}
.footer-nav {
  display: flex;
  flex: 1 1 260px;
  flex-direction: column;
  gap: 23px;
  min-width: 184px;
}
.nav-link {
  color: #000;
  display: block;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.05em;
  line-height: 1.1;
  text-decoration: none;
  text-transform: uppercase;
}
.social-links {
  display: flex;
  flex: 1 1 220px;
  flex-direction: column;
  gap: 12px;
  min-width: 132px;
}
.social-link {
  align-items: center;
  color: #000;
  display: inline-flex;
  font-size: 14px;
  font-weight: 400;
  gap: 4px;
  letter-spacing: -0.02em;
  line-height: 1.1;
  text-decoration: none;
}
.footer-info {
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
  border-top: 1px solid rgba(0, 0, 0, 0.09);
  display: flex;
  font-weight: 300;
  gap: 16px;
  justify-content: space-between;
  letter-spacing: -0.24px;
  margin: 0 48px;
  padding: 32px 0;
  position: relative;
  z-index: 2;
}
.info-text {
  letter-spacing: -0.02em;
  opacity: 0.5;
}
.info-text {
  font-size: 12px;
  font-weight: 300;
  line-height: 1.1;
  margin: 0;
  text-transform: uppercase;
  white-space: nowrap;
}
.footer-background {
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  overflow: hidden;
  padding: 24px 48px 96px;
  position: relative;
  width: 100%;
  z-index: 0;
}
.bg-tile {
  display: block;
  height: auto;
  max-width: 100%;
  opacity: 0.12;
  position: relative;
  width: min(780px, 80%);
  z-index: 0;
}
@media (max-width: 1480px) {
  .footer-links {
    gap: 36px;
  }
  .footer-logo-wrap {
    height: 65.36px;
    width: 206px;
  }
  .footer-nav {
    flex-basis: 220px;
    min-width: 176px;
  }
}
@media (max-width: 1300px) {
  .footer-links {
    align-items: start;
    column-gap: 36px;
    display: grid;
    grid-template-columns: 206px minmax(176px, 1fr) minmax(132px, 0.8fr);
    row-gap: 32px;
  }
  .footer-logo-wrap {
    grid-column: 1;
    grid-row: 1;
  }
  .footer-nav {
    grid-column: 2;
    grid-row: 1;
    width: 100%;
  }
  .social-links {
    grid-column: 3;
    grid-row: 1;
  }
}
@media (max-width: 1120px) {
  .footer-links {
    column-gap: 48px;
    gap: 32px;
    grid-template-columns: minmax(0, 1fr) minmax(280px, 1fr);
  }
  .footer-logo-wrap {
    grid-column: 1;
    grid-row: 1;
  }
  .footer-nav {
    grid-column: 1;
    grid-row: 2;
  }
  .social-links {
    grid-column: 1;
    grid-row: 3;
  }
}
@media (max-width: 1400px) {
  .footer-info {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }
  .info-text {
    white-space: normal;
  }
}
@media (max-width: 768px) {
  .yoo-footer {
    background: #f5f5f5;
    min-height: 1190px;
  }
  .footer-container {
    gap: 0;
    max-width: 440px;
    padding-top: 64px;
  }
  .footer-links {
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 0 24px;
  }
  .footer-nav,
  .social-links {
    max-width: none;
    min-width: 0;
    width: 100%;
  }
  .footer-info {
    align-items: flex-start;
    border: 0;
    flex-direction: column;
    gap: 40px;
    justify-content: flex-start;
    margin: 40px 0 0;
    padding: 0 24px;
  }
  .info-text {
    white-space: nowrap;
  }
  .footer-background {
    justify-content: center;
    margin: 24px auto 0;
    max-width: 440px;
    overflow: hidden;
    padding: 0 24px 64px;
    transform: none;
    width: 100%;
  }
  .bg-tile {
    height: auto;
    width: 100%;
  }
}
</style>
