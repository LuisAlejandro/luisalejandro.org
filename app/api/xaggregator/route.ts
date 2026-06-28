import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";

import { logError } from "@lib/logger";
import { isSchemaValid } from "@lib/utils";
import { fetchTweet } from "@lib/xaggregator/fetchTweet";
import { parseTweetUrl } from "@lib/xaggregator/parseTweetUrl";
import { checkXaggregatorRateLimit } from "@lib/xaggregator/rateLimit";
import type { XaggregatorResultItem } from "@lib/xaggregator/types";

const MAX_URLS = 10;

export const maxDuration = 60;

const tweetUrlPattern =
  /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)\/.+\/status\/\d{1,19}(\?.*)?$/i;

const bodySchema = yup
  .object({
    urls: yup
      .array()
      .of(
        yup
          .string()
          .trim()
          .required()
          .matches(tweetUrlPattern, "URL de tweet no válida")
      )
      .min(1, "Se requiere al menos una URL de tweet")
      .max(MAX_URLS, `Máximo ${MAX_URLS} URLs de tweet permitidas`)
      .required(),
  })
  .required();

export async function POST(request: NextRequest) {
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

  try {
    const body = await request.json();

    if (!(await isSchemaValid(bodySchema, body))) {
      return NextResponse.json(
        {
          error: `Solicitud no válida. Proporciona entre 1 y ${MAX_URLS} URLs de tweet.`,
        },
        { status: 400 }
      );
    }

    const urls: string[] = body.urls;

    const settled = await Promise.allSettled(
      urls.map(async (inputUrl): Promise<XaggregatorResultItem> => {
        const parsed = parseTweetUrl(inputUrl);
        if (!parsed) {
          return {
            inputUrl,
            ok: false,
            error: "URL de tweet no válida",
          };
        }

        const result = await fetchTweet(parsed.id, parsed.canonicalLink);
        if (!result.ok) {
          return {
            inputUrl,
            ok: false,
            error: result.message ?? result.error,
          };
        }

        return {
          inputUrl,
          ok: true,
          link: result.data.link,
          text: result.data.text,
          images: result.data.images,
        };
      })
    );

    const results: XaggregatorResultItem[] = settled.map((outcome, index) => {
      if (outcome.status === "fulfilled") {
        return outcome.value;
      }
      return {
        inputUrl: urls[index] ?? "",
        ok: false,
        error: "No se pudo obtener el tweet",
      };
    });

    return NextResponse.json({ results });
  } catch (error) {
    logError("xaggregator-api", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
