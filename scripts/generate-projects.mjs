import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentDirectory = path.join(root, "content", "projects");
const outputPath = path.join(root, "app", "generated-projects.ts");
const required = ["title", "category", "methods"];

function parseProject(source, filename) {
  const match = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) throw new Error(`${filename}: use front matter enclosed by --- lines.`);
  const frontMatter = Object.fromEntries(match[1].split("\n").filter(Boolean).map((line) => {
    const divider = line.indexOf(":");
    if (divider === -1) throw new Error(`${filename}: invalid front matter line “${line}”.`);
    const key = line.slice(0, divider).trim();
    const value = line.slice(divider + 1).trim().replace(/^"|"$/g, "");
    return [key, value];
  }));
  required.forEach((key) => { if (!frontMatter[key]) throw new Error(`${filename}: “${key}” is required.`); });
  const description = match[2].trim().replace(/\n+/g, " ");
  if (!description) throw new Error(`${filename}: add a project description below the front matter.`);
  return { slug: path.basename(filename, ".md"), title: frontMatter.title, category: frontMatter.category, methods: frontMatter.methods, description, github: frontMatter.github || "", demo: frontMatter.demo || "", image: frontMatter.image || "", imageAlt: frontMatter.imageAlt || "" };
}

const files = (await readdir(contentDirectory)).filter((file) => file.endsWith(".md")).sort();
const projects = await Promise.all(files.map(async (file) => parseProject(await readFile(path.join(contentDirectory, file), "utf8"), file)));
await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, `// Generated from content/projects/*.md — do not edit manually.\nexport type Project = { slug: string; title: string; category: string; methods: string; description: string; github: string; demo: string; image: string; imageAlt: string; };\nexport const projects: Project[] = ${JSON.stringify(projects, null, 2)};\n`);
