import MarkdownIt from 'markdown-it';
import DOMPurify from 'dompurify';
import highlight from 'highlight.js';
const markdownCheckbox = require('markdown-it-task-checkbox');
const markdownEmoji = require('markdown-it-emoji');

const processor = new MarkdownIt({
  html: true,
  xhtmlOut: true,
  breaks: true,
  linkify: true,
  highlight: (str, lang) => {
    if (lang && highlight.getLanguage(lang)) {
      try {
        return '<pre class="codeblock">' + highlight.highlight(str, { language: lang }).value + '</pre>';
      } catch (_) {}
    }
    return '';
  },
}).use(markdownCheckbox, {
  liClass: 'task-list-item',
  idPrefix: 'cbx_',
}).use(markdownEmoji);

export const compile2html = (md: string): string => {
  const dirtyHtml = processor.render(md);
  return DOMPurify.sanitize(dirtyHtml);
};
