"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface RevealSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "zoom";
}

export default function RevealSection({
  children,
  className = "",
  id,
  delay = 0,
  direction = "up",
}: RevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -20px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  const getHiddenTransform = () => {
    switch (direction) {
      case "left":
        return "opacity-0 -translate-x-12 blur-[2px]";
      case "right":
        return "opacity-0 translate-x-12 blur-[2px]";
      case "down":
        return "opacity-0 -translate-y-12 blur-[2px]";
      case "zoom":
        return "opacity-0 scale-95 blur-[2px]";
      case "up":
      default:
        return "opacity-0 translate-y-12 blur-[2px]";
    }
  };

  return (
    <div
      ref={ref}
      id={id}
      style={{
        transitionDuration: "900ms",
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`transition-all ${
        isVisible
          ? "opacity-100 translate-x-0 translate-y-0 scale-100 filter-none"
          : getHiddenTransform()
      } ${className}`}
    >
      {children}
    </div>
  );
}
