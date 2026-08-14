import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { theme: 'dark' },
  },
  {
    path: '/expertise',
    name: 'expertise',
    component: () => import('../views/ExpertiseView.vue'),
    meta: { theme: 'light' },
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('../views/ProjectsView.vue'),
    meta: { theme: 'light' },
  },
  {
    path: '/projects/:slug',
    name: 'project-detail',
    component: () => import('../views/ProjectDetailView.vue'),
    meta: { theme: 'dark' },
  },
  {
    path: '/case-study',
    name: 'case-study',
    component: () => import('../views/CaseStudyView.vue'),
    meta: { theme: 'dark' },
  },
  {
    path: '/case-study/:slug',
    name: 'case-study-detail',
    component: () => import('../views/CaseStudyDetailView.vue'),
    meta: { theme: 'dark' },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: { theme: 'dark' },
  },
  {
    path: '/news-press',
    name: 'news-press',
    component: () => import('../views/NewsPressView.vue'),
    meta: { theme: 'light' },
  },
  {
    path: '/news-press/:slug',
    name: 'news-detail',
    component: () => import('../views/NewsDetailView.vue'),
    meta: { theme: 'light' },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue'),
    meta: { theme: 'light' },
  },
  {
    path: '/kvkk',
    name: 'kvkk',
    component: () => import('../views/KvkkView.vue'),
    meta: { theme: 'light' },
  },
  {
    path: '/kvkk/:slug',
    name: 'kvkk-detail',
    component: () => import('../views/KvkkView.vue'),
    meta: { theme: 'light' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
    meta: { theme: 'light' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.afterEach(() => {
  // re-show the opener only on first load; handled in SiteOpener
})

export default router
