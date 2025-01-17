import { Finding } from "../models/finding";
import { getRandomNumberInRange } from "./numbers";

export const convertToReadableString = (input: string): string => {
  // Split the input string by uppercase letters following lowercase letters
  const sections = input.split(/(?=[A-Z][a-z])/);

  // Capitalize the first letter of each section
  const formattedSections = sections.map((section) => {
    return section.charAt(0).toUpperCase() + section.slice(1);
  });

  // Join the sections with a space
  return formattedSections.join(" ");
};

export function isString(value: unknown): value is string {
  return typeof value === "string";
}
