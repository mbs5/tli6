# Comprehensive Guide to Integrating Replicate API in a Next.js Project

This guide will walk you through the steps to integrate the Replicate API into your Next.js project to generate analogies using the LLAMA 3 model.

## Prerequisites

- Node.js installed on your machine
- A Replicate account with an API token

## Step 1: Setup Environment Variables

Create a `.env` file in the root of your project and add your Replicate API token:

REPLICATE_API_TOKEN=your_replicate_api_token_here

## Step 2: Install Dependencies

Install the necessary packages by running:

npm install replicate

## Step 3: Create a Replicate Client

Create a file named `replicate.ts` in the `lib` directory:

import Replicate from "replicate";

const replicate = new Replicate({
auth: process.env.REPLICATE_API_TOKEN,
});

export default replicate;

## Step 4: Create Server Actions

Create a file named `replicate-actions.ts` in the `actions` directory:

"use server";

import replicate from "@/lib/replicate";

export async function generateAnalogy(prompt: string): Promise<string> {
const input = {
top_k: 0,
top_p: 0.95,
prompt: `You are an AI assistant for TLI6, designed to help users create and understand analogies. Provide clear and simple analogies using basic language and relatable examples that even a beginner can understand. Use short, friendly paragraphs with approachable language and emojis. Judge from the question whether to respond like a TLI6 chatbot or in a conversational style. ${prompt}`,
max_tokens: 512,
temperature: 0.7,
system_prompt: "You are a helpful assistant specialized in creating analogies and answer question like a normal chatbot",
length_penalty: 1,
max_new_tokens: 512,
stop_sequences: "<|end_of_text|>,<|eot_id|>",
prompt_template:
"<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n{system_prompt}<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n",
presence_penalty: 0,
log_performance_metrics: false,
};

const output = [];
for await (const event of replicate.stream("meta/meta-llama-3-8b-instruct", {
input,
})) {
output.push(event);
}

return output.join("");
}

## Step 5: Build the Frontend

Create a file named `page.tsx` in the `app/analogies` directory:

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

## Conclusion

By following these steps, you will have successfully integrated the Replicate API into your Next.js project to generate analogies using the LLAMA 3 model. This guide covers setting up environment variables, installing dependencies, creating a Replicate client, server actions, and building the frontend.

For more information, refer to the Replicate Documentation and the LLAMA 3 Model.

Happy coding!
