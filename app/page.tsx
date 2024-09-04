"use client";

import Image from "next/image";
import { ComplexityDropdown } from "./components/ComplexityDropdown";
import { ChatMessage } from "./components/ChatMessage";
import { useState } from "react";

function AnalogyPage() {
  const [complexity, setComplexity] = useState<"Easy" | "Medium" | "Hard">("Easy");
  const [messages, setMessages] = useState<{ content: string; role: string }[]>([]);

  // ... existing code ...

  const handleComplexityChange = (newComplexity: "Easy" | "Medium" | "Hard") => {
    setComplexity(newComplexity);
  };

  const generatePrompt = (input: string) => {
    let complexityPrompt = "";
    if (complexity === "Medium") {
      complexityPrompt = "Provide a moderately complex analogy that goes into more detail.";
    } else if (complexity === "Hard") {
      complexityPrompt = "Provide a highly complex and nuanced analogy with advanced concepts.";
    }

    return `Generate an analogy to explain the following concept: ${input}. ${complexityPrompt}`;
  };

  return (
    <div>
      <ComplexityDropdown onSelect={handleComplexityChange} />
      {/* ... existing input and chat components ... */}
      <div className="chat-container">
        {messages.map((message, index) => (
          <ChatMessage key={index} content={message.content} isAI={message.role === 'assistant'} />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
    <a
      href="/analogies"
      className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    >
      <h2 className="mb-3 text-2xl font-semibold">
        Analogies{" "}
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span>
      </h2>
      <p className="m-0 max-w-[30ch] text-sm opacity-50">
        Explore our collection of analogies.
      </p>
    </a>
  </main>
  );
}

