import MarkdownIt from 'markdown-it';
import DOMPurify from 'dompurify';
const markdownCheckbox = require('markdown-it-task-checkbox');
const markdownEmoji = require('markdown-it-emoji');

const processor = new MarkdownIt({
  html: true,
  xhtmlOut: true,
  breaks: true,
  linkify: true,
}).use(markdownCheckbox, {
  liClass: 'task-list-item',
  idPrefix: 'cbx_',
}).use(markdownEmoji);

export const compile2html = (md: string): string => {
  const dirtyHtml = processor.render(md);
  return DOMPurify.sanitize(dirtyHtml);
};
