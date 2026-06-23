import { NextResponse } from "next/server";

import { logError } from "@lib/logger";
import { resolveTwinMarkdown } from "@lib/markdown/resolveTwin";
import { twinMarkdownHeaders } from "@lib/markdown/twinHeaders";

type RouteContext = {
  params: Promise<{ path?: string[] }>;
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { path = [] } = await context.params;
    const body = await resolveTwinMarkdown(path);

    if (!body) {
      return new NextResponse("Not found", { status: 404 });
    }

    return new NextResponse(body, { headers: twinMarkdownHeaders });
  } catch (error) {
    logError("markdown-twin", error);
    return new NextResponse("Error generating markdown twin", { status: 500 });
  }
}
