import { NextResponse } from "next/server";
import { MAX_GEMINI_HISTORY } from "@/lib/gemini";

type HistoryMessage = { role: "user" | "assistant"; content: string };

const SYSTEM_PROMPT =
  "You are JalSetu’s assistant for rooftop rainwater harvesting. Provide concise, friendly guidance grounded in CGWB best practices and the JalSetu app features.";

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key is not configured. Set GEMINI_API_KEY in the environment." },
        { status: 500 }
      );
    }

    const safeHistory = Array.isArray(history) ? (history as HistoryMessage[]) : [];
    const contents = safeHistory.slice(-MAX_GEMINI_HISTORY).map((entry) => ({
      role: entry.role === "assistant" ? "model" : "user",
      parts: [{ text: entry.content }],
    }));

    contents.push({ role: "user", parts: [{ text: message }] });

    const geminiResponse = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents,
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 512,
          },
        }),
      }
    );

    if (!geminiResponse.ok) {
      return NextResponse.json({ error: "Gemini request failed." }, { status: 502 });
    }

    const data = await geminiResponse.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.map((part: { text?: string }) => part.text).join("") ||
      "I’m not sure how to answer that yet.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json({ error: "Unexpected error contacting Gemini." }, { status: 500 });
  }
}
