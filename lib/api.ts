import { createBucketClient } from "@cosmicjs/sdk";

import { ENV_NAME } from "@constants/constants";
import { logError } from "@lib/logger";

const BUCKET_SLUG =
  process.env.COSMIC_BUCKET_SLUG || "luisalejandroorg-development";

const READ_KEY = process.env.COSMIC_READ_KEY;

const cosmic = createBucketClient({
  bucketSlug: BUCKET_SLUG,
  readKey: READ_KEY || "",
});

const is404 = (error: any) =>
  /not found/i.test(error.message) || error.status === 404;

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
      bucketSlug: BUCKET_SLUG,
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
      bucketSlug: BUCKET_SLUG,
      hasReadKey: !!READ_KEY,
      envName: ENV_NAME,
    });
    return [];
  }
}

export async function getLatestPosts() {
  try {
    const data = await cosmic.objects
      .find({
        type: "posts",
        status:
          ENV_NAME !== "local" ? "published" : { $in: ["published", "draft"] },
      })
      .props(["id", "title", "slug", "created_at"])
      .sort("-created_at");
    return data?.objects;
  } catch (error) {
    logError("getLatestPosts", error, {
      bucketSlug: BUCKET_SLUG,
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
      bucketSlug: BUCKET_SLUG,
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
      bucketSlug: BUCKET_SLUG,
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
      bucketSlug: BUCKET_SLUG,
      hasReadKey: !!READ_KEY,
      envName: ENV_NAME,
    });
    throw error;
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
      bucketSlug: BUCKET_SLUG,
      hasReadKey: !!READ_KEY,
      envName: ENV_NAME,
    });
    throw error;
  }
}

export async function getAllPostsForCategory(categorySlug: any) {
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
      bucketSlug: BUCKET_SLUG,
      hasReadKey: !!READ_KEY,
      envName: ENV_NAME,
    });
    throw error;
  }
}

export async function getAllCategories() {
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
      bucketSlug: BUCKET_SLUG,
      hasReadKey: !!READ_KEY,
    });
    throw error;
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
      bucketSlug: BUCKET_SLUG,
      hasReadKey: !!READ_KEY,
    });
    throw error;
  }
}
