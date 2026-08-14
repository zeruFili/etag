// Shared composable for scroll-based reveal behaviors.

// Adds `is-revealed` to elements marked with data-reveal as they enter the viewport.
export function observeReveals(root) {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return
  }
  const els = root.querySelectorAll('[data-reveal]')
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed')
          io.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
  )
  els.forEach((el) => io.observe(el))
}

// Animates a line inside a `.line-mask` from translateY(100%) to 0 when revealed.
export function observeLineMasks(root) {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return
  }
  const els = root.querySelectorAll('[data-line-reveal]')
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1'
          entry.target.style.transform = 'translateY(0)'
          io.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.25 }
  )
  els.forEach((el) => io.observe(el))
}

// Tracks scroll progress of an element and updates a CSS var for glyph reveal.
export function createScrollRevealUpdater(el) {
  if (typeof window === 'undefined') {
    return () => {}
  }
  let raf = 0
  const update = () => {
    raf = 0
    const rect = el.getBoundingClientRect()
    const vh = window.innerHeight || 1
    const start = vh * 0.9
    const end = vh * 0.25
    let progress = (start - rect.top) / (start - end)
    progress = Math.max(0, Math.min(1, progress))
    el.style.setProperty('--scroll-reveal-progress', progress.toFixed(4))
  }
  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(update)
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  update()
  return () => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
    if (raf) cancelAnimationFrame(raf)
  }
}
