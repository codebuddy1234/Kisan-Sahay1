"use client";

import { useState } from "react";

export default function SchemeChat({ slug }: { slug: string }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input) return;

    const userMsg = { role: "user", text: input };

    setMessages((prev) => [...prev, userMsg]);

    setLoading(true);

    const res = await fetch("http://localhost:3001/scheme-chat", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        message: input,
        slug,
      }),
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      { role: "assistant", text: data.reply },
    ]);

    setInput("");
    setLoading(false);
  };

  return (
    <div className="fixed bottom-5 right-5 w-80 bg-white border shadow-lg rounded-lg">

      <div className="p-3 font-semibold border-b">
        Scheme Assistant
      </div>

      <div className="h-80 overflow-y-auto p-3">

        {messages.map((msg, i) => (
          <div key={i}
            className={`mb-2 ${
              msg.role === "user"
                ? "text-right"
                : "text-left"
            }`}
          >
            <span
              className={`inline-block px-3 py-2 rounded ${
                msg.role === "user"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}

        {loading && <p>Typing...</p>}
      </div>

      <div className="flex border-t">

        <input
          className="flex-1 p-2 outline-none"
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          placeholder="Ask question..."
        />

        <button
          onClick={sendMessage}
          className="bg-green-600 text-white px-4"
        >
          Send
        </button>

      </div>
    </div>
  );
}
