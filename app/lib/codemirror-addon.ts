import 'codemirror/mode/markdown/markdown';
import 'codemirror/addon/mode/overlay';
import type { EditorConfiguration, StringStream } from 'codemirror';

export default ((mod) => {
  mod(require('codemirror/lib/codemirror'));
})((CodeMirror: any) => {
  CodeMirror.defineMode('cmtask', (config: EditorConfiguration, parserConfig: any) => {
    // `counter` is a dirty workaround, cuz overlay mode seems to concat tokens if these have the same classes.
    let counter = 1;
    const overlay = {
      token: <T>(stream: StringStream, state: T): string | null => {
        const c = stream.next();
        if (c === ' ') {
          return `printable-space printable-space-${counter++}`;
        } else {
          return null;
        }
      },
    };

    return CodeMirror.overlayMode(CodeMirror.getMode(config, 'markdown'), overlay);
  });
});
