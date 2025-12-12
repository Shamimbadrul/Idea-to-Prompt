import { GoogleGenAI, Type } from "@google/genai";
import { PromptConfiguration, GeneratedResult } from "../types";

// Initialize Gemini Client
// We assume process.env.API_KEY is available in the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const modelId = "gemini-2.5-flash";

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    optimizedPrompt: {
      type: Type.STRING,
      description: "The highly optimized, ready-to-use prompt for an LLM.",
    },
    explanation: {
      type: Type.STRING,
      description: "A brief explanation of why this prompt structure is effective and what techniques were used (e.g., Chain of Thought, Persona).",
    },
    tags: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Keywords describing the prompt type (e.g., 'Coding', 'Creative Writing', 'Analysis').",
    },
  },
  required: ["optimizedPrompt", "explanation", "tags"],
};

export const generateOptimizedPrompt = async (
  idea: string,
  config: PromptConfiguration
): Promise<GeneratedResult> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }

  const systemInstruction = `
    You are PromptArchitect, an elite Prompt Engineering AI. 
    Your goal is to take a raw, often vague user idea and transform it into a high-performance, expert-level prompt for Large Language Models (like Gemini, GPT-4, Claude).
    
    Apply best practices such as:
    - Persona Adoption (assigning a role to the AI).
    - Chain of Thought (asking the AI to think step-by-step).
    - Clear Constraints and Formatting rules.
    - Context setting.
    
    Respect the user's requested Tone and Format.
  `;

  const userPrompt = `
    Refine this idea into a perfect prompt:
    "${idea}"

    Configuration:
    - Desired Tone: ${config.tone}
    - Output Format: ${config.format}
    - Include Reasoning Chain: ${config.includeReasoning ? "Yes" : "No"}
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7, // Slightly creative but structured
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response received from Gemini.");
    }

    const result = JSON.parse(text) as GeneratedResult;
    return result;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
