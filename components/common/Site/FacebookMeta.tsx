import { config } from "@constants/constants";

/**
 * The three `fb:` tags Facebook reads. Next's `metadata.other` renders a key as
 * `<meta name>`, and Facebook ignores `fb:*` sent that way ("Tag specified as
 * 'name' instead of 'property'"), so they are rendered here instead: React 19
 * hoists a `<meta>` rendered anywhere in the tree into `<head>`.
 */
export function FacebookMeta() {
  return (
    <>
      <meta property="fb:app_id" content={config.blog.fb_app_id} />
      <meta property="fb:admins" content={config.author.fb_profile_id} />
      <meta property="fb:profile_id" content={config.author.fb_profile_id} />
    </>
  );
}
