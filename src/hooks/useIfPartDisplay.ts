import { Ref } from "vue";
import PageHead from "@/components/pageHead/index.vue";
import gsap from "gsap";

let tl = gsap.timeline();
export function useIfPartDisplay(pageHead: Ref<InstanceType<typeof PageHead> | null>) {
  const menuObserverCallback: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach((entry) => {
      let targetClasslist = entry.target.classList.value;
      if (entry.intersectionRatio > 0.6) {
        pageHead.value?.navItems.forEach((v: { active: boolean; target: string }) => (v.active = targetClasslist.includes(v.target)));
      }
    });
  };
  const childElObserverCallback: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0.1) {
        tl.fromTo(
          entry.target,
          { y: -50, opacity: 0 },
          {
            opacity: 1,
            y: 0,
            onComplete: () => {
              observer.unobserve(entry.target);
            },
          }
        );
      }
    });
  };
  const observer = new IntersectionObserver(menuObserverCallback, { threshold: [0.6] });
  const observerChildEl = new IntersectionObserver(childElObserverCallback, { threshold: [0.1] });
  let menusPart = document.querySelectorAll(".menuPart");
  menusPart.forEach((el) => {
    observer.observe(el);
    if (!el.classList.contains("introduce")) {
      el.childNodes.forEach((v: any) => {
        v.style = "opacity:0";
        observerChildEl.observe(v);
      });
    }
  });
}
