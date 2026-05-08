import gsap from "gsap";
import { followPathOnPlay, followPathOnScroll } from "./follow-path";

export function animateModelloCards(): void {
  const cards = document.querySelectorAll<HTMLElement>("[data-modello-card]");
  if (!cards.length) return;

  const mm = gsap.matchMedia();

  // Desktop: slide-x alternato
  mm.add("(hover: hover) and (pointer: fine)", () => {
    cards.forEach((card, i) => {
      const fromLeft = i % 2 === 0;
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: "top 80%", toggleActions: "play none none reverse" },
        opacity: 0,
        x: fromLeft ? -60 : 60,
        duration: 1.1,
        ease: "power3.out",
      });
    });
  });

  // Touch / mobile: solo fade + Y, niente slide-x (più stabile)
  mm.add("(hover: none), (pointer: coarse)", () => {
    cards.forEach((card) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none none" },
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: "power3.out",
      });
    });
  });

  // Per-card thread + needle (entrambi i contesti)
  cards.forEach((card) => {
    const thread = card.querySelector<SVGPathElement>("[data-modello-thread]");
    const needle = card.querySelector<SVGGElement>("[data-modello-needle]");

    if (thread) {
      const len = thread.getTotalLength() || 1500;
      thread.style.strokeDasharray = `${len}`;
      thread.style.strokeDashoffset = `${len}`;
      // Set initial opacity 0 so fade-in always works even if dashoffset fails
      gsap.set(thread, { opacity: 0 });

      gsap.to(thread, {
        opacity: 0.9,
        strokeDashoffset: 0,
        duration: 2.6,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      if (needle) {
        followPathOnPlay(thread, needle, {
          trigger: card,
          start: "top 85%",
          duration: 2.6,
          ease: "power3.inOut",
        });
      }
    }
  });

  // Master decorative thread + needle — DESKTOP and MOBILE variants
  const setupMasterThread = (
    threadSel: string,
    needleSel: string,
  ) => {
    const thread = document.querySelector<SVGPathElement>(threadSel);
    const needle = document.querySelector<SVGGElement>(needleSel);
    if (!thread) return;

    const len = thread.getTotalLength() || 8000;
    thread.style.strokeDasharray = `${len}`;
    thread.style.strokeDashoffset = `${len}`;

    gsap.to(thread, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: "#modello",
        start: "top 85%",
        end: "bottom 70%",
        scrub: 0.5,
      },
    });

    if (needle) {
      followPathOnScroll(thread, needle, {
        trigger: "#modello",
        start: "top 85%",
        end: "bottom 70%",
        scrub: 0.5,
      });
    }
  };

  setupMasterThread("[data-modello-master-thread]", "[data-modello-master-needle]");
  setupMasterThread("[data-modello-master-thread-mobile]", "[data-modello-master-needle-mobile]");

  const heading = document.querySelector<HTMLElement>("[data-modello-heading]");
  if (heading) {
    gsap.from(heading, {
      scrollTrigger: { trigger: heading, start: "top 88%", toggleActions: "play none none none" },
      opacity: 0,
      y: 32,
      duration: 0.9,
      ease: "power3.out",
    });
  }
}
