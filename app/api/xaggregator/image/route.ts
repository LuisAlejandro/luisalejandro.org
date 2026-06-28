import { NextRequest, NextResponse } from "next/server";

import { logError } from "@lib/logger";
import { isAllowedTwimgUrl } from "@lib/xaggregator/normalizePhotoUrl";
import { checkXaggregatorRateLimit } from "@lib/xaggregator/rateLimit";

const MAX_IMAGE_BYTES = 15 * 1024 * 1024;
const FETCH_TIMEOUT_MS = 60_000;

export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const rateLimit = checkXaggregatorRateLimit(request);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Inténtalo más tarde." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      }
    );
  }

  const rawUrl = request.nextUrl.searchParams.get("url");

  if (!rawUrl) {
    return NextResponse.json(
      { error: "Falta el parámetro URL" },
      { status: 400 }
    );
  }

  if (!isAllowedTwimgUrl(rawUrl)) {
    return NextResponse.json({ error: "URL no permitida" }, { status: 400 });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    try {
      const upstream = await fetch(rawUrl, {
        signal: controller.signal,
        redirect: "manual",
        headers: { Accept: "image/*" },
      });

      if (upstream.status >= 300 && upstream.status < 400) {
        return NextResponse.json(
          { error: "Redirecciones no permitidas" },
          { status: 400 }
        );
      }

      if (!upstream.ok) {
        return NextResponse.json(
          { error: "Imagen no encontrada" },
          { status: 502 }
        );
      }

      const buffer = await upstream.arrayBuffer();
      if (buffer.byteLength > MAX_IMAGE_BYTES) {
        return NextResponse.json(
          { error: "Imagen demasiado grande" },
          { status: 413 }
        );
      }

      const contentType =
        upstream.headers.get("content-type") ?? "application/octet-stream";
      const extension = contentType.includes("png")
        ? "png"
        : contentType.includes("webp")
          ? "webp"
          : "jpg";
      const filename = `tweet-image.${extension}`;

      return new NextResponse(buffer, {
        status: 200,
        headers: {
          "Content-Type": contentType,
          "Content-Disposition": `attachment; filename="${filename}"`,
          "Cache-Control": "private, max-age=3600",
        },
      });
    } finally {
      clearTimeout(timeout);
    }
  } catch (error) {
    logError("xaggregator-image-api", error);
    return NextResponse.json(
      { error: "No se pudo obtener la imagen" },
      { status: 502 }
    );
  }
}
