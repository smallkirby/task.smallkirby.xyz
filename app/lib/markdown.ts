import MarkdownIt from 'markdown-it';
import DOMPurify from 'dompurify';

const processor = new MarkdownIt({
  html: true,
  xhtmlOut: true,
  breaks: false,
});

export const compile2html = (md: string): string => {
  const dirtyHtml = processor.render(md);
  return DOMPurify.sanitize(dirtyHtml);
};
