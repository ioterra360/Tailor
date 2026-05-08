/**
 * Toggle header backdrop blur after scrolling past hero.
 */
export function setupHeader(): void {
  const header = document.querySelector<HTMLElement>("[data-header]");
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 60) {
      header.classList.add("header-backdrop");
    } else {
      header.classList.remove("header-backdrop");
    }
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}
