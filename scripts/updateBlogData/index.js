import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { processContent, extractPreview } from './contentProcessor.js';
import './renderer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.join(__dirname, '../..');
const postsDirectory = path.join(projectRoot, 'blog');
const blogDataDirectory = path.join(projectRoot, 'src', 'data', 'blog');

export const updateBlogData = () => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(blogDataDirectory)) {
      fs.mkdirSync(blogDataDirectory, { recursive: true });
    }

    fs.readdir(postsDirectory, (err, files) => {
      if (err) {
        console.error('Could not list the directory.', err);
        reject(err);
        return;
      }

      const postsIndex = [];

      files
        .filter(file => file.endsWith('.md'))
        .forEach(file => {
          const filePath = path.join(postsDirectory, file);
          const fileContent = fs.readFileSync(filePath, 'utf8');
          const { data, content } = matter(fileContent);
          
          const htmlContent = processContent(content);
          
          const postData = {
            id: file.replace('.md', ''),
            title: data.title,
            date: data.date || file.slice(0, 10),
            category: data.categories?.[0] || '',
            permalink: data.permalink,
            content: htmlContent
          };

          const postPath = path.join(blogDataDirectory, `${postData.id}.json`);
          fs.writeFileSync(postPath, JSON.stringify(postData, null, 2));

          const { content: _, ...indexData } = postData;
          indexData.preview = extractPreview(htmlContent);
          postsIndex.push(indexData);
        });

      postsIndex.sort((a, b) => new Date(b.date) - new Date(a.date));

      const indexPath = path.join(blogDataDirectory, 'index.json');
      fs.writeFileSync(indexPath, JSON.stringify(postsIndex, null, 2));

      console.log('Blog data has been updated in the /src/data/blog folder.');
      resolve();
    });
  });
};

updateBlogData(); 