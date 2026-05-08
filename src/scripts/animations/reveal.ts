import gsap from "gsap";

/**
 * Generic reveal-on-scroll for any element with `.reveal` or `[data-reveal]`.
 */
export function animateGenericReveals(): void {
  const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
  targets.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      },
    );
  });
}
