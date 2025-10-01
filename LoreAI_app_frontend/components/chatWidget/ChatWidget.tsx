// components/ChatWidget.js
import { useState } from "react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "👋 Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5001/api/ai/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage.content }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch AI response");
      }

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.answer || "⚠️ No response" },
        ...(data.sources?.length
          ? [
              {
                role: "assistant",
                content:
                  "📎 Sources:\n" +
                  data.sources
                    .map(
                      (s, i) =>
                        `${i + 1}. ${s.document_title} (similarity: ${s.similarity.toFixed(
                          2
                        )})`
                    )
                    .join("\n"),
              },
            ]
          : []),
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Error contacting AI service." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700"
      >
        {isOpen ? "✖" : "💬"}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 bg-white shadow-lg rounded-lg border flex flex-col">
          <div className="p-3 border-b font-semibold">🤖 Ask Lore</div>

          <div className="flex-1 p-3 overflow-y-auto max-h-96 space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-md whitespace-pre-line ${
                  msg.role === "user"
                    ? "bg-blue-100 text-right"
                    : "bg-gray-100 text-left"
                }`}
              >
                {msg.content}
              </div>
            ))}

            {loading && (
              <div className="p-2 rounded-md bg-gray-50 text-left text-sm text-gray-500">
                ⏳ Thinking...
              </div>
            )}
          </div>

          <div className="p-2 border-t flex">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 border rounded px-2 py-1 text-sm"
              placeholder="Type a question..."
              disabled={loading}
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-3 rounded text-sm disabled:opacity-40"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}