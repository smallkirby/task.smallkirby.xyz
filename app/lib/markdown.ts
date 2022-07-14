import MarkdownIt from 'markdown-it';
import DOMPurify from 'dompurify';
const markdownCheckbox = require('markdown-it-task-checkbox');

const processor = new MarkdownIt({
  html: true,
  xhtmlOut: true,
  breaks: false,
}).use(markdownCheckbox, {
  liClass: 'task-list-item',
});

export const compile2html = (md: string): string => {
  const dirtyHtml = processor.render(md);
  return DOMPurify.sanitize(dirtyHtml);
};
