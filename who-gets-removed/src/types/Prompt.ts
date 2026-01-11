// src/types/Prompt.ts
export type PromptId = "unnecessary" | "least-relevant";

export interface Prompt {
  id: PromptId;
  label: string;
}