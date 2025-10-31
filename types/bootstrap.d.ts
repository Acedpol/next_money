// src/types/bootstrap.d.ts

// Declaración del bundle completo (minificado)
// Esto cubre: import("bootstrap/dist/js/bootstrap.bundle.min.js")
declare module "bootstrap/dist/js/bootstrap.bundle.min.js" {
  // No exporta tipos en el paquete, así que lo tratamos como módulo sin tipos.
  const value: unknown;
  export default value;
}

// Declaración del bundle no minificado (por si lo usas)
declare module "bootstrap/dist/js/bootstrap.bundle.js" {
  const value: unknown;
  export default value;
}

// Declaraciones mínimas para submódulos de componentes (opcionales)
// Útil si haces imports como: import Modal from "bootstrap/js/dist/modal";
declare module "bootstrap/js/dist/alert" {
  export default class Alert {
    constructor(element: Element | string);
    close(): void;
    dispose(): void;
  }
}

declare module "bootstrap/js/dist/button" {
  export default class Button {
    constructor(element: Element | string);
    toggle(): void;
    dispose(): void;
  }
}

declare module "bootstrap/js/dist/carousel" {
  export default class Carousel {
    constructor(element: Element | string, config?: unknown);
    next(): void;
    prev(): void;
    pause(): void;
    cycle(): void;
    to(index: number): void;
    dispose(): void;
  }
}

declare module "bootstrap/js/dist/collapse" {
  export default class Collapse {
    constructor(element: Element | string, config?: unknown);
    show(): void;
    hide(): void;
    toggle(): void;
    dispose(): void;
  }
}

declare module "bootstrap/js/dist/dropdown" {
  export default class Dropdown {
    constructor(element: Element | string, config?: unknown);
    show(): void;
    hide(): void;
    toggle(): void;
    dispose(): void;
  }
}

declare module "bootstrap/js/dist/modal" {
  export default class Modal {
    constructor(element: Element | string, config?: unknown);
    show(): void;
    hide(): void;
    toggle(): void;
    handleUpdate(): void;
    dispose(): void;
  }
}

declare module "bootstrap/js/dist/offcanvas" {
  export default class Offcanvas {
    constructor(element: Element | string, config?: unknown);
    show(): void;
    hide(): void;
    toggle(): void;
    dispose(): void;
  }
}

declare module "bootstrap/js/dist/popover" {
  export default class Popover {
    constructor(element: Element | string, config?: unknown);
    show(): void;
    hide(): void;
    toggle(): void;
    dispose(): void;
  }
}

declare module "bootstrap/js/dist/scrollspy" {
  export default class ScrollSpy {
    constructor(element: Element | string, config?: unknown);
    refresh(): void;
    dispose(): void;
  }
}

declare module "bootstrap/js/dist/tab" {
  export default class Tab {
    constructor(element: Element | string);
    show(): void;
    dispose(): void;
  }
}

declare module "bootstrap/js/dist/toast" {
  export default class Toast {
    constructor(element: Element | string, config?: unknown);
    show(): void;
    hide(): void;
    dispose(): void;
  }
}

declare module "bootstrap/js/dist/tooltip" {
  export default class Tooltip {
    constructor(element: Element | string, config?: unknown);
    show(): void;
    hide(): void;
    toggle(): void;
    dispose(): void;
  }
}
