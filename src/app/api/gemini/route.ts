import { NextResponse } from "next/server";
import { MAX_GEMINI_HISTORY } from "@/lib/gemini";

type HistoryMessage = { role: "user" | "assistant"; content: string };

const SYSTEM_PROMPT =
  "You are JalNet's AI assistant for rooftop rainwater harvesting. Provide concise, friendly guidance grounded in CGWB best practices and the JalNet app features.";

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI API key is not configured. Set GROQ_API_KEY in the environment." },
        { status: 500 }
      );
    }

    const safeHistory = Array.isArray(history) ? (history as HistoryMessage[]) : [];
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...safeHistory.slice(-MAX_GEMINI_HISTORY).map((entry) => ({
        role: entry.role,
        content: entry.content,
      })),
      { role: "user", content: message },
    ];

    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages,
          temperature: 0.3,
          max_tokens: 512,
        }),
      }
    );

    if (!groqResponse.ok) {
      return NextResponse.json({ error: "AI request failed." }, { status: 502 });
    }

    const data = await groqResponse.json();
    const reply =
      data?.choices?.[0]?.message?.content ||
      "I'm not sure how to answer that yet.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Groq API error:", error);
    return NextResponse.json({ error: "Unexpected error contacting AI." }, { status: 500 });
  }
}
