import { useEffect, useRef } from 'react';
import type { Editor as CMEditor, EditorConfiguration } from 'codemirror';
import { fromTextArea } from 'codemirror';
import { useState } from 'react';
import { isClient } from '../../lib/misc';
import 'codemirror/addon/edit/continuelist.js';
import 'codemirror/addon/fold/markdown-fold.js';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/selection/active-line.js';
import 'codemirror/addon/edit/closebrackets.js';
require('codemirror/mode/markdown/markdown.js');
require('codemirror/keymap/vim.js');
require('codemirror/addon/hint/show-hint.js');

const editorConfig: EditorConfiguration = {
  theme: 'wywiwya',
  lineNumbers: true,
  mode: 'markdown',
  indentUnit: 2,
  smartIndent: true,
  indentWithTabs: false,
  lineWrapping: true,
  styleActiveLine: true,
  keyMap: 'vim',
  autoCloseBrackets: true,
  foldGutter: true,
};
export interface EditorCallbacks {
  onChange: (value: string) => void;
}

export default function InnerEditor({ rawmd = '', callbacks }: {rawmd?: string, callbacks: EditorCallbacks}) {
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const [isBrowser] = useState(isClient());
  const [editor, setEditor] = useState<CMEditor | null>(null);

  const getCurrentText = () => (
    editor ? editor.getDoc().getValue() : ''
  );

  useEffect(() => {
    // Set callbacks for editor
    if (!editor) return;
    editor.setValue(rawmd);

    editor.on('change', () => {
      callbacks.onChange(getCurrentText());
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  useEffect(() => {
    if (!isBrowser) {
      return;
    }
    const textArea = editorRef.current;
    if (!textArea) {
      return;
    }

    const newEditor = fromTextArea(textArea, editorConfig);
    setEditor(newEditor);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBrowser]);

  return (
    <div id='cmtextarea'>
      <textarea ref={editorRef} />
    </div>
  );
};
