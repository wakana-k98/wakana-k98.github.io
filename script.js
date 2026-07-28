/**
 * Wakana Portfolio — JavaScript Interactions
 * Handles: pill nav visibility, active state, scroll reveal
 */

// ── Hide pill-nav while hero is visible (hero-nav takes its place) ────
const pillNav  = document.getElementById('pill-nav');
const heroEl   = document.getElementById('home');

const heroVis  = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    pillNav.classList.toggle('pill-nav--hidden', entry.isIntersecting);
  });
}, { threshold: 0.1 });

heroVis.observe(heroEl);

// ── Active pill on scroll ──────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const pills    = document.querySelectorAll('.pill[data-section]');

const navObs   = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      pills.forEach(p => p.classList.remove('active'));
      const active = document.querySelector(`.pill[data-section="${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObs.observe(s));

// ── Scroll reveal (fade in & slide up) ─────────────────────────────────
const reveals    = document.querySelectorAll('.reveal');
const revealObs  = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

reveals.forEach(el => revealObs.observe(el));

/**
 * ANIMATION TESTING NOTES:
 * 
 * Entrance animations: 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
 * - Trinkets slide in from left/right with scale, starting at 0.7
 * - Staggered by 0–0.4s, completing by ~2.6s
 * 
 * Sway animations: Continuous loops starting at 2.6s+
 * - 10 unique keyframes (sway-1 through sway-10)
 * - Desktop: 24–32px amplitude
 * - Tablet: unchanged
 * - Mobile (≤768px): ~12–15px amplitude (reduced for smaller screens)
 * 
 * Hero text fade-in:
 * - Title: 0.8s ease-out at 0.9s delay
 * - Subtitle: 0.8s ease-out at 1.05s delay
 * - Nav: 0.8s ease-out at 1.2s delay
 * 
 * Pill nav visibility:
 * - Hidden during hero (threshold 0.1)
 * - Appears after scrolling past hero section
 * - Smooth 0.35s ease transition
 */