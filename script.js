/* Shifa Faheem — Portfolio interactions (no dependencies) */
(() => {
  'use strict';
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Preloader — hide on load, with a safety timeout so it never blocks the page */
  const preloader = $('#preloader');
  const hidePreloader = () => preloader?.classList.add('is-hidden');
  window.addEventListener('load', () => setTimeout(hidePreloader, reduceMotion ? 0 : 350));
  setTimeout(hidePreloader, 2500);

  /* Footer year */
  const year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* Header shadow on scroll */
  const header = $('.site-header');
  const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  const menuToggle = $('#menuToggle');
  const navigation = $('#navigation');
  const setMenu = open => {
    menuToggle?.setAttribute('aria-expanded', String(open));
    menuToggle?.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    navigation?.classList.toggle('open', open);
  };
  menuToggle?.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
  $$('a', navigation).forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  document.addEventListener('click', e => {
    if (navigation?.classList.contains('open') && !navigation.contains(e.target) && !menuToggle.contains(e.target)) setMenu(false);
  });

  /* Reveal on scroll */
  const revealTargets = $$('.section-label, .intro-layout, .about-facts, .expertise-card, .project, .more-projects, .services-grid li, .timeline li, .contact-panel, .hero-stats');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealTargets.forEach(el => { el.classList.add('reveal'); revealObserver.observe(el); });
  }

  /* Active nav link */
  const navLinks = $$('.navigation a[href^="#"]');
  if ('IntersectionObserver' in window) {
    const activeObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    $$('main section[id]').forEach(section => activeObserver.observe(section));
  }

  /* Project filters */
  const filters = $$('.filter');
  const projects = $$('.project');
  const applyFilter = value => {
    filters.forEach(btn => {
      const on = btn.dataset.filter === value;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-pressed', String(on));
    });
    projects.forEach(p => {
      const cats = (p.dataset.category || '').split(' ');
      const show = value === 'all' || cats.includes(value);
      p.hidden = !show;
      if (show) p.classList.add('visible');
    });
  };
  filters.forEach(btn => btn.addEventListener('click', () => applyFilter(btn.dataset.filter)));
  /* "What I can build" arrows jump to the projects with the matching filter */
  $$('[data-jump]').forEach(link => link.addEventListener('click', () => applyFilter(link.dataset.jump)));

  /* Copy email */
  const copyBtn = $('#copyEmail');
  copyBtn?.addEventListener('click', async () => {
    const email = copyBtn.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      copyBtn.textContent = 'Copied';
    } catch {
      window.prompt('Copy my email address:', email);
    }
    setTimeout(() => { copyBtn.textContent = 'Copy'; }, 2000);
  });

  /* Contact form → opens the visitor's email app with a pre-filled message */
  const form = $('#contactForm');
  const status = $('#formStatus');
  const emailOk = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const fields = { name: data.name?.trim(), email: data.email?.trim(), message: data.message?.trim() };
    let firstInvalid = null;
    Object.entries(fields).forEach(([key, val]) => {
      const input = form.elements[key];
      const bad = !val || (key === 'email' && !emailOk(val));
      input.setAttribute('aria-invalid', String(bad));
      if (bad && !firstInvalid) firstInvalid = input;
    });
    if (firstInvalid) {
      status.textContent = 'Please add your name, a valid email and a short message.';
      status.classList.add('is-error');
      firstInvalid.focus();
      return;
    }
    const subject = `${data.topic} — from ${fields.name}`;
    const body = `${fields.message}\n\n— ${fields.name}\n${fields.email}`;
    window.location.href = `mailto:shifafaheem20@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.classList.remove('is-error');
    status.textContent = 'Opening your email app… If nothing happens, email shifafaheem20@gmail.com directly.';
  });
  $$('input, textarea', form || document.createElement('form')).forEach(el =>
    el.addEventListener('input', () => el.removeAttribute('aria-invalid')));

  /* CV button — only shows once the PDF actually exists at assets/Shifa-Faheem-CV.pdf */
  const cvLinks = $$('#cvLink, #cvLinkContact');
  if (cvLinks.length) {
    fetch('assets/Shifa-Faheem-CV.pdf', { method: 'HEAD' })
      .then(res => { if (res.ok) cvLinks.forEach(link => link.removeAttribute('hidden')); })
      .catch(() => {});
  }
})();
