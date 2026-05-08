import gsap from "gsap";

/**
 * Hero animation:
 *  - Logo PNG enters with scale + rotation + fade
 *  - Decorative stitch circles fade-in and counter-rotate forever
 *  - Diagonal threads stitch in from the corners
 *  - Needle dot orbits around the logo on a perpetual loop
 *  - Logo perpetual breathing
 */
export function animateHero(): void {
  const heroRoot = document.querySelector<HTMLElement>("[data-hero]");
  if (!heroRoot) return;

  const logoBox = heroRoot.querySelector<HTMLElement>("[data-hero-logo]");
  const headline = heroRoot.querySelector<HTMLElement>("[data-hero-headline]");
  const sub = heroRoot.querySelector<HTMLElement>("[data-hero-sub]");
  const cta = heroRoot.querySelector<HTMLElement>("[data-hero-cta]");
  const scrollHint = heroRoot.querySelector<HTMLElement>("[data-hero-scrollhint]");

  const stitchOuter = heroRoot.querySelector<SVGCircleElement>('[data-hero-stitch="outer"]');
  const stitchInner = heroRoot.querySelector<SVGCircleElement>('[data-hero-stitch="inner"]');
  const threads = heroRoot.querySelectorAll<SVGLineElement>("[data-hero-thread]");
  const needle = heroRoot.querySelector<SVGGElement>("[data-hero-needle]");

  // Master timeline (entrance)
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  if (logoBox) {
    tl.from(
      logoBox,
      {
        opacity: 0,
        scale: 0.4,
        rotation: -8,
        duration: 1.1,
        ease: "back.out(1.4)",
        transformOrigin: "50% 50%",
      },
      0,
    );
  }

  if (stitchOuter) {
    tl.from(stitchOuter, { opacity: 0, scale: 0.6, transformOrigin: "50% 50%", duration: 1 }, 0.35);
  }
  if (stitchInner) {
    tl.from(stitchInner, { opacity: 0, scale: 0.7, transformOrigin: "50% 50%", duration: 1 }, 0.5);
  }

  threads.forEach((thread, i) => {
    tl.fromTo(
      thread,
      { opacity: 0, scaleX: 0, scaleY: 0, transformOrigin: "0% 0%" },
      { opacity: 0.4, scaleX: 1, scaleY: 1, duration: 0.6, ease: "power2.out" },
      0.7 + i * 0.1,
    );
  });

  if (headline) tl.from(headline, { opacity: 0, y: 24, duration: 0.8 }, 0.9);
  if (sub) tl.from(sub, { opacity: 0, y: 16, duration: 0.7 }, 1.15);
  if (cta) tl.from(cta, { opacity: 0, y: 12, duration: 0.6 }, 1.35);
  if (scrollHint) tl.from(scrollHint, { opacity: 0, duration: 0.5 }, 1.6);

  // ---- Perpetual loops ----

  if (logoBox) {
    gsap.to(logoBox, {
      scale: 1.04,
      duration: 4.2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      transformOrigin: "50% 50%",
    });
  }

  // Counter-rotating stitching circles (cucitura che ruota lentamente)
  if (stitchOuter) {
    gsap.to(stitchOuter, {
      rotation: 360,
      duration: 28,
      ease: "none",
      repeat: -1,
      transformOrigin: "50% 50%",
      svgOrigin: "200 200",
    });
  }
  if (stitchInner) {
    gsap.to(stitchInner, {
      rotation: -360,
      duration: 36,
      ease: "none",
      repeat: -1,
      transformOrigin: "50% 50%",
      svgOrigin: "200 200",
    });
  }

  // Real needle (SVG group) orbiting the outer stitch circle.
  if (needle && stitchOuter) {
    gsap.set(needle, { opacity: 1 });
    const length = stitchOuter.getTotalLength();
    const state = { progress: 0 };
    gsap.to(state, {
      progress: 1,
      duration: 12,
      ease: "none",
      repeat: -1,
      onUpdate: () => {
        const distance = length * state.progress;
        const pt = stitchOuter.getPointAtLength(distance);
        const ahead = stitchOuter.getPointAtLength((distance + 1) % length);
        const angle = (Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180) / Math.PI;
        needle.setAttribute(
          "transform",
          `translate(${pt.x.toFixed(2)} ${pt.y.toFixed(2)}) rotate(${angle.toFixed(2)})`,
        );
      },
    });
  }

  if (scrollHint) {
    gsap.to(scrollHint, {
      y: 8,
      duration: 1.2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }
}
