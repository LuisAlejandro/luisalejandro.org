import fs from "fs";
import path from "path";

export function readSection(filename: string): string {
  const filePath = path.join(process.cwd(), "content/llms", filename);
  try {
    return fs.readFileSync(filePath, "utf-8").trim();
  } catch {
    return `_Section content unavailable (${filename})._`;
  }
}
