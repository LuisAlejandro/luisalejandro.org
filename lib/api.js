import { createBucketClient } from "@cosmicjs/sdk";

const BUCKET_SLUG = process.env.COSMIC_BUCKET_SLUG;
const READ_KEY = process.env.COSMIC_READ_KEY;

const cosmic = createBucketClient({
  bucketSlug: BUCKET_SLUG,
  readKey: READ_KEY,
});

const is404 = (error) =>
  /not found/i.test(error.message) || error.status === 404;

export async function getAllPostsSlugs() {
  const data = await cosmic.objects
    .find({
      type: "posts",
    })
    .props("slug");
  return data?.objects.length ? data?.objects : [];
}

export async function getAllPostsForHome() {
  const data = await cosmic.objects
    .find({
      type: "posts",
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
}

export async function getLatestPosts() {
  const data = await cosmic.objects
    .find({
      type: "posts",
    })
    .props(["id", "title", "slug", "created_at"])
    .sort("-created_at");
  return data?.objects;
}

export async function getMorePosts(slug) {
  try {
    const moreObjects = await cosmic.objects
      .find({
        type: "posts",
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
    throw error;
  }
}

export async function getPostAndMorePosts(slug) {
  try {
    const object = await cosmic.objects
      .find({
        slug,
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
    throw error;
  }
}

export async function getAllPostsForCategory(categorySlug) {
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
    throw error;
  }
}

export async function getCategoryDetails(categorySlug) {
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
    throw error;
  }
}
