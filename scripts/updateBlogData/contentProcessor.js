import { marked } from 'marked';
import { detectLanguage, languageMap } from './languageDetector.js';

export const convertHighlightBlocks = (content) => {
  return content.replace(
    /{%\s*highlight\s+(\w+)\s*%}([\s\S]*?){%\s*endhighlight\s*%}/g,
    (match, language, code) => {
      const mappedLanguage = languageMap[language.toLowerCase()] || detectLanguage(code);
      const cleanCode = code
        .trim()
        .split('\n')
        .map(line => line.trimEnd())
        .join('\n');
      return `\`\`\`${mappedLanguage}\n${cleanCode}\n\`\`\``;
    }
  );
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

export const processContent = (content) => {
  content = content.replace(/!\[(.*?)\]\((.*?)\)\s*\{:width="(\d+)%"\}/g, (match, alt, src, width) => {
    return `<img src="${src}" alt="${alt}" style="width: ${width}%">`;
  });
  
  content = convertHighlightBlocks(content);
  content = fixBlockquoteLineBreaks(content);
  content = fixParagraphLineBreaks(content);
  
  return marked.parse(content);
}; 