import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

export default async function markdownToHtml(markdown) {
  if (!markdown) return "";

  try {
    const result = await unified()
      .use(remarkParse)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeStringify, { allowDangerousHtml: true })
      .process(markdown);
    return result.toString();
  } catch (error) {
    return "";
  }
}
