import { DecisionMap } from "@/types/Decision";

export const decisions: Record<
  string,
  Record<string, DecisionMap>
> = {
  "case-1": {
    unnecessary: {
      A: 0.64,
      B: 0.22,
      C: 0.14,
    },
    "least-relevant": {
      A: 0.18,
      B: 0.67,
      C: 0.15,
    },
  },
  "case-2": {
    unnecessary: {
      A: 0.21,
      B: 0.59,
      C: 0.20,
    },
    "least-relevant": {
      A: 0.62,
      B: 0.19,
      C: 0.19,
    },
  },
  "case-3": {
    unnecessary: {
      A: 0.28,
      B: 0.54,
      C: 0.18,
    },
    "least-relevant": {
      A: 0.16,
      B: 0.23,
      C: 0.61,
    },
  },
};
