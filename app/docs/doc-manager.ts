import { logger } from "@/lib/logger";
import type { PageParams } from "@/types/next";
import fm from "front-matter";
import fs from "fs/promises";
import path from "path";
import { z } from "zod";

const docsDirectory = path.join(process.cwd(), "content/docs");

const AttributeSchema = z.object({
  title: z.string(),
  description: z.string(),
  keywords: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  coverUrl: z.string().optional(),
  order: z.number().optional(),
  subcategory: z.string().optional(),
  method: z.string().optional(),
  examples: z.record(z.string(), z.string()).optional(),
  results: z.record(z.string(), z.string()).optional(),
});

type DocAttributes = z.infer<typeof AttributeSchema>;

export type DocType = {
  slug: string;
  attributes: DocAttributes;
  content: string;
};

export type DocParams = PageParams<{ slug: string }>;

export async function getDocs(tags?: string[]) {
  try {
    const fileNames = await fs.readdir(docsDirectory);
    const docs: DocType[] = [];

    for await (const fileName of fileNames) {
      if (!fileName.endsWith(".mdx")) continue;

      const fullPath = path.join(docsDirectory, fileName);
      const fileContents = await fs.readFile(fullPath, "utf8");

      const matter = fm(fileContents);

      const result = AttributeSchema.safeParse(matter.attributes);

      if (!result.success) {
        logger.error(`Invalid frontmatter in ${fileName}:`, result.error);
        continue;
      }

      if (tags) {
        if (!result.data.tags?.some((tag) => tags.includes(tag))) {
          continue;
        }
      }

      docs.push({
        slug: fileName.replace(".mdx", ""),
        content: matter.body,
        attributes: result.data,
      });
    }

    return docs;
  } catch (error) {
    logger.error("Error getting docs:", error);
    return [];
  }
}

export async function getDocsSubcategories() {
  const docs = await getDocs();
  const subcategories = new Set<string>();

  for (const doc of docs) {
    if (doc.attributes.subcategory) {
      subcategories.add(doc.attributes.subcategory);
    }
  }

  return Array.from(subcategories);
}

export function groupDocsBySubcategory(docs: DocType[]) {
  // Create "General" group for docs without subcategory
  const grouped: Record<string, DocType[]> = {
    General: [],
  };

  for (const doc of docs) {
    const subcategory = doc.attributes.subcategory ?? "General";
    grouped[subcategory] ??= [];
    grouped[subcategory].push(doc);
  }

  // Sort each subcategory by order or title
  Object.keys(grouped).forEach((key) => {
    grouped[key].sort((a, b) => {
      if (
        a.attributes.order !== undefined &&
        b.attributes.order !== undefined
      ) {
        return a.attributes.order - b.attributes.order;
      }
      return a.attributes.title.localeCompare(b.attributes.title);
    });
  });

  return grouped;
}

export async function getCurrentDoc(slug: string): Promise<DocType | null> {
  try {
    const filePath = path.join(docsDirectory, `${slug}.mdx`);
    const fileContents = await fs.readFile(filePath, "utf8");

    const matter = fm(fileContents);
    const result = AttributeSchema.safeParse(matter.attributes);

    if (!result.success) {
      logger.error(`Invalid frontmatter in ${slug}.mdx:`, result.error);
      return null;
    }

    return {
      slug,
      content: matter.body,
      attributes: result.data,
    };
  } catch (error) {
    logger.error(`Error getting doc ${slug}:`, error);
    return null;
  }
}
