// src/types/Case.ts
import { Face } from "./Face";

export type CaseId =
  | "case-1"
  | "case-2"
  | "case-3";

export interface Case {
  id: CaseId;
  title: string;
  description: string;  // ✅ Add this
  image: string;
  editedImage: string;
  faces: Face[];
}