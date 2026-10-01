/**
 * Utility to load markdown content dynamically based on slug
 */

export interface MarkdownContent {
  content: string;
  title?: string;
  description?: string;
}

/**
 * Loads markdown content from the appropriate content directory.
 * @param documentSlug - The document slug (filename without .md extension)
 * @param categorySlug - The category slug (parent directory)
 * @param categoryType - Whether this is a 'service' or 'government' document
 */
export async function loadMarkdownContent(
  documentSlug: string,
  categorySlug: string,
  categoryType: 'service' | 'government'
): Promise<MarkdownContent> {
  try {
    const dir = categoryType === 'government' ? 'government' : 'services';

    const module = await import(
      `../../content/${dir}/${categorySlug}/${documentSlug}.md?raw`
    );
    const content: string = module.default;

    const titleMatch = content.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : undefined;

    const descriptionMatch = content.match(/^#\s+.+$\n\n(.+?)(?:\n\n|$)/s);
    const description = descriptionMatch
      ? descriptionMatch[1].replace(/^>\s*/, '').trim()
      : undefined;

    return { content, title, description };
  } catch (error) {
    console.error(
      `Failed to load markdown content for document: ${documentSlug}`,
      error
    );
    throw new Error(`Document not found: ${documentSlug}`);
  }
}
