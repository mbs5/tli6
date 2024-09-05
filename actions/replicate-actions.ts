"use server";

import replicate from "@/lib/replicate";

type Complexity = "Easy" | "Medium" | "Hard";

async function generateResponse(prompt: string, complexity: "Easy" | "Medium" | "Hard", systemPrompt: string): Promise<string> {
  let complexityPrompt = "";
  if (complexity === "Medium") {
    complexityPrompt = "Provide a moderately complex response with more detail.";
  } else if (complexity === "Hard") {
    complexityPrompt = "Provide a highly complex and nuanced response with advanced concepts.";
  }

  const input = { 
    top_k: 0,
    top_p: 0.95,
    prompt: `You are an AI assistant for TLI6. ${complexityPrompt} Use short, friendly paragraphs with approachable language. Ensure that your response is formatted with one blank line between each paragraph, and start your response from the first line without any leading newlines. ${prompt}`,
    max_tokens: 512,
    temperature: 0.7,
    system_prompt: systemPrompt,
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

    const rawResponse = output.join("");
    const formattedResponse = rawResponse
      .trim()
      .split('\n')
      .filter(line => line.trim() !== '')
      .join('\n\n');

    return formattedResponse;
  } catch (error) {
    console.error("Error in generateResponse:", error);
    throw error;
  }
}

export async function generateAnalogy(prompt: string, complexity: "Easy" | "Medium" | "Hard"): Promise<string> {
  const systemPrompt = "You are a helpful assistant specialized in creating analogies and answering questions like a normal chatbot";
  return generateResponse(`Create an analogy for: ${prompt}`, complexity, systemPrompt);
}

export async function generateQuiz(prompt: string, complexity: "Easy" | "Medium" | "Hard"): Promise<string> {
  const systemPrompt = "You are a helpful assistant specialized in creating quiz questions and answers";
  return generateResponse(`Create a quiz question and answer about: ${prompt}`, complexity, systemPrompt);
}

export async function generateFlashcard(prompt: string, complexity: "Easy" | "Medium" | "Hard"): Promise<string> {
  const systemPrompt = "You are a helpful assistant specialized in creating flashcards with terms and definitions";
  return generateResponse(`Create a flashcard with a term and definition about: ${prompt}`, complexity, systemPrompt);
}