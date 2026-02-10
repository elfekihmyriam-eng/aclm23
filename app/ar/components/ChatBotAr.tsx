"use client";

import { useState } from "react";
import Link from "next/link";

type Message = {
  from: "user" | "bot";
  text: string;
};

export default function ChatBotAr() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "bot",
      text: "مرحبًا 👋 أنا المساعد الإرشادي للاتحاد الكندي للكتّاب المهاجرين العرب. كيف يمكنني مساعدتك؟",
    },
  ]);

  function handleUserMessage(text: string) {
    if (!text.trim()) return;

    const userMsg: Message = { from: "user", text };
    const botMsg: Message = { from: "bot", text: getBotReply(text) };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  }

  function getBotReply(text: string): string {
    const q = text.toLowerCase();

    if (q.includes("ما هو") || q.includes("الاتحاد")) {
      return "الاتحاد الكندي للكتّاب المهاجرين العرب إطار ثقافي يعنى بدعم الأدب العربي في سياق الهجرة، ويفتح المجال للكتّاب المهاجرين داخل كندا وخارجها.";
    }

    if (q.includes("تسجيل") || q.includes("كاتب")) {
      return "يمكنك التسجيل ككاتب عبر استمارة الكتّاب المخصّصة. سأوجّهك إليها الآن.";
    }

    if (q.includes("إصدارات") || q.includes("كتب")) {
      return "يمكنك الاطلاع على الإصدارات في قسم «الإصدارات من المهجر» على الموقع.";
    }

    if (q.includes("تواصل") || q.includes("اتصال")) {
      return "للتواصل مع الاتحاد، يرجى زيارة صفحة الدعم الرسمية.";
    }

    return "يمكنني مساعدتك في المعلومات العامة، التسجيل، الإصدارات أو التواصل. حاول إعادة صياغة سؤالك.";
  }

  return (
    <>
      {/* Bouton */}
      <button
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 9999,
          background: "#4b3621",
          color: "#fff",
          border: "none",
          borderRadius: "28px",
          padding: "12px 16px",
          fontSize: "14px",
          cursor: "pointer",
        }}
      >
        💬 المساعد
      </button>

      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.3)",
              zIndex: 9998,
            }}
          />

          <div
            style={{
              position: "fixed",
              bottom: "90px",
              right: "24px",
              width: "360px",
              maxHeight: "480px",
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              zIndex: 9999,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              direction: "rtl",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "12px 16px",
                background: "#4b3621",
                color: "#fff",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>المساعد الإرشادي</span>
              <button
                onClick={() => setOpen(false)}
                style={{ background: "none", border: "none", color: "#fff" }}
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div
              style={{
                flex: 1,
                padding: "16px",
                overflowY: "auto",
                fontSize: "14px",
              }}
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: "12px",
                    textAlign: m.from === "user" ? "left" : "right",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      padding: "8px 12px",
                      borderRadius: "10px",
                      background:
                        m.from === "user" ? "#eee" : "#f5efe8",
                    }}
                  >
                    {m.text}
                  </span>
                </div>
              ))}

              {/* Liens contextuels */}
              <div style={{ marginTop: "12px", fontSize: "12px" }}>
                <Link href="/ar/authors-form">📝 استمارة الكتّاب</Link>
                <br />
                <Link href="/ar/books">📚 الإصدارات</Link>
                <br />
                <Link href="/ar/support">📩 التواصل</Link>
              </div>
            </div>

            {/* Input */}
            <div
              style={{
                display: "flex",
                borderTop: "1px solid #eee",
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="اكتب سؤالك هنا..."
                style={{
                  flex: 1,
                  border: "none",
                  padding: "10px",
                  fontSize: "14px",
                }}
              />
              <button
                onClick={() => handleUserMessage(input)}
                style={{
                  border: "none",
                  background: "#4b3621",
                  color: "#fff",
                  padding: "0 14px",
                  cursor: "pointer",
                }}
              >
                إرسال
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
