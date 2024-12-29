import { marked } from 'marked';
import { detectLanguage, languageMap } from './languageDetector.js';
import { decode } from 'html-entities';

export const convertHighlightBlocks = (content) => {
  return content.replace(
    /{%\s*highlight\s+(\w+)\s*%}([\s\S]*?){%\s*endhighlight\s*%}/g,
    (match, language, code) => {
      const mappedLanguage = languageMap[language.toLowerCase()] || detectLanguage(code);
      const lines = code.split('\n');
      const cleanLines = lines.map((line, index) => {
        if ((index === 0 || index === lines.length - 1) && line.trim() === '') {
          return line;
        }
        return line.trimEnd();
      });
      const cleanCode = cleanLines.join('\n');
      return `\`\`\`${mappedLanguage}\n${cleanCode}\n\`\`\``;
    }
  );
};

export const convertImageIncludes = (content) => {
  return content.replace(/{%\s*include\s+image\.html\s+url="([^"]+)"\s+description="([^"]+)"\s*%}/g, (match, url, description) => {
    return `<img src="${url}" alt="${description}">`;
  });
};

export const fixBlockquoteLineBreaks = (content) => {
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

  return lines
    .join('\n')
    .replace(/^(>.*?)(?:<br>)/gm, '$1\n> ')
    .replace(/^(>.*?)$/gm, '$1  ');
};

export const fixParagraphLineBreaks = (content) => {
  return content
    .replace(/(\w)\n(\w)/g, '$1 $2')
    .replace(/  \n/g, '<br>\n');
};

export const extractPreview = (htmlContent) => {
  // Remove code blocks
  const withoutCode = htmlContent.replace(/<pre><code[\s\S]*?<\/code><\/pre>/g, '');
  
  // Remove HTML tags
  const textOnly = withoutCode.replace(/<[^>]*>/g, ' ');
  
  // Decode HTML entities
  const decodedText = decode(textOnly);
  
  // Remove extra whitespace
  const cleanText = decodedText.replace(/\s+/g, ' ').trim();
  
  // Take first 400 characters and cut at the last complete word
  const preview = cleanText.slice(0, 400).replace(/\s+\S*$/, '');
  
  return preview + '...';
};

export const processContent = (content) => {
  content = convertImageIncludes(content);
  
  content = content.replace(/!\[(.*?)\]\((.*?)\)\s*\{:width="(\d+)%"\}/g, (match, alt, src, width) => {
    return `<img src="${src}" alt="${alt}" style="width: ${width}%">`;
  });
  
  content = content.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, src) => {
    return `<img src="${src}" alt="${alt}">`;
  });
  
  content = convertHighlightBlocks(content);
  content = fixBlockquoteLineBreaks(content);
  content = fixParagraphLineBreaks(content);
  
  return marked.parse(content);
}; 