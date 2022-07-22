import type { Editor } from 'codemirror';

export const tabHandler = (editor: Editor) => {
  const doc = editor.getDoc();
  const cursor = doc.getCursor();

  if (doc.getLine(cursor.line).trimStart().startsWith('- ') && cursor.ch >= 2) {
    // make list deeper
    const insertionPoint = {
      ...cursor,
    };
    insertionPoint.ch = 0;
    doc.replaceRange(' '.repeat(2), insertionPoint);
  } else {
    // just insert spaces instead of tab
    doc.replaceRange(' '.repeat(2), cursor);
  }
};
