import { marked } from 'marked';
import hljs from 'highlight.js';
import { detectLanguage } from './languageDetector.js';

const renderer = new marked.Renderer();

renderer.code = (code, language) => {
  const detectedLanguage = language || detectLanguage(code);
  const validLanguage = hljs.getLanguage(detectedLanguage) ? detectedLanguage : detectLanguage(code);
  
  // Preserve all lines in the code block
  const lines = code.split('\n').map(line => line.trimEnd());
  const preservedCode = lines.join('\n');
  
  const highlightedCode = hljs.highlight(preservedCode, { language: validLanguage }).value;
  return `<pre><code class="hljs language-${validLanguage}">${highlightedCode}</code></pre>`;
};

renderer.link = (href, title, text) => {
  return `<a href="${href}" target="_blank" rel="noreferrer"${title ? ` title="${title}"` : ''}>${text}</a>`;
};

renderer.paragraph = (text) => {
  text = text.replace(/(\w)\n(\w)/g, '$1 $2');
  return `<p>${text}</p>`;
};

renderer.blockquote = (quote) => {
  const cleanQuote = quote
    .replace(/^<p>|<\/p>$/g, '')
    .replace(/<br>/g, '</p><p>')
    .trim();
  return `<blockquote class="blog-quote"><p>${cleanQuote}</p></blockquote>`;
};

renderer.image = (href, title, text) => {
  const widthMatch = text.match(/\{:width="(\d+)%"\}/);
  const width = widthMatch ? widthMatch[1] + '%' : null;
  
  const altText = text.replace(/\s*\{:width="\d+%"\}/, '');
  
  return `<img src="${href}"${title ? ` title="${title}"` : ''} alt="${altText}"${width ? ` style="width: ${width};"` : ''}>`;
};

marked.setOptions({
  renderer: renderer,
  highlight: (code, language) => {
    const detectedLanguage = language || detectLanguage(code);
    const validLanguage = hljs.getLanguage(detectedLanguage) ? detectedLanguage : detectLanguage(code);
    return hljs.highlight(code, { language: validLanguage }).value;
  },
  langPrefix: 'hljs language-',
  gfm: true,
  breaks: true
});

export { renderer }; 