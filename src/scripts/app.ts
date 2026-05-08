/**
 * Bootstrap GSAP animations + (desktop-only) Lenis smooth scroll.
 *
 * Mobile strategy:
 *  - NO Lenis on touch: native scroll is more reliable + no URL-bar conflicts
 *  - ScrollTrigger.config({ ignoreMobileResize: true }) so URL-bar collapse doesn't
 *    re-trigger animations or shift offsets
 *  - Defer ScrollTrigger.refresh() until window.load + fonts.ready + a tick
 *  - Use matchMedia in animations to keep mobile triggers minimal
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { setupLenis } from "./lenis";
import { animateHero } from "./animations/hero";
import { animateModelloCards } from "./animations/modello";
import { animateTimeline } from "./animations/timeline";
import { animateValori } from "./animations/valori";
import { animateGenericReveals } from "./animations/reveal";
import { setupHeader } from "./animations/header";

gsap.registerPlugin(ScrollTrigger);

// Avoid spurious re-trigger on iOS Safari URL-bar collapse / Android keyboard
ScrollTrigger.config({ ignoreMobileResize: true });

export function initApp(): void {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(pointer: coarse)").matches;

  setupHeader();

  if (reduceMotion) {
    gsap.set(".reveal,[data-reveal]", { opacity: 1, y: 0 });
    return;
  }

  // Lenis only on non-touch (desktop with mouse/trackpad)
  if (!isTouch) {
    setupLenis();
  }

  const boot = () => {
    animateHero();
    animateModelloCards();
    animateTimeline();
    animateValori();
    animateGenericReveals();
    // First refresh after layout
    ScrollTrigger.refresh();
  };

  const lateRefresh = () => {
    // Second refresh after fonts and images are stable
    Promise.resolve(document.fonts?.ready).finally(() => {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    });
  };

  if (document.readyState === "complete") {
    requestAnimationFrame(() => {
      boot();
      lateRefresh();
    });
  } else {
    window.addEventListener(
      "load",
      () => {
        requestAnimationFrame(() => {
          boot();
          lateRefresh();
        });
      },
      { once: true },
    );
  }
}
