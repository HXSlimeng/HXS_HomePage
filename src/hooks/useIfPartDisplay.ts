export function useIfPartDisplay(callback: IntersectionObserverCallback) {
  const observer = new IntersectionObserver(callback, { threshold: [0.2, 0.6] });
  let menusPart = document.querySelectorAll(".menuPart");
  menusPart.forEach((el) => observer.observe(el));
}
