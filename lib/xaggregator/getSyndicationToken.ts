export function getSyndicationToken(id: string): string {
  const numeric = Number(id);
  if (!Number.isFinite(numeric)) {
    return "";
  }
  return ((numeric / 1e15) * Math.PI).toString(36).replace(/(0+|\.)/g, "");
}
