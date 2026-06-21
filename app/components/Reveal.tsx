"use client";
import React, { useRef, useEffect, useState } from "react";

export function Reveal({
  children,
  delay = 0,
  className = "",
  style = {},
  animation = "riseIn",
  duration = "0.7s",
}: any) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: isVisible ? 1 : 0,
        animation: isVisible ? `${animation} ${duration} ease-out ${delay}s both` : "none",
      }}
    >
      {children}
    </div>
  );
}
