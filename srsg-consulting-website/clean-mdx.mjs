import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';

const mdxFiles = globSync('content/**/*.mdx');

mdxFiles.forEach((file) => {
    let content = fs.readFileSync(file, 'utf8');
    let dirty = false;

    // Fix [object Object] serializations
    if (content.includes('[object Object]') || content.includes('\\[object Object\\]')) {
        content = content.replace(/\\?\[object Object\\?\]/g, '');
        dirty = true;
    }

    if (dirty) {
        fs.writeFileSync(file, content);
        console.log(`Cleaned: ${file}`);
    }
});

console.log('Cleanup complete.');
