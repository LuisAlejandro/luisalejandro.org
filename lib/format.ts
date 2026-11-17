/** Two-digit figure, for counters like `01 / 06`. */
export const pad = (value: number) => String(value).padStart(2, "0");
