import { createBucketClient } from "@cosmicjs/sdk";

import { ENV_NAME } from "@constants/constants";
import { logError } from "@lib/logger";
import { sanitizeSearchQuery } from "@lib/searchQuery";

const BUCKET_SLUG = process.env.COSMIC_BUCKET_SLUG;

const READ_KEY = process.env.COSMIC_READ_KEY;

const cosmic = createBucketClient({
  bucketSlug: BUCKET_SLUG || "",
  readKey: READ_KEY || "",
});

const is404 = (error: any) =>
  /not found/i.test(error.message) || error.status === 404;

const hasCosmicCredentials = () => Boolean(BUCKET_SLUG && READ_KEY);

export async function getAllPostsSlugs() {
  try {
    const data = await cosmic.objects
      .find({
        type: "posts",
      })
      .props("slug");
    return data?.objects.length ? data?.objects : [];
  } catch (error) {
    logError("getAllPostsSlugs", error, {
      bucketSlug: BUCKET_SLUG || "",
      hasReadKey: !!READ_KEY,
    });
    return [];
  }
}

export async function getAllPostsForHome() {
  try {
    const data = await cosmic.objects
      .find({
        type: "posts",
        status:
          ENV_NAME !== "local" ? "published" : { $in: ["published", "draft"] },
      })
      .props([
        "id",
        "slug",
        "title",
        "metadata.hero",
        "metadata.categories",
        "metadata.teaser",
        "created_at",
      ])
      .sort("-created_at");
    return data?.objects;
  } catch (error) {
    logError("getAllPostsForHome", error, {
      bucketSlug: BUCKET_SLUG || "",
      hasReadKey: !!READ_KEY,
      envName: ENV_NAME,
    });
    return [];
  }
}

export async function getLatestPosts(limit = 10) {
  try {
    const data = await cosmic.objects
      .find({
        type: "posts",
        status:
          ENV_NAME !== "local" ? "published" : { $in: ["published", "draft"] },
      })
      .props(["id", "title", "slug", "created_at"])
      .sort("-created_at")
      .limit(limit);
    return data?.objects;
  } catch (error) {
    logError("getLatestPosts", error, {
      bucketSlug: BUCKET_SLUG || "",
      hasReadKey: !!READ_KEY,
      envName: ENV_NAME,
    });
    return [];
  }
}

export async function getPostById(id: string) {
  try {
    const data = await cosmic.objects
      .find({
        type: "posts",
        id,
      })
      .props(["id", "title", "slug", "created_at"]);
    return data?.objects.length ? data?.objects[0] : undefined;
  } catch (error) {
    logError("getPostById", error, {
      postId: id,
      bucketSlug: BUCKET_SLUG || "",
      hasReadKey: !!READ_KEY,
    });
    return undefined;
  }
}

export async function getPostsByIds(ids: string[]) {
  try {
    const data = await cosmic.objects
      .find({
        type: "posts",
        id: {
          $in: ids,
        },
      })
      .props(["id", "title", "slug", "created_at"])
      .sort("-created_at");
    return data?.objects.length ? data?.objects : [];
  } catch (error) {
    logError("getPostsByIds", error, {
      postIds: ids,
      idsCount: ids.length,
      bucketSlug: BUCKET_SLUG || "",
      hasReadKey: !!READ_KEY,
    });
    return [];
  }
}

export async function getMorePosts(slug: any) {
  try {
    const moreObjects = await cosmic.objects
      .find({
        type: "posts",
        status:
          ENV_NAME !== "local" ? "published" : { $in: ["published", "draft"] },
        slug: {
          $ne: slug,
        },
      })
      .props([
        "id",
        "title",
        "slug",
        "metadata.hero",
        "metadata.content",
        "metadata.teaser",
        "metadata.categories",
        "created_at",
      ])
      .sort("random")
      .limit(4);
    return moreObjects?.objects.length ? moreObjects?.objects : [];
  } catch (error) {
    // Don't throw if there are no more posts
    if (is404(error)) return [];
    logError("getMorePosts", error, {
      slug,
      bucketSlug: BUCKET_SLUG || "",
      hasReadKey: !!READ_KEY,
      envName: ENV_NAME,
    });
    throw error;
  }
}

