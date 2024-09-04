"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { generateAnalogy } from "@/actions/replicate-actions";
import { Button, Input, Container, Heading, Text, Box } from "@/components/ui";

export default function AnalogiesPage() {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const formatAIResponse = (content: string) => {
    const paragraphs = content.split('\n\n');
    return (
      <>
        <span>{paragraphs[0]}</span>
        {paragraphs.slice(1).map((paragraph, index) => (
          <p key={index} className="mb-4">{paragraph}</p>
        ))}
      </>
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setMessages(prev => [...prev, { role: "user", content: input }]);
    setInput("");

    try {
      const result = await generateAnalogy(input);
      setMessages(prev => [...prev, { role: "assistant", content: result }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: "assistant", content: "Failed to generate analogy. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="max-w-2xl mx-auto">
      <Heading className="text-center mb-6">Analogy Generator</Heading>
      <Box className="h-[60vh] overflow-y-auto mb-4 p-4 border rounded">
        {messages.map((msg, index) => (
          <Text key={index} className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
            <strong>{msg.role === "user" ? "You: " : "AI: "}</strong>
            {msg.role === "user" ? msg.content : formatAIResponse(msg.content)}
          </Text>
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