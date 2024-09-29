import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tipsDirectory = path.join(__dirname, 'src/tips');
const tipsDataFile = path.join(__dirname, 'src/data/tipsData.json');

// Create a custom renderer
const renderer = new marked.Renderer();

// Override the link renderer method
renderer.link = (href, title, text) => {
  // Include target="_blank" and rel="noreferrer" in the anchor tag
  return `<a href="${href}" target="_blank" rel="noreferrer"${title ? ` title="${title}"` : ''}>${text}</a>`;
};

// Set the renderer to marked
marked.setOptions({
  renderer: renderer
});

const updateTipsData = () => {
  fs.readdir(tipsDirectory, (err, files) => {
    if (err) {
      console.error('Could not list the directory.', err);
      process.exit(1);
    }

    const tipsData = files
      .filter(file => file.endsWith('.md'))
      .map((file, index) => {
        const filePath = path.join(tipsDirectory, file);
        const content = fs.readFileSync(filePath, 'utf8');
        // Convert Markdown to HTML with the custom renderer
        const htmlContent = marked.parse(content);
        // Extract the file name without the .md extension for the title
        const title = file.replace('.md', '');
        return { id: index + 1, title, content: htmlContent };
      });

    const output = JSON.stringify(tipsData, null, 2);

    fs.writeFileSync(tipsDataFile, output);
    console.log('tipsData.json has been updated with content from /tips folder.');
  });
};

updateTipsData();