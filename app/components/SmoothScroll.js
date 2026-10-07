"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    const isDisabledRoute =
      pathname === "/checkout" ||
      pathname.startsWith("/cont") ||
      pathname.startsWith("/admin");

    if (isDisabledRoute) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let animationFrameId = null;
    let isRunning = false;

    const raf = (time) => {
      if (!isRunning) return;

      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    };

    const startAnimation = () => {
      if (isRunning || document.hidden) return;

      isRunning = true;
      animationFrameId = requestAnimationFrame(raf);
    };

    const stopAnimation = () => {
      isRunning = false;

      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAnimation();
      } else {
        lenis.resize();
        startAnimation();
      }
    };

    const handleResize = () => {
      if (!document.hidden) {
        lenis.resize();
      }
    };

    startAnimation();

    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const resizeObserver = new ResizeObserver(() => {
      if (!document.hidden) {
        lenis.resize();
      }
    });

    resizeObserver.observe(document.body);

    return () => {
      stopAnimation();
      lenis.destroy();

      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      resizeObserver.disconnect();
    };
  }, [pathname]);

  return children;
}
