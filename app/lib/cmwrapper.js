require('codemirror/mode/markdown/markdown');
require('codemirror/addon/mode/overlay');

(function(mod) {
  if (typeof exports == 'object' && typeof module == 'object') { // CommonJS
    mod(require('codemirror/lib/codemirror'));
  } else if (typeof define == 'function' && define.amd) { // AMD
    define(['codemirror/lib/codemirror'], mod);
  } else { // Plain browser env
    mod(CodeMirror);
  }
})(function(CodeMirror) {
  CodeMirror.defineMode('cmwrapper', function(config, parserConfig) {
    const overlay = {
      token: function(stream, state) {
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
