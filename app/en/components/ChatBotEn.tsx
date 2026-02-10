"use client";

import { useState } from "react";
import Link from "next/link";

type Message = {
  from: "user" | "bot";
  text: string;
};

export default function ChatBotEn() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "bot",
      text:
        "Hello 👋 I am the guidance assistant of the Canadian Union of Arab Migrant Writers. How can I help you?",
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

    if (q.includes("union") || q.includes("who")) {
      return
        "The Canadian Union of Arab Migrant Writers is a cultural framework supporting Arabic literature shaped by migration experiences, in Canada and beyond.";
    }

    if (q.includes("register") || q.includes("author")) {
      return
        "You can register as an author using the dedicated author form. I can guide you there.";
    }

    if (q.includes("books") || q.includes("publications")) {
      return
        "You can find the publications in the “Publications” section of the website.";
    }

    if (q.includes("contact") || q.includes("reach")) {
      return
        "For any inquiry, please visit the Contact / Support page.";
    }

    return
      "I can help with general information, author registration, publications, or contact. Could you please clarify your question?";
  }

  return (
    <>
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
        💬 Assistant
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
            }}
          >
            <div
              style={{
                padding: "12px 16px",
                background: "#4b3621",
                color: "#fff",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>Assistant</span>
              <button
                onClick={() => setOpen(false)}
                style={{ background: "none", border: "none", color: "#fff" }}
              >
                ✕
              </button>
            </div>

            <div style={{ flex: 1, padding: "16px", overflowY: "auto" }}>
              {messages.map((m, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: "12px",
                    textAlign: m.from === "user" ? "right" : "left",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      padding: "8px 12px",
                      borderRadius: "10px",
                      background: m.from === "user" ? "#eee" : "#f5efe8",
                    }}
                  >
                    {m.text}
                  </span>
                </div>
              ))}

              <div style={{ fontSize: "12px", marginTop: "12px" }}>
                <Link href="/en/authors-form">📝 Author form</Link><br />
                <Link href="/en/books">📚 Publications</Link><br />
                <Link href="/en/support">📩 Contact</Link>
              </div>
            </div>

            <div style={{ display: "flex", borderTop: "1px solid #eee" }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question…"
                style={{ flex: 1, border: "none", padding: "10px" }}
              />
              <button
                onClick={() => handleUserMessage(input)}
                style={{
                  border: "none",
                  background: "#4b3621",
                  color: "#fff",
                  padding: "0 14px",
                }}
              >
                Send
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
