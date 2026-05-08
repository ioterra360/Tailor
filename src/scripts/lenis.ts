import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function setupLenis(): Lenis {
  document.documentElement.classList.add("has-lenis");

  const lenis = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    // Enable smooth touch on mobile so ScrollTrigger receives scroll events
    syncTouch: true,
    syncTouchLerp: 0.075,
    touchMultiplier: 1.4,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // Make ScrollTrigger compatible with Lenis on touch devices
  ScrollTrigger.defaults({ markers: false });

  // Intercept internal anchor links for smooth Lenis scroll
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
    if (!link) return;
    const href = link.getAttribute("href");
    if (!href || href === "#") return;
    const el = document.querySelector(href);
    if (!el) return;
    e.preventDefault();
    lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.2 });
  });

  return lenis;
}
