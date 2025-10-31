"use client";
import { useEffect } from "react";

export default function EnableTooltips() {
  useEffect(() => {
    import("bootstrap/js/dist/tooltip").then(({ default: Tooltip }) => {
      const triggers = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      triggers.forEach(el => new Tooltip(el));
    });
  }, []);
  return null;
}
