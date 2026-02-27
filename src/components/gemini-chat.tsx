"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { MAX_GEMINI_HISTORY } from "@/lib/gemini";

type ChatMessage = { id: string; role: "user" | "assistant"; content: string };

const STARTER_MESSAGE: ChatMessage = {
  id: "starter",
  role: "assistant",
  content:
    "Hi! I’m JalSetu’s Gemini assistant. Ask me about rooftop rainwater harvesting, CGWB guidelines, or how to use this assessment.",
};

let fallbackCounter = 0;

const createFallbackId = () => {
  fallbackCounter += 1;
  if (globalThis.crypto?.getRandomValues) {
    const bytes = new Uint8Array(16);
    globalThis.crypto.getRandomValues(bytes);
    return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  }
  return `${Date.now()}-${fallbackCounter}`;
};

const createMessage = (role: ChatMessage["role"], content: string): ChatMessage => ({
  id: globalThis.crypto?.randomUUID?.() ?? createFallbackId(),
  role,
  content,
});

export function GeminiChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([STARTER_MESSAGE]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages, open]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || sending) return;

    try {
      const history = messages.slice(-MAX_GEMINI_HISTORY).map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));
      setSending(true);
      setMessages((prev) => [...prev, createMessage("user", trimmed)]);
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Gemini request failed.");
      }
      setMessages((prev) => [
        ...prev,
        createMessage("assistant", data.reply || "I’m not sure how to answer that yet."),
      ]);
      setInput("");
    } catch (error) {
      console.error("Gemini API error:", error);
      setMessages((prev) => [
        ...prev,
        createMessage("assistant", "Sorry, I couldn’t connect to the assistant. Please check your connection and try again."),
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-[320px] sm:w-[360px] bg-gray-950/95 border border-blue-700/30 rounded-3xl shadow-2xl shadow-blue-500/20 backdrop-blur-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-blue-700/20">
            <div>
              <p className="text-sm font-semibold text-white">Gemini Assistant</p>
              <p className="text-[11px] text-blue-300/80">Ask about rainwater harvesting</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-full bg-blue-900/40 hover:bg-blue-800/60 text-blue-100 flex items-center justify-center transition"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="max-h-[360px] overflow-y-auto px-4 py-4 space-y-3 text-sm">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                  message.role === "user"
                    ? "bg-blue-600 text-white ml-8"
                    : "bg-blue-950/60 text-blue-100 border border-blue-700/30 mr-8"
                }`}
              >
                {message.content}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-blue-700/20 px-4 py-3 space-y-2">
            <div className="flex items-center gap-2">
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    handleSend();
                  }
                }}
                rows={1}
                aria-label="Chat message"
                placeholder="Type your question..."
                className="flex-1 resize-none rounded-2xl bg-blue-950/40 border border-blue-700/30 px-3 py-2 text-xs text-white placeholder:text-blue-400/70 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={sending || !input.trim()}
                className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition"
                aria-label="Send message"
              >
                {sending ? <span className="text-xs">...</span> : <Send className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-3 shadow-xl shadow-blue-600/30 hover:shadow-blue-500/40 transition"
      >
        <MessageCircle className="w-4 h-4" />
        <span className="text-sm font-semibold">{open ? "Hide Assistant" : "Chat with Gemini"}</span>
      </button>
    </div>
  );
}
