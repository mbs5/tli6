"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { generateAnalogy } from "@/actions/replicate-actions";
import { Button, Input, Container, Heading, Text, Box } from "@/components/ui";
import { ComplexityDropdown } from "../components/ComplexityDropdown";
import { ChatMessage } from "../components/ChatMessage";

export default function AnalogiesPage() {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [complexity, setComplexity] = useState<"Easy" | "Medium" | "Hard">("Easy");

  const handleComplexityChange = (newComplexity: "Easy" | "Medium" | "Hard") => {
    setComplexity(newComplexity);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setMessages(prev => [...prev, { role: "user", content: input }]);
    setInput("");

    try {
      const result = await generateAnalogy(input, complexity);
      setMessages(prev => [...prev, { role: "assistant", content: result }]);
    } catch (err) {
      console.error("Error in handleSubmit:", err);
      setMessages(prev => [...prev, { role: "assistant", content: "Failed to generate analogy. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="max-w-2xl mx-auto">
      <Heading className="text-center mb-6">Analogy Generator</Heading>
      <ComplexityDropdown onSelect={handleComplexityChange} />
      <Box className="h-[60vh] overflow-y-auto mb-4 p-4 border rounded bg-card text-card-foreground">
        {messages.map((msg, index) => (
          <ChatMessage key={index} content={msg.content} isAI={msg.role === "assistant"} />
        ))}
      </Box>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          value={input}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
          placeholder="Enter your prompt for an analogy"
          className="flex-grow"
          disabled={loading}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Send"}
        </Button>
      </form>
    </Container>
  );
}