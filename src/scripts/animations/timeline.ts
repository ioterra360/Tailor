import gsap from "gsap";
import { followPathOnPlay, followPathOnScroll } from "./follow-path";

/**
 * "Come lavoriamo" timeline — heavy on cucitura:
 *  - Hero image thread draws when entering viewport, with needle following
 *  - The dominant timeline thread is drawn progressively while scrolling
 *  - A large needle (with body, eye, sharp tip) travels along the path
 *  - Step dots pulse as needle approaches
 */
export function animateTimeline(): void {
  const timeline = document.querySelector<HTMLElement>("[data-timeline]");
  if (!timeline) return;

  const path = timeline.querySelector<SVGPathElement>("[data-timeline-path]");
  const needle = timeline.querySelector<SVGGElement>("[data-timeline-needle]");
  const steps = timeline.querySelectorAll<HTMLElement>("[data-timeline-step]");
  const dots = timeline.querySelectorAll<HTMLElement>("[data-timeline-dot]");

  // 1. Hero image thread + needle (above timeline)
  const heroThread = document.querySelector<SVGPathElement>("[data-processo-hero-thread]");
  const heroNeedle = document.querySelector<SVGGElement>("[data-processo-hero-needle]");
  if (heroThread) {
    const len = heroThread.getTotalLength();
    heroThread.style.strokeDasharray = `${len}`;
    heroThread.style.strokeDashoffset = `${len}`;
    gsap.to(heroThread, {
      strokeDashoffset: 0,
      duration: 2.4,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: heroThread,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    if (heroNeedle) {
      followPathOnPlay(heroThread, heroNeedle, {
        trigger: "[data-processo-hero-thread]",
        start: "top 80%",
        duration: 2.4,
        ease: "power2.inOut",
      });
    }
  }

  // 2. Step reveal on scroll
  steps.forEach((step, i) => {
    gsap.from(step, {
      scrollTrigger: {
        trigger: step,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      delay: 0.05 * i,
      ease: "power2.out",
    });
  });

  // Heading
  const heading = timeline.querySelector<HTMLElement>("[data-timeline-heading]");
  if (heading) {
    gsap.from(heading, {
      scrollTrigger: { trigger: heading, start: "top 85%", toggleActions: "play none none none" },
      opacity: 0,
      y: 32,
      duration: 0.9,
      ease: "power3.out",
    });
  }

  // 3. Dominant timeline thread — draws on scroll progress
  if (path) {
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: timeline,
        start: "top 75%",
        end: "bottom 70%",
        scrub: 0.5,
      },
    });

    // 4. Large needle following the path while it's drawn
    if (needle) {
      gsap.set(needle, { opacity: 1 });
      const obj = { progress: 0 };

      gsap.to(obj, {
        progress: 1,
        ease: "none",
        scrollTrigger: {
          trigger: timeline,
          start: "top 75%",
          end: "bottom 70%",
          scrub: 0.5,
        },
        onUpdate: () => {
          const pt = path.getPointAtLength(length * obj.progress);
          // Sample slightly ahead for rotation angle
          const ahead = path.getPointAtLength(Math.min(length, length * obj.progress + 1));
          const angle = (Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180) / Math.PI;
          needle.setAttribute(
            "transform",
            `translate(${pt.x.toFixed(2)} ${pt.y.toFixed(2)}) rotate(${angle.toFixed(2)})`,
          );
        },
      });
    }
  }

  // 4b. Mobile-only vertical thread + metallic needle through the 6 benefits
  const mobilePath = timeline.querySelector<SVGPathElement>("[data-timeline-mobile-path]");
  const mobileNeedle = timeline.querySelector<SVGGElement>("[data-timeline-mobile-needle]");
  if (mobilePath) {
    const mLen = mobilePath.getTotalLength() || 2400;
    mobilePath.style.strokeDasharray = `${mLen}`;
    mobilePath.style.strokeDashoffset = `${mLen}`;
    gsap.to(mobilePath, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: timeline,
        start: "top 85%",
        end: "bottom 75%",
        scrub: 0.5,
      },
    });
    if (mobileNeedle) {
      followPathOnScroll(mobilePath, mobileNeedle, {
        trigger: timeline,
        start: "top 85%",
        end: "bottom 75%",
        scrub: 0.5,
      });
    }
  }

  // 5. Dots pulse when entering viewport
  dots.forEach((dot, i) => {
    gsap.from(dot, {
      scrollTrigger: {
        trigger: steps[i],
        start: "top 75%",
        toggleActions: "play none none none",
      },
      scale: 0,
      duration: 0.6,
      delay: 0.05 * i + 0.15,
      ease: "back.out(2.4)",
      transformOrigin: "50% 50%",
    });

    // Perpetual pulse on each dot
    gsap.to(dot, {
      boxShadow: "0 0 50px rgba(59,130,246,1)",
      duration: 1.6,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: i * 0.3,
    });
  });
}
