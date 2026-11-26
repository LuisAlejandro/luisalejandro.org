/**
 * Self-check for the Postiz webhook payload filter. Run inside the app container:
 *   npx tsx lib/postizWebhook.check.ts
 */
import assert from "node:assert/strict";

import { publishedPostizSlug } from "./postizWebhook";

const post = (overrides: Record<string, unknown> = {}) => ({
  id: "pz-1",
  state: "PUBLISHED",
  releaseURL: "https://luisalejandro.org/blog/posts/my-article",
  integration: { providerIdentifier: "cosmic" },
  ...overrides,
});

assert.equal(publishedPostizSlug([post()]), "my-article");
assert.equal(publishedPostizSlug([post({ state: "ERROR" })]), null);
assert.equal(
  publishedPostizSlug([post({ integration: { providerIdentifier: "x" } })]),
  null
);
assert.equal(
  publishedPostizSlug([
    post({ releaseURL: "https://evil.test/blog/posts/my-article" }),
  ]),
  null
);
assert.equal(
  publishedPostizSlug([
    post({ releaseURL: "https://luisalejandro.org/blog/posts/a/b" }),
  ]),
  null
);
assert.equal(
  publishedPostizSlug([
    post({ releaseURL: "https://luisalejandro.org/blog/posts/x?y=1" }),
  ]),
  null
);
assert.equal(publishedPostizSlug([post(), post()]), null);
assert.equal(publishedPostizSlug({ test: true }), null);
assert.equal(publishedPostizSlug(null), null);

console.log("postizWebhook ok");
