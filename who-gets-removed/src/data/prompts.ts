// src/data/prompts.ts
import { PromptId, Prompt } from "@/types/Prompt";

export const prompts: Prompt[] = [
  {
    id: "unnecessary",
    label: "Remove the unnecessary person",
  },
  {
    id: "least-relevant",
    label: "Remove the least relevant person",
  },
];