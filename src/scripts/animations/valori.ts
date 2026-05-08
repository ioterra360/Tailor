import gsap from "gsap";
import { followPathOnPlay } from "./follow-path";

export function animateValori(): void {
  const cards = document.querySelectorAll<HTMLElement>("[data-valore-card]");
  if (!cards.length) return;

  cards.forEach((card, i) => {
    const filo = card.querySelector<SVGPathElement>("[data-valore-filo]");
    const needle = card.querySelector<SVGGElement>("[data-valore-needle]");

    if (filo) {
      const length = filo.getTotalLength();
      filo.style.strokeDasharray = `${length}`;
      filo.style.strokeDashoffset = `${length}`;
    }

    gsap.from(card, {
      scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" },
      opacity: 0,
      y: 40,
      duration: 0.8,
      delay: i * 0.1,
      ease: "power2.out",
    });

    if (filo) {
      gsap.to(filo, {
        scrollTrigger: { trigger: card, start: "top 70%", toggleActions: "play none none none" },
        strokeDashoffset: 0,
        duration: 1.8,
        delay: 0.2 + i * 0.1,
        ease: "power2.out",
      });

      if (needle) {
        followPathOnPlay(filo, needle, {
          trigger: card,
          start: "top 70%",
          duration: 1.8,
          ease: "power2.out",
        });
      }
    }
  });

  const heading = document.querySelector<HTMLElement>("[data-valori-heading]");
  if (heading) {
    gsap.from(heading, {
      scrollTrigger: { trigger: heading, start: "top 85%", toggleActions: "play none none none" },
      opacity: 0,
      y: 32,
      duration: 0.9,
      ease: "power3.out",
    });
  }
}
