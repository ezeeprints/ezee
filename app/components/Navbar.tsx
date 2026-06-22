"use client";

import { useEffect } from "react";
import Link from "next/link";

const EziLogoSVG = () => (
  <svg width="20" height="20" viewBox="0 0 140 160">
    <path
      d="M70 28 C104 28 116 60 116 94 C116 132 98 152 70 152 C42 152 24 132 24 94 C24 60 36 28 70 28Z"
      fill="#FAF7F1"
    />
    <circle cx="58" cy="92" r="4.4" fill="#2A2928" />
    <circle cx="82" cy="92" r="4.4" fill="#2A2928" />
    <path
      d="M62 104 Q70 110 78 104"
      stroke="#2A2928"
      strokeWidth="2.6"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M40 44 Q70 16 100 44 Q86 51 70 51 Q54 51 40 44Z"
      fill="#7A6D8C"
    />
  </svg>
);

export default function Navbar() {
  useEffect(() => {
    const nav = document.getElementById("main-nav");
    if (!nav) return;

    const onScroll = () => {
      if (window.scrollY > 40) {
        nav.style.boxShadow =
          "0 1px 0 rgba(255,255,255,.7) inset, 0 16px 40px -14px rgba(42,41,40,.4), 0 3px 8px rgba(42,41,40,.1)";
        nav.style.background = "rgba(250,247,241,.92)";
      } else {
        nav.style.boxShadow =
          "0 1px 0 rgba(255,255,255,.7) inset, 0 10px 30px -12px rgba(42,41,40,.28), 0 2px 6px rgba(42,41,40,.06)";
        nav.style.background = "rgba(250,247,241,.82)";
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      id="main-nav"
      style={{
        position: "fixed",
        top: 18,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 8000,
        display: "flex",
        alignItems: "center",
        gap: "clamp(14px,2vw,30px)",
        padding: "10px 12px 10px 18px",
        background: "rgba(250,247,241,.82)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: "1px solid rgba(42,41,40,.07)",
        borderRadius: 22,
        boxShadow:
          "0 1px 0 rgba(255,255,255,.7) inset, 0 10px 30px -12px rgba(42,41,40,.28), 0 2px 6px rgba(42,41,40,.06)",
        transition: "box-shadow .5s ease, background .5s ease",
      }}
    >
      <a
        href="#hero"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 9,
          textDecoration: "none",
          color: "#2A2928",
        }}
      >
        <span
          style={{
            display: "grid",
            placeItems: "center",
            width: 34,
            height: 34,
            borderRadius: 11,
            background: "#2A2928",
          }}
        >
          <EziLogoSVG />
        </span>
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: 19,
            letterSpacing: "-0.02em",
          }}
        >
          EZEE
        </span>
      </a>

      <div
        className="nav-links"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          fontSize: 14.5,
          fontWeight: 500,
          color: "#5b554f",
        }}
      >
        {[
          { href: "#how", label: "How it works" },
          { href: "#city", label: "Find a shop" },
          { href: "#stories", label: "Stories" },
          { href: "#faq", label: "FAQ" },
        ].map(({ href, label }) => (
          <a
            key={href}
            href={href}
            style={{
              textDecoration: "none",
              color: "inherit",
              transition: "color .3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "#D48A70")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "inherit")
            }
          >
            {label}
          </a>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Link
          href="/workshop/login"
          style={{
            textDecoration: "none",
            fontSize: 14.5,
            fontWeight: 600,
            color: "#D48A70",
            transition: "color .3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#b36b52")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#D48A70")}
        >
          Vendor Sign In
        </Link>

      <Link
        href="/auth"
        style={{
          textDecoration: "none",
          fontSize: 14.5,
          fontWeight: 600,
          color: "#FAF7F1",
          background: "#D48A70",
          padding: "10px 18px",
          borderRadius: 14,
          boxShadow: "0 6px 14px -6px rgba(212,138,112,.8)",
          transition:
            "transform .35s cubic-bezier(.2,.9,.3,1.2), box-shadow .35s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow =
            "0 12px 22px -8px rgba(212,138,112,.85)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "";
          e.currentTarget.style.boxShadow =
            "0 6px 14px -6px rgba(212,138,112,.8)";
        }}
      >
        Start Printing
      </Link>
      </div>
    </nav>
  );
}