/** Published-only post fetch for markdown twins (ignores local draft ENV). */
export async function getPublishedPostForTwin(slug: string) {
  if (!hasCosmicCredentials()) {
    return undefined;
  }
  try {
    const object = await cosmic.objects
      .find({
        type: "posts",
        slug,
        status: "published",
      })
      .props([
        "title",
        "slug",
        "metadata.content",
        "metadata.categories",
        "created_at",
      ]);
    return object?.objects?.length ? object.objects[0] : undefined;
  } catch (error) {
    if (is404(error)) {
      return undefined;
    }
    logError("getPublishedPostForTwin", error, { slug });
    return undefined;
  }
}

/** Published-only home listing for markdown twins (ignores local draft ENV). */
export async function getPublishedPostsForHomeTwin() {
  if (!hasCosmicCredentials()) {
    return [];
  }
  try {
    const data = await cosmic.objects
      .find({
        type: "posts",
        status: "published",
      })
      .props([
        "id",
        "slug",
        "title",
        "metadata.hero",
        "metadata.categories",
        "metadata.teaser",
        "created_at",
      ])
      .sort("-created_at");
    return data?.objects || [];
  } catch (error) {
    logError("getPublishedPostsForHomeTwin", error, {
      bucketSlug: BUCKET_SLUG || "",
      hasReadKey: !!READ_KEY,
    });
    return [];
  }
}

/** Published-only category listing for markdown twins (ignores local draft ENV). */
export async function getPublishedPostsForCategoryTwin(categorySlug: string) {
  if (!hasCosmicCredentials()) {
    return {
      categoryPosts: [],
      categoryName: undefined,
    };
  }
  try {
    const categoryDetails = await getCategoryDetails(categorySlug);

    if (!categoryDetails) {
      return {
        categoryPosts: [],
        categoryName: undefined,
      };
    }

    const data = await cosmic.objects
      .find({
        type: "posts",
        status: "published",
        "metadata.categories": {
          $in: [categoryDetails.id],
        },
      })
      .props([
        "id",
        "title",
        "slug",
        "metadata.hero",
        "metadata.content",
        "metadata.teaser",
        "metadata.categories",
        "created_at",
      ]);

    return {
      categoryPosts: data?.objects.length ? data?.objects : [],
      categoryName: categoryDetails.title || undefined,
    };
  } catch (error) {
    if (is404(error)) {
      return {
        categoryPosts: [],
        categoryName: undefined,
      };
    }
    logError("getPublishedPostsForCategoryTwin", error, {
      categorySlug,
      bucketSlug: BUCKET_SLUG || "",
      hasReadKey: !!READ_KEY,
    });
    return {
      categoryPosts: [],
      categoryName: undefined,
    };
  }
}

export async function getPostAndMorePosts(slug: any) {
  try {
    const object = await cosmic.objects
      .find({
        slug,
        status:
          ENV_NAME !== "local" ? "published" : { $in: ["published", "draft"] },
      })
      .props([
        "id",
        "title",
        "slug",
        "metadata.hero",
        "metadata.content",
        "metadata.teaser",
        "metadata.categories",
        "created_at",
      ]);
    const morePosts = await getMorePosts(slug);
    return {
      post: object?.objects.length ? object?.objects[0] : undefined,
      morePosts,
    };
  } catch (error) {
    // Don't throw if an slug doesn't exist
    if (is404(error))
      return {
        post: undefined,
        morePosts: [],
      };
    logError("getPostAndMorePosts", error, {
      slug,
      bucketSlug: BUCKET_SLUG || "",
      hasReadKey: !!READ_KEY,
      envName: ENV_NAME,
    });
    throw error;
  }
}

