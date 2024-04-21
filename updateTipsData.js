const fs = require('fs');
const path = require('path');
const marked = require('marked');

const tipsDirectory = path.join(__dirname, 'src/tips');
const tipsDataFile = path.join(__dirname, 'src/components/tipsData.ts');

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
      // Use JSON.stringify to escape backticks and other special characters in HTML content
      return `{ id: ${index + 1}, title: ${JSON.stringify(title)}, content: ${JSON.stringify(htmlContent)} }`;
    });

  const output = `export const tipsData = [\n    ${tipsData.join(',\n    ')}\n  ];\n`;

  fs.writeFileSync(tipsDataFile, output);
  console.log('tipsData.ts has been updated with content from /tips folder.');
});