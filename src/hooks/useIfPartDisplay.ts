import { Ref } from "vue";
import PageHead from "@/components/pageHead/index.vue";
import gsap from "gsap";

export function useIfPartDisplay(pageHead: Ref<InstanceType<typeof PageHead> | null>) {
  const menuObserverCallback: IntersectionObserverCallback = (entries, observer) => {
    let tl = gsap.timeline();
    entries.forEach((entry) => {
      let targetClasslist = entry.target.classList.value;
      if (entry.intersectionRatio >= 0.6) {
        pageHead.value?.navItems.forEach((v: { active: boolean; target: string }) => (v.active = targetClasslist.includes(v.target)));
      } else if (targetClasslist.includes("introduce") || targetClasslist.includes("hangingContact")) {
        return;
      } else if (entry.intersectionRatio >= 0.2 && entry.intersectionRatio < 0.5) {
        entry.target.childNodes.forEach((el) => {
          tl.fromTo(el, { y: -50, opacity: 0 }, { opacity: 1, y: 0 });
        });
        // observer.unobserve(entry.target);
      } else if (entry.intersectionRatio < 0.2) {
        entry.target.childNodes.forEach((el) => {
          gsap.to(el, { opacity: 0 });
        });
      }
    });
  };
  const observer = new IntersectionObserver(menuObserverCallback, { threshold: [0.2, 0.6] });
  let menusPart = document.querySelectorAll(".menuPart");
  menusPart.forEach((el) => observer.observe(el));
}
