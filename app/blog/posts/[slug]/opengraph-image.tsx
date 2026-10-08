import { ImageResponse } from "next/og";

import { config } from "@constants/constants";
import { getPostAndMorePosts } from "@lib/api";
import { stripHtmlToPlainText } from "@lib/plainText";

export const runtime = "edge";
export const alt = "Luis Alejandro - Blog de Desarrollo de Software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function truncate(text: string, max: number): string {
  const clean = text.trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trimEnd()}…`;
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let title = "Luis Alejandro - Blog de Desarrollo de Software";
  let category = "Software Development";
  let teaser = "";

  try {
    const data = await getPostAndMorePosts(slug);
    if (data?.post) {
      title = data.post.title || title;
      const cats = data.post.metadata?.categories || [];
      if (cats.length > 0 && cats[0]?.title) {
        category = cats[0].title;
      }
      teaser = stripHtmlToPlainText(data.post.metadata?.teaser || "");
    }
  } catch {
    // Fall back to the default title/category if the post cannot be loaded.
  }

  const displayTitle = truncate(title, 44);
  const displayTeaser = truncate(teaser, 120);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#222222",
        color: "#ffffff",
        padding: "64px 72px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            backgroundColor: "#f8d983",
            color: "#222222",
            fontSize: "28px",
            fontWeight: 700,
          }}
        >
          LA
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "22px", fontWeight: 600, color: "#f8d983" }}>
            Luis Alejandro
          </div>
          <div style={{ fontSize: "18px", color: "#c0cece" }}>
            Blog de Desarrollo de Software
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div
          style={{
            display: "inline-flex",
            alignSelf: "flex-start",
            padding: "10px 20px",
            borderRadius: "9999px",
            backgroundColor: "#da8244",
            color: "#ffffff",
            fontSize: "20px",
            fontWeight: 600,
            textTransform: "uppercase",
          }}
        >
          {category}
        </div>
        <div
          style={{
            fontSize: "56px",
            lineHeight: 1.1,
            fontWeight: 700,
            maxWidth: "1000px",
          }}
        >
          {displayTitle}
        </div>
        {displayTeaser ? (
          <div
            style={{
              fontSize: "24px",
              lineHeight: 1.4,
              color: "#c0cece",
              maxWidth: "960px",
            }}
          >
            {displayTeaser}
          </div>
        ) : null}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          fontSize: "20px",
          color: "#aaaaaa",
        }}
      >
        <span>{config.author.name}</span>
        <span style={{ color: "#f8d983" }}>·</span>
        <span>{config.url}</span>
      </div>
    </div>,
    { ...size }
  );
}
