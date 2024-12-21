import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.join(__dirname, '.');
const postsDirectory = path.join(projectRoot, 'blog');
const blogDataDirectory = path.join(projectRoot, 'src', 'data', 'blog');

const renderer = new marked.Renderer();

renderer.link = (href, title, text) => {
  return `<a href="${href}" target="_blank" rel="noreferrer"${title ? ` title="${title}"` : ''}>${text}</a>`;
};

// Custom image rendering
renderer.image = (href, title, text) => {
  // Default width is 100%
  let width = '100%';
  
  // Check if there's a width attribute after the image
  const nextLine = text?.match(/\{:width="(\d+)%"\}/);
  if (nextLine) {
    width = nextLine[1] + '%';
    // Remove the width attribute from alt text
    text = text.replace(/\s*\{:width="\d+%"\}/, '');
  }
  
  return `<img src="${href}" alt="${text || ''}" style="width: ${width};"${title ? ` title="${title}"` : ''}>`;
};

// Custom blockquote rendering
renderer.blockquote = (quote) => {
  // Remove <p> tags from the beginning and end of the quote if they exist
  const cleanQuote = quote
    .replace(/^<p>|<\/p>$/g, '')
    .replace(/<br>/g, '</p><p>')
    .trim();
  return `<blockquote class="blog-quote"><p>${cleanQuote}</p></blockquote>`;
};

// Custom language mapping
const languageMap = {
  'yml': 'yaml',
  'typescript': 'typescript',
  'yaml': 'yaml'
};

// Function to convert highlight blocks to markdown code blocks
const convertHighlightBlocks = (content) => {
  return content.replace(
    /{%\s*highlight\s+(\w+)\s*%}([\s\S]*?){%\s*endhighlight\s*%}/g,
    (match, language, code) => {
      const mappedLanguage = languageMap[language.toLowerCase()] || language;
      const cleanCode = code
        .trim()
        .split('\n')
        .map(line => line.trimEnd())
        .join('\n');
      return `\`\`\`${mappedLanguage}\n${cleanCode}\n\`\`\``;
    }
  );
};

// Function to fix line breaks in blockquotes
const fixBlockquoteLineBreaks = (content) => {
  // First, ensure all blockquote lines start with >
  let lines = content.split('\n');
  let inBlockquote = false;
  
  lines = lines.map(line => {
    if (line.startsWith('>')) {
      inBlockquote = true;
      return line;
    } else if (inBlockquote && line.trim() !== '') {
      return '> ' + line;
    } else {
      inBlockquote = false;
      return line;
    }
  });

  // Then join lines and handle <br> tags
  return lines
    .join('\n')
    .replace(/^(>.*?)(?:<br>)/gm, '$1\n> ')
    .replace(/^(>.*?)$/gm, '$1  ');
};

// Function to clean up image width attributes
const cleanImageAttributes = (content) => {
  return content.replace(/!\[(.*?)\]\((.*?)\)\s*\{:width="(\d+)%"\}/g, (match, alt, src, width) => {
    return `![${alt}${width ? ` {:width="${width}%"}` : ''}](${src})`;
  });
};

marked.setOptions({
  renderer: renderer,
  breaks: true,
  gfm: true,
  pedantic: false,
  mangle: false,
  headerIds: false
});

export const updateBlogData = () => {
  return new Promise((resolve, reject) => {
    // Ensure blog data directory exists
    if (!fs.existsSync(blogDataDirectory)) {
      fs.mkdirSync(blogDataDirectory, { recursive: true });
    }

    fs.readdir(postsDirectory, (err, files) => {
      if (err) {
        console.error('Could not list the directory.', err);
        reject(err);
        return;
      }

      // Create an index of all posts
      const postsIndex = [];

      files
        .filter(file => file.endsWith('.md'))
        .forEach(file => {
          const filePath = path.join(postsDirectory, file);
          const fileContent = fs.readFileSync(filePath, 'utf8');
          const { data, content } = matter(fileContent);
          
          // Process content
          let processedContent = content;
          processedContent = convertHighlightBlocks(processedContent);
          processedContent = fixBlockquoteLineBreaks(processedContent);
          processedContent = cleanImageAttributes(processedContent);
          const htmlContent = marked.parse(processedContent);
          
          const postData = {
            id: file.replace('.md', ''),
            title: data.title,
            date: data.date || file.slice(0, 10),
            categories: data.categories || [],
            tags: data.tags || [],
            permalink: data.permalink,
            content: htmlContent
          };

          // Save individual post data
          const postPath = path.join(blogDataDirectory, `${postData.id}.json`);
          fs.writeFileSync(postPath, JSON.stringify(postData, null, 2));

          // Add to index without content
          const { content: _, ...indexData } = postData;
          postsIndex.push(indexData);
        });

      // Sort posts by date
      postsIndex.sort((a, b) => new Date(b.date) - new Date(a.date));

      // Save the index file
      const indexPath = path.join(blogDataDirectory, 'index.json');
      fs.writeFileSync(indexPath, JSON.stringify(postsIndex, null, 2));

      console.log('Blog data has been updated in the /src/data/blog folder.');
      resolve();
    });
  });
};

updateBlogData();