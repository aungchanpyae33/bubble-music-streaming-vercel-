export interface RegisterPortalValue {
  add: (el: HTMLElement | null) => void;
  remove: (el: HTMLElement | null) => void;
  has: (target: Node) => boolean;
  show: () => void;
}

export function createOutsideClickRegistryPortal(): RegisterPortalValue {
  const elements = new Set<HTMLElement>();

  return {
    add: (el: HTMLElement | null) => {
      if (el) elements.add(el);
    },
    remove: (el: HTMLElement | null) => {
      if (el) elements.delete(el);
    },
    has: (target: Node) => {
      for (const el of elements) {
        if (el.contains(target)) return true;
      }
      return false;
    },

    // NEW: show all elements stored inside
    show: () => {
      console.log("Current elements in registry:");
      for (const el of elements) {
        console.log(el);
      }
      if (elements.size === 0) {
        console.log("(empty)");
      }
    },
  };
}
