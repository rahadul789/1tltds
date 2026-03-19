"use client";

import { ElementType, useEffect, useRef } from "react";
import { motion, MotionProps } from "motion/react";

export type TextScrambleProps<T extends ElementType = "p"> = {
  children: string;
  duration?: number; // milliseconds
  characterSet?: string;
  as?: T;
  className?: string;
  trigger?: boolean;
  onScrambleComplete?: () => void;
} & MotionProps;

const DEFAULT_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function TextScramble<T extends ElementType = "p">({
  children,
  duration = 800,
  characterSet = DEFAULT_CHARS,
  as,
  className,
  trigger = true,
  onScrambleComplete,
  ...props
}: TextScrambleProps<T>) {
  const Component = motion.create(as ?? "p");

  const elementRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const runningRef = useRef(false);

  // Precomputed random characters (critical for smoothness)
  const randomCharsRef = useRef<string[]>([]);

  useEffect(() => {
    const el = elementRef.current;
    if (!el || !trigger || runningRef.current) return;

    runningRef.current = true;
    startTimeRef.current = performance.now();

    const text = children;
    const length = text.length;
    const chars = characterSet;
    const charsLength = chars.length;

    // 🔒 Generate randomness ONCE (no randomness during animation)
    randomCharsRef.current = Array.from(
      { length },
      () => chars[(Math.random() * charsLength) | 0]
    );

    const animate = (now: number) => {
      const progress = Math.min((now - startTimeRef.current) / duration, 1);

      const revealCount = Math.floor(progress * length);

      let output = "";
      for (let i = 0; i < length; i++) {
        const originalChar = text[i];

        if (originalChar === " ") {
          output += " ";
        } else if (i < revealCount) {
          output += originalChar;
        } else {
          output += randomCharsRef.current[i];
        }
      }

      // Direct DOM write → no React re-render
      el.textContent = output;

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        el.textContent = text;
        runningRef.current = false;
        onScrambleComplete?.();
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      runningRef.current = false;
    };
  }, [trigger, children, duration, characterSet, onScrambleComplete]);

  return (
    <Component
      ref={(node: HTMLElement | null) => {
        elementRef.current = node;
      }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}
