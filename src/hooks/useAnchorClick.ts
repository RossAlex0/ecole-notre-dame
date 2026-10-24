import { useEffect } from "react";

// Calls onClick whenever a link pointing to #hash is clicked, even if the URL already has it.
export function useAnchorClick(hash: string, onClick: () => void) {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>("a[href]");

      if (link && new URL(link.href).hash === `#${hash}`) onClick();
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [hash, onClick]);
}
