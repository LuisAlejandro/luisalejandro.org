import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { logError } from "@lib/logger";

interface RevalidateRequestBody {
  posts?: Array<{
    slug: string;
  }>;
  categories?: Array<{
    slug: string;
  }>;
}

export async function POST(request: NextRequest) {
  try {
    // Check for secret to prevent unauthorized revalidation
    const secret = request.nextUrl.searchParams.get("secret");

    if (!secret || secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    const body: RevalidateRequestBody = await request.json();

    const revalidatedPaths: string[] = [];

    // Always revalidate the main blog page
    revalidatePath("/blog");
    revalidatedPaths.push("/blog");

    // Revalidate specific post pages
    if (body.posts && Array.isArray(body.posts)) {
      for (const post of body.posts) {
        if (post.slug) {
          const postPath = `/blog/posts/${post.slug}`;
          revalidatePath(postPath);
          revalidatedPaths.push(postPath);
        }
      }
    }

    // Revalidate specific category pages
    if (body.categories && Array.isArray(body.categories)) {
      for (const category of body.categories) {
        if (category.slug) {
          const categoryPath = `/blog/category/${category.slug}`;
          revalidatePath(categoryPath);
          revalidatedPaths.push(categoryPath);
        }
      }
    }

    // Also revalidate the main category index page
    revalidatePath("/blog/category");
    revalidatedPaths.push("/blog/category");

    // Revalidate feeds and sitemap since blog content changed
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

    console.log(`[revalidate-api] Revalidation completed successfully`, {
      revalidatedPaths,
    });
    return NextResponse.json({
      message: "Revalidation completed successfully",
      revalidatedPaths,
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
