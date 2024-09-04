"use server";

import replicate from "@/lib/replicate";

export async function generateAnalogy(prompt: string): Promise<string> {
  const input = {
    top_k: 0,
    top_p: 0.95,
    prompt: `You are an AI assistant for TLI6, designed to help users create and understand analogies. Provide clear and simple analogies using basic language and relatable examples that even a beginner can understand. Use short, friendly paragraphs with approachable language and emojis. Judge from the question whether to respond like a TLI6 chatbot or in a conversational style. ${prompt}`,
    max_tokens: 512,
    temperature: 0.7,
    system_prompt: "You are a helpful assistant specialized in creating analogies and answer question like a narmol chatbot",
    length_penalty: 1,
    max_new_tokens: 512,
    stop_sequences: "<|end_of_text|>,<|eot_id|>",
    prompt_template:
      "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n{system_prompt}<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n",
    presence_penalty: 0,
    log_performance_metrics: false,
  };

  try {
    const output = [];
    for await (const event of replicate.stream("meta/meta-llama-3-8b-instruct", {
      input,
    })) {
      output.push(event);
    }

    return output.join("");
  } catch (error) {
    console.error("Error in generateAnalogy:", error);
    throw error; // Re-throw the error to be handled by the client
  }
}