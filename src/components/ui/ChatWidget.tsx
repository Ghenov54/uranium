"use client";

import { useState, useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { chatData, type ChatCategory, type ChatQA } from "@/data/chatData";

type Message = {
  id: string;
  from: "bot" | "user";
  text: string;
};

function renderAnswer(text: string) {
  return text.split("\n").map((line, i) => {
    const parts = line.split(/\*\*(.+?)\*\*/g);
    return (
      <p key={i} className={line === "" ? "mt-2" : "leading-relaxed"}>
        {parts.map((part, j) =>
          j % 2 === 1 ? <strong key={j} className="font-bold text-white">{part}</strong> : part
        )}
      </p>
    );
  });
}

export function ChatWidget() {
  const pathname = usePathname();
  const locale = useLocale() as "ro" | "en" | "ru";
  const data = chatData[locale] ?? chatData.ro;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [step, setStep] = useState<"categories" | "questions" | "answer">("categories");
  const [activeCategory, setActiveCategory] = useState<ChatCategory | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const allowed =
    pathname === `/${locale}` ||
    pathname === "/" ||
    pathname === `/${locale}/contact` ||
    pathname === "/contact";

  useEffect(() => {
    if (!isOpen && allowed) {
      const t = setTimeout(() => setHasUnread(true), 4000);
      return () => clearTimeout(t);
    }
  }, [isOpen, allowed]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ id: "greeting", from: "bot", text: data.greeting }]);
    }
  }, [isOpen, data.greeting, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  if (!allowed) return null;

  function openWidget() {
    setIsOpen(true);
    setHasUnread(false);
  }

  function closeWidget() {
    setIsOpen(false);
  }

  function reset() {
    setStep("categories");
    setActiveCategory(null);
  }

  function pickCategory(cat: ChatCategory) {
    setActiveCategory(cat);
    setStep("questions");
  }

  function pickQuestion(qa: ChatQA) {
    setMessages((prev) => [
      ...prev,
      { id: `u-${qa.id}`, from: "user", text: qa.question },
    ]);
    setIsTyping(true);
    setStep("answer");

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: `b-${qa.id}`, from: "bot", text: qa.answer },
      ]);
    }, 900);
  }

  function askAnother() {
    setStep("categories");
    setActiveCategory(null);
  }

  return (
    <>
      {/* Chat panel */}
      <div
        className="fixed z-[80] flex flex-col overflow-hidden transition-all duration-300"
        style={{
          bottom: "88px",
          right: "20px",
          width: "min(360px, calc(100vw - 32px))",
          maxHeight: isOpen ? "520px" : "0px",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          borderRadius: "20px",
          background: "#0d0d10",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(180,245,0,0.06)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex size-8 items-center justify-center rounded-full text-sm"
              style={{ background: "var(--color-accent)", color: "#000" }}
            >
              U
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-none">{data.greetingName}</p>
              <div className="mt-0.5 flex items-center gap-1.5">
                <span className="size-1.5 rounded-full" style={{ background: "#4ade80" }} />
                <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>Online</span>
              </div>
            </div>
          </div>
          <button
            onClick={closeWidget}
            className="flex size-7 items-center justify-center rounded-full transition-colors"
            style={{ color: "rgba(255,255,255,0.4)" }}
            onMouseOver={(e) => (e.currentTarget.style.color = "white")}
            onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
            aria-label="Close chat"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ scrollbarWidth: "none" }}>
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className="max-w-[85%] rounded-2xl px-4 py-3 text-sm"
                style={
                  msg.from === "user"
                    ? { background: "var(--color-accent)", color: "#000", borderBottomRightRadius: "6px" }
                    : { background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.85)", borderBottomLeftRadius: "6px" }
                }
              >
                {renderAnswer(msg.text)}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1 rounded-2xl px-4 py-3" style={{ background: "rgba(255,255,255,0.07)", borderBottomLeftRadius: "6px" }}>
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="size-1.5 rounded-full"
                    style={{
                      background: "rgba(255,255,255,0.4)",
                      animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Action area */}
        <div className="shrink-0 px-4 pb-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {!isTyping && step === "categories" && (
            <div className="pt-3">
              <p className="mb-2.5 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                Alege un subiect:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {data.categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => pickCategory(cat)}
                    className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-left text-xs font-semibold transition-all"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      color: "rgba(255,255,255,0.8)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = "rgba(180,245,0,0.12)";
                      e.currentTarget.style.borderColor = "rgba(180,245,0,0.3)";
                      e.currentTarget.style.color = "white";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.8)";
                    }}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {!isTyping && step === "questions" && activeCategory && (
            <div className="pt-3">
              <button
                onClick={reset}
                className="mb-2.5 text-xs transition-colors"
                style={{ color: "rgba(255,255,255,0.35)" }}
                onMouseOver={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
                onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
              >
                {data.backLabel}
              </button>
              <div className="space-y-1.5">
                {activeCategory.questions.map((qa) => (
                  <button
                    key={qa.id}
                    onClick={() => pickQuestion(qa)}
                    className="w-full rounded-xl px-3 py-2.5 text-left text-xs font-medium transition-all"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      color: "rgba(255,255,255,0.75)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = "rgba(180,245,0,0.1)";
                      e.currentTarget.style.color = "white";
                      e.currentTarget.style.borderColor = "rgba(180,245,0,0.25)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.75)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                    }}
                  >
                    {qa.question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {!isTyping && step === "answer" && (
            <div className="pt-3">
              <button
                onClick={askAnother}
                className="w-full rounded-xl px-4 py-2.5 text-xs font-bold transition-all"
                style={{ background: "rgba(180,245,0,0.12)", color: "var(--color-accent)", border: "1px solid rgba(180,245,0,0.2)" }}
                onMouseOver={(e) => (e.currentTarget.style.background = "rgba(180,245,0,0.2)")}
                onMouseOut={(e) => (e.currentTarget.style.background = "rgba(180,245,0,0.12)")}
              >
                {data.moreQuestionsLabel} →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Floating button */}
      <button
        onClick={isOpen ? closeWidget : openWidget}
        className="fixed z-[80] flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{
          bottom: "20px",
          right: "20px",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "var(--color-accent)",
          color: "#000",
          boxShadow: "0 8px 24px rgba(180,245,0,0.35), 0 2px 8px rgba(0,0,0,0.4)",
        }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {/* Unread dot */}
        {hasUnread && !isOpen && (
          <span
            className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full text-[9px] font-bold text-white"
            style={{ background: "#ef4444" }}
          >
            1
          </span>
        )}

        {/* Icon: chat when closed, X when open */}
        <svg
          width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          style={{
            opacity: isOpen ? 0 : 1,
            transform: isOpen ? "rotate(90deg) scale(0.5)" : "rotate(0deg) scale(1)",
            transition: "all 0.25s ease",
            position: "absolute",
          }}
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <svg
          width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          style={{
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0.5)",
            transition: "all 0.25s ease",
            position: "absolute",
          }}
        >
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Bounce animation keyframes */}
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
      `}</style>
    </>
  );
}
