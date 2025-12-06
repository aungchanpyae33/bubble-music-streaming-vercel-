// Allowed elements store (global for each menu)
// per run each sub portal

export interface RegisterPortalValue {
  add: (el: HTMLElement | null) => void;
  remove: (el: HTMLElement | null) => void;
  has: (target: Node) => boolean;
}

export function createOutsideClickRegistryPortal() {
  // this act store of element (portal element , to use later in outterClick because of portal open in new DOM node)
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
  };
}
