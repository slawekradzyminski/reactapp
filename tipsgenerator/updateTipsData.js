import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.join(__dirname, '..');
const tipsDirectory = path.join(projectRoot, 'src', 'tips');
const tipsDataFile = path.join(projectRoot, 'src', 'data', 'tipsData.json');

const renderer = new marked.Renderer();

renderer.link = (href, title, text) => {
  return `<a href="${href}" target="_blank" rel="noreferrer"${title ? ` title="${title}"` : ''}>${text}</a>`;
};

marked.setOptions({
  renderer: renderer
});

export const updateTipsData = () => {
  return new Promise((resolve, reject) => {
    fs.readdir(tipsDirectory, (err, files) => {
      if (err) {
        console.error('Could not list the directory.', err);
        reject(err);
        return;
      }

      const tipsData = files
        .filter(file => file.endsWith('.md'))
        .map(file => {
          const filePath = path.join(tipsDirectory, file);
          const content = fs.readFileSync(filePath, 'utf8');
          const htmlContent = marked.parse(content);
          const fileName = file.replace('.md', '');
          const id = fileName.toLowerCase().replace(/\s+/g, '-');
          const title = fileName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
          return { id, title, content: htmlContent };
        })
        .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: 'base' }));

      const output = JSON.stringify(tipsData, null, 2);

      fs.writeFile(tipsDataFile, output, (writeErr) => {
        if (writeErr) {
          console.error('Error writing tipsData.json', writeErr);
          reject(writeErr);
        } else {
          console.log('tipsData.json has been updated with content from /tips folder.');
          resolve();
        }
      });
    });
  });
};

updateTipsData();