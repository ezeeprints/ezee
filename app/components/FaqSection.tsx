"use client";

import { useState } from "react";

interface FaqItem {
  q: string;
  a: string;
  bg: string;
  textColor: string;
  answerColor: string;
  radius: string;
}

const faqs: FaqItem[] = [
  {
    q: "How fast can I get my prints?",
    a: "Most jobs are ready in 8–15 minutes. You'll get a ping the moment your stack is warm and waiting at the counter.",
    bg: "#F0C79B",
    textColor: "#3a2e1c",
    answerColor: "#5a4326",
    radius: "6px 6px 6px 18px",
  },
  {
    q: "Which file formats can I upload?",
    a: "PDFs, Word docs, slides, and plain images (JPG/PNG). Drop in as many as you like — Ezi keeps them in order.",
    bg: "#A9B59D",
    textColor: "#27301f",
    answerColor: "#3c4632",
    radius: "6px 18px 6px 6px",
  },
  {
    q: "How do I pay?",
    a: "Pay right in the app with UPI, cards, or wallets before you arrive. Walk in, collect, and you're done — no fumbling for change.",
    bg: "#D48A70",
    textColor: "#3a241a",
    answerColor: "#5a3a2a",
    radius: "6px 6px 18px 6px",
  },
  {
    q: "Is my data kept private?",
    a: "Always. Files are encrypted, shared only with the shop you choose, and auto-deleted after your job is printed and collected.",
    bg: "#9b8fab",
    textColor: "#241d2e",
    answerColor: "#3a3148",
    radius: "18px 6px 6px 6px",
  },
];

function FaqItem({ item, delay }: { item: FaqItem; delay: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        background: item.bg,
        color: item.textColor,
        borderRadius: item.radius,
        boxShadow: "0 16px 30px -16px rgba(0,0,0,.5)",
        animation: `riseIn .7s ease-out ${delay}s both`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "22px 24px",
          cursor: "pointer",
          userSelect: "none",
        }}
        onClick={() => setOpen((o) => !o)}
        role="button"
        aria-expanded={open}
      >
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 18.5,
          }}
        >
          {item.q}
        </span>
        <span
          style={{
            fontFamily: "'Space Grotesk', monospace",
            fontSize: 24,
            fontWeight: 500,
            transition: "transform .4s cubic-bezier(.2,.9,.3,1.2)",
            lineHeight: 1,
            transform: open ? "rotate(135deg)" : "rotate(0deg)",
          }}
        >
          +
        </span>
      </div>
      <div
        style={{
          maxHeight: open ? 200 : 0,
          opacity: open ? 1 : 0,
          overflow: "hidden",
          transition: "max-height .5s cubic-bezier(.2,.8,.2,1), opacity .5s ease",
        }}
      >
        <p
          style={{
            margin: 0,
            padding: "0 24px 22px",
            fontSize: 15,
            lineHeight: 1.6,
            color: item.answerColor,
          }}
        >
          {item.a}
        </p>
      </div>
    </div>
  );
}

export default function FaqSection() {
  return (
    <section
      id="faq"
      style={{
        position: "relative",
        padding: "clamp(90px,12vw,150px) clamp(22px,6vw,110px)",
        background:
          "radial-gradient(120% 80% at 80% 10%, #3a3550 0%, #2f2b3e 38%, #262333 100%)",
        color: "#EAE4DD",
        overflow: "hidden",
      }}
    >
      {/* moon */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          right: "10%",
          width: 90,
          height: 90,
          borderRadius: "50%",
          background: "#EAE4DD",
          boxShadow: "0 0 60px 12px rgba(234,228,221,.3)",
          animation: "lampglow 6s ease-in-out infinite",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 18,
            left: 22,
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: "rgba(122,109,140,.25)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 46,
            left: 48,
            width: 11,
            height: 11,
            borderRadius: "50%",
            background: "rgba(122,109,140,.2)",
          }}
        />
      </div>

      {/* stars */}
      {[
        { top: "14%", left: "14%", size: 4, delay: "0s" },
        { top: "22%", left: "38%", size: 3, delay: ".5s" },
        { top: "30%", left: "62%", size: 4, delay: "1s" },
        { top: "12%", left: "72%", size: 3, delay: ".3s" },
      ].map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background: "#EAE4DD",
            animation: `twinkle ${3 + i * 0.5}s ease-in-out ${s.delay} infinite`,
          }}
        />
      ))}

      <div
        style={{
          position: "relative",
          textAlign: "center",
          maxWidth: 680,
          margin: "0 auto 60px",
          animation: "riseIn .7s ease-out both",
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: ".2em",
            textTransform: "uppercase",
            color: "#b6a9c8",
          }}
        >
          After hours
        </span>
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(34px,5vw,62px)",
            lineHeight: 1.02,
            letterSpacing: "-.03em",
            margin: "14px 0 16px",
            color: "#FAF7F1",
          }}
        >
          Curious minds ask
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: "#b8b0c2", margin: 0 }}>
          Tap a sticky note to read the answer.
        </p>
      </div>

      <div
        style={{
          position: "relative",
          maxWidth: 760,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {faqs.map((faq, i) => (
          <FaqItem key={i} item={faq} delay={i * 0.05} />
        ))}
      </div>
    </section>
  );
}