export async function getAllPostsForCategory(categorySlug: any) {
  if (!hasCosmicCredentials()) {
    return {
      categoryPosts: [],
      categoryName: undefined,
    };
  }

  try {
    const categoryDetails = await getCategoryDetails(categorySlug);

    if (!categoryDetails)
      return {
        categoryPosts: [],
        categoryName: undefined,
      };

    const data = await cosmic.objects
      .find({
        type: "posts",
        status:
          ENV_NAME !== "local" ? "published" : { $in: ["published", "draft"] },
        "metadata.categories": {
          $in: [categoryDetails.id],
        },
      })
      .props([
        "id",
        "title",
        "slug",
        "metadata.hero",
        "metadata.content",
        "metadata.teaser",
        "metadata.categories",
        "created_at",
      ]);

    return {
      categoryPosts: data?.objects.length ? data?.objects : [],
      categoryName: categoryDetails.title || undefined,
    };
  } catch (error) {
    // Don't throw if an slug doesn't exist
    if (is404(error))
      return {
        categoryPosts: [],
        categoryName: undefined,
      };
    logError("getAllPostsForCategory", error, {
      categorySlug,
      bucketSlug: BUCKET_SLUG || "",
      hasReadKey: !!READ_KEY,
      envName: ENV_NAME,
    });
    throw error;
  }
}

export async function getAllCategories() {
  if (!hasCosmicCredentials()) {
    return [];
  }

  try {
    const data = await cosmic.objects
      .find({
        type: "categories",
      })
      .props(["id", "title", "slug"]);
    return data?.objects.length ? data?.objects : [];
  } catch (error) {
    // Don't throw if an slug doesn't exist
    if (is404(error)) return [];
    logError("getAllCategories", error, {
      bucketSlug: BUCKET_SLUG || "",
      hasReadKey: !!READ_KEY,
    });
    return [];
  }
}

export async function getCategoryDetails(categorySlug: any) {
  try {
    const object = await cosmic.objects
      .find({
        type: "categories",
        slug: categorySlug,
      })
      .props(["id", "title", "slug"]);
    return object?.objects.length ? object?.objects[0] : undefined;
  } catch (error) {
    // Don't throw if an slug doesn't exist
    if (is404(error)) return undefined;
    logError("getCategoryDetails", error, {
      categorySlug,
      bucketSlug: BUCKET_SLUG || "",
      hasReadKey: !!READ_KEY,
    });
    throw error;
  }
}

export async function searchPosts(
  query: string,
  options?: { signalUpstreamFailure?: boolean }
) {
  try {
    const searchQuery = sanitizeSearchQuery(query);

    if (!searchQuery) {
      return [];
    }

    const regexPattern = { $regex: searchQuery, $options: "i" };
    const statusFilter =
      ENV_NAME !== "local" ? "published" : { $in: ["published", "draft"] };
    const postProps = [
      "id",
      "slug",
      "title",
      "metadata.hero",
      "metadata.categories",
      "metadata.teaser",
      "created_at",
    ];

    const data = await cosmic.objects
      .find({
        type: "posts",
        status: statusFilter,
        $or: [{ title: regexPattern }, { "metadata.teaser": regexPattern }],
      })
      .props(postProps)
      .sort("-created_at");

    const posts = data?.objects || [];
    const existingPostIds = new Set(posts.map((p: any) => p.id));

    let matchingCategoryIds: string[] = [];
    try {
      const categoryData = await cosmic.objects
        .find({
          type: "categories",
          title: regexPattern,
        })
        .props(["id"]);

      matchingCategoryIds = (categoryData?.objects || []).map(
        (category: any) => category.id
      );
    } catch (error) {
      if (!is404(error)) {
        throw error;
      }
    }

    if (matchingCategoryIds.length === 0) {
      return posts;
    }

    const categoryPostsData = await cosmic.objects
      .find({
        type: "posts",
        status: statusFilter,
        "metadata.categories": { $in: matchingCategoryIds },
      })
      .props(postProps)
      .sort("-created_at");

    const categoryMatches = (categoryPostsData?.objects || []).filter(
      (post: any) => !existingPostIds.has(post.id)
    );

    return [...posts, ...categoryMatches];
  } catch (error) {
    logError("searchPosts", error, {
      query,
      bucketSlug: BUCKET_SLUG || "",
      hasReadKey: !!READ_KEY,
      envName: ENV_NAME,
    });
    if (options?.signalUpstreamFailure) {
      throw error;
    }
    return [];
  }
}
