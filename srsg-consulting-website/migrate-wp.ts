import fs from 'fs';
import path from 'path';
import { parseStringPromise } from 'xml2js';
import TurndownService from 'turndown';

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
});

async function migrate() {
  const xmlFilePath = path.join(process.cwd(), 'srsg-wp-export.xml');
  const xmlData = fs.readFileSync(xmlFilePath, 'utf-8');
  
  try {
    const result = await parseStringPromise(xmlData);
    const channel = result.rss.channel[0];
    const items = channel.item;
    
    let generatedCount = 0;

    for (const item of items) {
      const postType = item['wp:post_type'][0];
      const status = item['wp:status'][0];
      
      // Only process published posts and pages
      if ((postType === 'post' || postType === 'page') && status === 'publish') {
        const title = item.title[0];
        const slug = item['wp:post_name'][0];
        const contentHtml = item['content:encoded'][0];
        const excerpt = item['excerpt:encoded']?.[0] || '';
        const date = item['wp:post_date'][0];
        
        // Convert HTML to Markdown
        const markdownBody = turndownService.turndown(contentHtml);
        
        let fileContent = '';
        let targetDir = '';
        
        if (postType === 'post') {
          // Blog Post Collection Format (TinaCMS)
          const tags = item.category?.filter((c: any) => c.$.domain === 'post_tag').map((c: any) => c._) || [];
          const author = item['dc:creator'][0];
          
          targetDir = path.join(process.cwd(), 'content', 'blog');
          
          fileContent = `---
title: "${title.replace(/"/g, '\\"')}"
slug: ${slug}
publishDate: ${new Date(date).toISOString()}
author: ${author}
excerpt: ${JSON.stringify(excerpt.substring(0, 160))}
tags: ${JSON.stringify(tags)}
---

${markdownBody}
`;
        } else if (postType === 'page') {
          // Page Collection Format (TinaCMS)
          targetDir = path.join(process.cwd(), 'content', 'pages');
          
          // Need to translate elementor/WP structure into blocks where possible.
          // For a simple migration script, we dump it into a single TextBlock
          fileContent = `---
title: "${title.replace(/"/g, '\\"')}"
slug: ${slug}
seoTitle: "${title.replace(/"/g, '\\"')}"
sections:
  - heading: "${title.replace(/"/g, '\\"')}"
    content: |
${markdownBody.split('\\n').map(line => '      ' + line).join('\\n')}
    alignment: left
    _template: TextBlock
---
`;
        }
        
        if (!fs.existsSync(targetDir)) {
          fs.mkdirSync(targetDir, { recursive: true });
        }
        
        const filePath = path.join(targetDir, `${slug}.mdx`);
        fs.writeFileSync(filePath, fileContent);
        
        console.log(`Created: ${filePath}`);
        generatedCount++;
      }
    }
    
    console.log(`Successfully migrated ${generatedCount} posts/pages.`);
    
  } catch (err) {
    console.error("Migration failed:", err);
  }
}

migrate();
