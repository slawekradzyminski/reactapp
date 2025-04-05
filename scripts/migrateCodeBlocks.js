import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogDir = path.join(__dirname, '../blog');
const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));

// This function converts Jekyll highlight blocks to triple backtick format
const convertHighlightBlocks = (content) => {
  return content.replace(
    /{%\s*highlight\s+(\w+)\s*%}([\s\S]*?){%\s*endhighlight\s*%}/g,
    (match, language, code) => {
      const lines = code.split('\n');
      const cleanLines = lines.map((line, index) => {
        if ((index === 0 || index === lines.length - 1) && line.trim() === '') {
          return line;
        }
        return line.trimEnd();
      });
      const cleanCode = cleanLines.join('\n');
      return `\`\`\`${language}\n${cleanCode}\n\`\`\``;
    }
  );
};

console.log(`Found ${files.length} Markdown files to process.`);

// Process each file
files.forEach(file => {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if the file contains any highlight blocks
  const hasHighlightBlocks = content.match(/{%\s*highlight\s+(\w+)\s*%}([\s\S]*?){%\s*endhighlight\s*%}/g);
  
  if (hasHighlightBlocks) {
    console.log(`Processing ${file} - contains highlight blocks`);
    
    // Convert the highlight blocks to triple backticks
    const newContent = convertHighlightBlocks(content);
    
    // Write the modified content back to the file
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Converted ${hasHighlightBlocks.length} highlight blocks in ${file}`);
  } else {
    console.log(`Skipping ${file} - no highlight blocks found`);
  }
});

console.log('Migration completed. Run "npm run generateBlog" to update the JSON files.'); 