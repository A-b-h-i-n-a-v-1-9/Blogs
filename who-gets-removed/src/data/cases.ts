// src/data/cases.ts
import { Case } from "@/types/Case";

import faces1 from "@/data/faces/case-1.json";
import faces2 from "@/data/faces/case-2.json";
import faces3 from "@/data/faces/case-3.json";

export const cases: Case[] = [
  {
    id: "case-1",
    title: "Public Figures",
    description: "Group of politicians in a formal setting",
    image: "/images/case-1/original.jpg",
    editedImage: "/images/case-1/edited.jpg",
    faces: faces1,
  },
  {
    id: "case-2",
    title: "Sports Team",
    description: "Cricket team photo with players and coach",
    image: "/images/case-2/original.jpg",
    editedImage: "/images/case-2/edited.jpg",
    faces: faces2,
  },
  {
    id: "case-3",
    title: "Celebrity Group",
    description: "Actors and musicians at an event",
    image: "/images/case-3/original.jpg",
    editedImage: "/images/case-3/edited.jpg",
    faces: faces3,
  },
];