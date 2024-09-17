import { json } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

const exercises = [
  {
    name: "Bench Press",
    description: "A chest exercise",
    image: "https://picsum.photos/410/300",
  },
  {
    name: "Planche Pushups",
    description:
      "A planche pushup is a variation of the pushup that requires you to hold your body in a straight line from your head to your feet.",
    image: "https://picsum.photos/410/300",
  },
  {
    name: "Front Lever Raises",
    description:
      "A front lever raise is a variation of the pushup that requires you to hold your body in a straight line from your head to your feet.",
    image: "https://picsum.photos/410/300",
  },
  {
    name: "Bench Press",
    description: "A chest exercise",
    image: "https://picsum.photos/410/300",
  },
  {
    name: "Bench Press",
    description: "A chest exercise",
    image: "https://picsum.photos/410/300",
  },
  {
    name: "Bench Press",
    description: "A chest exercise",
    image: "https://picsum.photos/410/300",
  },
  {
    name: "Bench Press",
    description: "A chest exercise",
    image: "https://picsum.photos/410/300",
  },
  {
    name: "Bench Press",
    description: "A chest exercise",
    image: "https://picsum.photos/410/300",
  },
];

export const load: PageServerLoad = async ({ fetch }) => {
  return { exercises };
};
