import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';
import matter from 'gray-matter';
import hljs from 'highlight.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.join(__dirname, '.');
const postsDirectory = path.join(projectRoot, 'blog');
const blogDataDirectory = path.join(projectRoot, 'src', 'data', 'blog');

const renderer = new marked.Renderer();

// Custom code block rendering with highlight.js
renderer.code = (code, language) => {
  const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
  const highlightedCode = hljs.highlight(code, { language: validLanguage }).value;
  return `<pre><code class="hljs language-${validLanguage}">${highlightedCode}</code></pre>`;
};

renderer.link = (href, title, text) => {
  return `<a href="${href}" target="_blank" rel="noreferrer"${title ? ` title="${title}"` : ''}>${text}</a>`;
};

// Custom paragraph rendering to handle line breaks
renderer.paragraph = (text) => {
  // Join lines that end with a word and start with a word (removing line breaks)
  text = text.replace(/(\w)\n(\w)/g, '$1 $2');
  return `<p>${text}</p>`;
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
  'yaml': 'yaml',
  'java': 'java'
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

// Function to fix line breaks in paragraphs
const fixParagraphLineBreaks = (content) => {
  return content
    // Join lines that end with a word and start with a word
    .replace(/(\w)\n(\w)/g, '$1 $2')
    // Preserve intentional line breaks (marked with two spaces at the end of the line)
    .replace(/  \n/g, '<br>\n');
};

// Function to process content
const processContent = (content) => {
  // First, handle the width attributes in the markdown
  content = content.replace(/!\[(.*?)\]\((.*?)\)\s*\{:width="(\d+)%"\}/g, (match, alt, src, width) => {
    return `<img src="${src}" alt="${alt}" style="width: ${width}%">`;
  });
  
  // Then process other content
  content = convertHighlightBlocks(content);
  content = fixBlockquoteLineBreaks(content);
  content = fixParagraphLineBreaks(content);
  
  // Parse any remaining markdown with marked
  return marked.parse(content);
};

marked.setOptions({
  renderer: renderer,
  breaks: true,
  gfm: true,
  pedantic: false,
  mangle: false,
  headerIds: false,
  highlight: (code, language) => {
    const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
    return hljs.highlight(code, { language: validLanguage }).value;
  }
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
          const htmlContent = processContent(content);
          
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