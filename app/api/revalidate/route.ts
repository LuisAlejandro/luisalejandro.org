import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { logError } from "@lib/logger";
import { BLOG_PURGE_TAGS, purgeByTags } from "@lib/netlify/purgeByTags";

const MAX_REVALIDATE_ITEMS = 50;
const SLUG_PATTERN = /^[a-z0-9-]+$/;

interface RevalidateRequestBody {
  posts?: Array<{
    slug: string;
  }>;
  categories?: Array<{
    slug: string;
  }>;
}

function isValidSlug(slug: string): boolean {
  return SLUG_PATTERN.test(slug);
}

export async function POST(request: NextRequest) {
  try {
    const secret = request.nextUrl.searchParams.get("secret");

    if (!secret || secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    const body: RevalidateRequestBody = await request.json();

    const revalidatedPaths: string[] = [];

    revalidatePath("/blog");
    revalidatedPaths.push("/blog");

    revalidatePath("/markdown-twin/blog");
    revalidatedPaths.push("/markdown-twin/blog");

    if (body.posts && Array.isArray(body.posts)) {
      for (const post of body.posts.slice(0, MAX_REVALIDATE_ITEMS)) {
        if (post.slug && isValidSlug(post.slug)) {
          const postPath = `/blog/posts/${post.slug}`;
          revalidatePath(postPath);
          revalidatedPaths.push(postPath);

          const twinPath = `/markdown-twin/blog/posts/${post.slug}`;
          revalidatePath(twinPath);
          revalidatedPaths.push(twinPath);
        }
      }
    }

    if (body.categories && Array.isArray(body.categories)) {
      for (const category of body.categories.slice(0, MAX_REVALIDATE_ITEMS)) {
        if (category.slug && isValidSlug(category.slug)) {
          const categoryPath = `/blog/category/${category.slug}`;
          revalidatePath(categoryPath);
          revalidatedPaths.push(categoryPath);

          const twinPath = `/markdown-twin/blog/category/${category.slug}`;
          revalidatePath(twinPath);
          revalidatedPaths.push(twinPath);
        }
      }
    }

    revalidatePath("/blog/category");
    revalidatedPaths.push("/blog/category");

    revalidatePath("/markdown-twin/blog/category");
    revalidatedPaths.push("/markdown-twin/blog/category");

    revalidatePath("/blog/posts/feed.xml");
    revalidatePath("/blog/posts/atom.xml");
    revalidatePath("/blog/posts/feed.json");
    revalidatePath("/sitemap.xml");
    revalidatedPaths.push(
      "/blog/posts/feed.xml",
      "/blog/posts/atom.xml",
      "/blog/posts/feed.json",
      "/sitemap.xml"
    );

    revalidatePath("/llms-full.txt");
    revalidatedPaths.push("/llms-full.txt");

    const purgedTags = [...BLOG_PURGE_TAGS];
    const purgeResult = await purgeByTags(purgedTags);

    if (!purgeResult.ok && purgeResult.reason !== "missing_env") {
      logError(
        "revalidate-api-purge",
        new Error(`Netlify purge failed: ${purgeResult.reason ?? "unknown"}`),
        {
          purgedTags,
          status: purgeResult.status,
        }
      );
    }

    console.log(`[revalidate-api] Revalidation completed successfully`, {
      revalidatedPaths,
      purgeOk: purgeResult.ok,
      purgeError: purgeResult.ok ? undefined : purgeResult.reason,
    });

    return NextResponse.json({
      message: "Revalidation completed successfully",
      revalidatedPaths,
      purgedTags,
      purgeOk: purgeResult.ok,
      purgeError: purgeResult.ok ? undefined : purgeResult.reason,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logError("revalidate-api", error, {
      hasSecret: !!process.env.REVALIDATE_SECRET,
    });
    return NextResponse.json(
      {
        message: "Error during revalidation",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
