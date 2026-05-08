import gsap from "gsap";
import type { ScrollTrigger } from "gsap/ScrollTrigger";

type Trigger = HTMLElement | string;

interface ScrubOpts {
  trigger: Trigger;
  start?: string;
  end?: string;
  scrub?: number | boolean;
}

interface PlayOpts {
  trigger: Trigger;
  start?: string;
  duration?: number;
  ease?: string;
  toggleActions?: string;
}

/**
 * Make an SVG group follow an SVG path while a scroll-driven progress goes 0→1.
 * Works on any SVGGeometryElement (path, circle, ellipse, line) thanks to getPointAtLength.
 */
export function followPathOnScroll(
  path: SVGGeometryElement,
  follower: SVGGElement,
  opts: ScrubOpts,
): void {
  const length = path.getTotalLength();
  if (length === 0) return;

  gsap.set(follower, { opacity: 1 });
  const state = { progress: 0 };

  gsap.to(state, {
    progress: 1,
    ease: "none",
    scrollTrigger: {
      trigger: opts.trigger,
      start: opts.start ?? "top 75%",
      end: opts.end ?? "bottom 70%",
      scrub: opts.scrub ?? 0.5,
    },
    onUpdate: () => updateFollower(path, follower, length, state.progress),
  });
}

/**
 * Make an SVG group sweep along the path once when the trigger enters viewport.
 */
export function followPathOnPlay(
  path: SVGGeometryElement,
  follower: SVGGElement,
  opts: PlayOpts,
): void {
  const length = path.getTotalLength();
  if (length === 0) return;

  gsap.set(follower, { opacity: 0 });
  const state = { progress: 0 };

  gsap.to(state, {
    progress: 1,
    duration: opts.duration ?? 1.6,
    ease: opts.ease ?? "power2.inOut",
    scrollTrigger: {
      trigger: opts.trigger,
      start: opts.start ?? "top 80%",
      toggleActions: opts.toggleActions ?? "play none none reverse",
    },
    onStart: () => gsap.set(follower, { opacity: 1 }),
    onUpdate: () => updateFollower(path, follower, length, state.progress),
    // Needle stays visible at the end of the thread (don't hide it)
  });
}

/**
 * Make an SVG group orbit on a perpetual loop (used for the hero needle around the logo).
 */
export function orbitPathLoop(
  path: SVGGeometryElement,
  follower: SVGGElement,
  duration = 8,
): void {
  const length = path.getTotalLength();
  if (length === 0) return;

  gsap.set(follower, { opacity: 1 });
  const state = { progress: 0 };

  gsap.to(state, {
    progress: 1,
    duration,
    ease: "none",
    repeat: -1,
    onUpdate: () => updateFollower(path, follower, length, state.progress),
  });
}

function updateFollower(
  path: SVGGeometryElement,
  follower: SVGGElement,
  length: number,
  progress: number,
): void {
  const distance = length * progress;
  const pt = path.getPointAtLength(distance);
  const ahead = path.getPointAtLength(Math.min(length, distance + 1));
  const angle = (Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180) / Math.PI;
  follower.setAttribute(
    "transform",
    `translate(${pt.x.toFixed(2)} ${pt.y.toFixed(2)}) rotate(${angle.toFixed(2)})`,
  );
}

// Re-export types for downstream files that might want them
export type { ScrollTrigger };
