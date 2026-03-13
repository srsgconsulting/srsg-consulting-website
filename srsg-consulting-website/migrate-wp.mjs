import fs from 'fs';
import path from 'path';
import { XMLParser } from 'fast-xml-parser';
import TurndownService from 'turndown';

const wpFile = path.resolve('E:\\1. SRSG\\SRSG Website\\SRSG Website Code\\SRSG-Consulting-Website\\srsg-consulting-website\\srsg-wp-export.xml');

if (!fs.existsSync(wpFile)) {
  console.error(`Error: Could not find WordPress XML file at ${wpFile}`);
  process.exit(1);
}

const pagesDir = path.resolve('content/pages');
const blogDir = path.resolve('content/blog');

fs.mkdirSync(pagesDir, { recursive: true });
fs.mkdirSync(blogDir, { recursive: true });

const xmlData = fs.readFileSync(wpFile, 'utf8');

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  cdataPropName: "__cdata"
});

const parsedObj = parser.parse(xmlData);

const channel = parsedObj.rss?.channel;
if (!channel) {
  console.error("Error: Invalid or missing RSS channel in XML export.");
  process.exit(1);
}

const items = Array.isArray(channel.item) ? channel.item : [channel.item].filter(Boolean);
let pagesCount = 0;
let blogCount = 0;
const imageReferences = new Set();

const turndownService = new TurndownService({ headingStyle: 'atx' });

turndownService.addRule('images', {
  filter: 'img',
  replacement: (content, node) => {
    const src = node.getAttribute('src');
    if (src) {
        imageReferences.add(src);
    }
    const alt = node.getAttribute('alt') || '';
    return `![${alt}](${src})`;
  }
});

const extractImagesFromHtml = (html) => {
    const imgRegex = /src=["'](https?:\/\/[^"'\s]+\.(?:jpg|jpeg|gif|png|webp|svg))["']/gi;
    let match;
    while ((match = imgRegex.exec(html)) !== null) {
        imageReferences.add(match[1]);
    }
};

const getText = (node) => {
    if (!node) return '';
    if (typeof node === 'object' && node.__cdata) return String(node.__cdata);
    return String(node);
};

items.forEach((item) => {
  const postType = getText(item['wp:post_type']);
  const status = getText(item['wp:status']);
  
  if (status !== 'publish' || (postType !== 'page' && postType !== 'post')) {
      return;
  }

  const titleText = item.title;
  let title = getText(titleText).replace(/"/g, '\\"');
  if (!title) title = 'Untitled';

  const slugText = item['wp:post_name'];
  let slug = getText(slugText);
  if (!slug) slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  if (!slug) slug = 'untitled-' + Math.floor(Math.random() * 100000);

  const rawContent = getText(item['content:encoded']);
  let htmlContent = rawContent.replace(/\[caption[^\]]*\](.*?)\[\/caption\]/g, '$1');

  extractImagesFromHtml(htmlContent);

  const markdownContent = turndownService.turndown(htmlContent);
  const cleanExcerpt = markdownContent.substring(0, 160).replace(/(\r\n|\n|\r)/gm, " ").replace(/"/g, "'").trim();

  let frontmatter = '';

  if (postType === 'page') {
    frontmatter = `---
title: "${title}"
slug: "${slug}"
seoTitle: "${title} | SRSG Consulting"
seoDescription: "${cleanExcerpt}"
---\n\n`;
    fs.writeFileSync(path.join(pagesDir, `${slug}.mdx`), frontmatter + markdownContent);
    pagesCount++;
  } else if (postType === 'post') {
    const date = getText(item['wp:post_date'])?.split(' ')[0] || '2000-01-01';
    let author = getText(item['dc:creator']) || 'Admin';

    let tagsList = [];
    const categories = Array.isArray(item.category) ? item.category : [item.category].filter(Boolean);
    categories.forEach(cat => {
        if (cat?.['@_domain'] === 'post_tag' && cat?.__cdata) {
            tagsList.push(`"${cat.__cdata.replace(/"/g, '\\"')}"`);
        }
    });

    frontmatter = `---
title: "${title}"
slug: "${slug}"
publishDate: "${date}"
author: "${author}"
excerpt: "${cleanExcerpt}"
tags: [${tagsList.join(', ')}]
---\n\n`;

    fs.writeFileSync(path.join(blogDir, `${slug}.mdx`), frontmatter + markdownContent);
    blogCount++;
  }
});

console.log('--- Migration Summary ---');
console.log(`Pages migrated: ${pagesCount}`);
console.log(`Blog Posts migrated: ${blogCount}`);
console.log('');
console.log('--- Referenced Images (To Upload Manually) ---');
console.log(`Found ${imageReferences.size} unique image references.`);
Array.from(imageReferences).forEach(url => console.log(url));

fs.writeFileSync('migration-summary.txt', [
    '--- Migration Summary ---',
    `Pages migrated: ${pagesCount}`,
    `Blog Posts migrated: ${blogCount}`,
    '',
    '--- Referenced Images (To Upload Manually) ---',
    `Found ${imageReferences.size} unique image references.`,
    ...Array.from(imageReferences)
].join('\n'));

console.log('\\nSummary saved to migration-summary.txt');
