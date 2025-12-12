export enum Tone {
  Professional = "Professional",
  Creative = "Creative",
  Concise = "Concise",
  Academic = "Academic",
  Playful = "Playful",
  Technical = "Technical"
}

export enum PromptFormat {
  Paragraph = "Paragraph",
  Structured = "Structured (Markdown)",
  StepByStep = "Step-by-Step",
  CodeFocused = "Code Focused"
}

export interface PromptConfiguration {
  tone: Tone;
  format: PromptFormat;
  includeReasoning: boolean;
}

export interface GeneratedResult {
  optimizedPrompt: string;
  explanation: string;
  tags: string[];
}

// Response schema for Gemini JSON output
export interface GeminiResponseSchema {
  optimizedPrompt: string;
  explanation: string;
  tags: string[];
}
