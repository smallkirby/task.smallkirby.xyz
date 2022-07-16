import 'codemirror/mode/markdown/markdown';
import 'codemirror/addon/mode/overlay';
import type { EditorConfiguration, StringStream } from 'codemirror';

export default ((mod) => {
  mod(require('codemirror/lib/codemirror'));
})((CodeMirror: any) => {
  CodeMirror.defineMode('cmwrapper', (config: EditorConfiguration, parserConfig: any) => {
    const overlay = {
      token: <T>(stream: StringStream, state: T): string | null => {
        stream.next();
        if (stream.current() == ' ') {
          return 'printable-space';
        } else {
          return null;
        }
      },
    };

    return CodeMirror.overlayMode(CodeMirror.getMode(config, parserConfig.backdrop || 'markdown'), overlay);
  });
});
