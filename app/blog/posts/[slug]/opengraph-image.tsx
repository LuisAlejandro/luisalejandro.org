import { ImageResponse } from "next/og";

import { config } from "@constants/constants";
import { getPostAndMorePosts } from "@lib/api";
import { stripHtmlToPlainText, truncateAtWord } from "@lib/plainText";

export const alt = "Luis Alejandro · Field notes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let title = "Field notes";
  let category = "Software";
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

  const displayTitle = truncateAtWord(title, 80);
  const displayTeaser = truncateAtWord(teaser, 140);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#f4f4f0",
        color: "#0e0e0d",
        padding: "64px 72px",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        border: "1px solid #e2e2dc",
      }}
    >
      {/* Top rule + meta: role on the left, date/tag on the right */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #dcdcd5",
          paddingBottom: "24px",
          fontSize: "18px",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "#65655f",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontWeight: 700, color: "#0e0e0d" }}>
            {config.author.name}
          </span>
          <span>/</span>
          <span>Fullstack AI Engineer</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#d61f3a",
            color: "#ffffff",
            padding: "6px 14px",
            borderRadius: "999px",
            fontSize: "14px",
            fontWeight: 600,
            letterSpacing: "0.04em",
          }}
        >
          {category}
        </div>
      </div>

      {/* Center: display title and excerpt */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "16px",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            fontSize: displayTitle.length > 50 ? "52px" : "64px",
            lineHeight: 1.05,
            fontWeight: 600,
            letterSpacing: "-0.04em",
            color: "#0e0e0d",
            maxWidth: "1060px",
          }}
        >
          {displayTitle}
        </div>
        {displayTeaser ? (
          <div
            style={{
              fontSize: "22px",
              lineHeight: 1.35,
              color: "#65655f",
              maxWidth: "960px",
            }}
          >
            {displayTeaser}
          </div>
        ) : null}
      </div>

      {/* Foot rule: domain and reference */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid #dcdcd5",
          paddingTop: "24px",
          fontSize: "18px",
          color: "#65655f",
          letterSpacing: "0.02em",
        }}
      >
        <div style={{ display: "flex", gap: "16px" }}>
          <span>luisalejandro.org/blog</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ color: "#d61f3a" }}>●</span>
          <span>Field notes</span>
        </div>
      </div>
    </div>,
    { ...size }
  );
}
