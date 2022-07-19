import 'codemirror/addon/hint/show-hint';
import type { Editor, Hint, Hints } from 'codemirror';
import CodeMirror from 'codemirror';

export type EmojiInstance = {
  name: string;
  url: string;
};

export const emojiCompletion = function(emojiList: EmojiInstance[], cm: Editor) {
  CodeMirror.showHint(cm, () => {
    const cur = cm.getCursor();
    const token = cm.getTokenAt(cur);
    const end = cur.ch;
    let ch = cur.ch;
    const line = cur.line;
    let currentWord = token.string;

    while (ch-- > -1) {
      const t = cm.getTokenAt({ ch, line }).string;
      if (t === ':') {
        // eslint-disable-next-line no-loop-func
        const filteredList = emojiList.filter((emoji) => emoji.name.startsWith(currentWord));
        if (filteredList.length >= 1) {
          return {
            list: filteredList.map((emoji) => ({
              text: emoji.name + ':',
              displayText: `<img src="${emoji.url}" alt="${emoji}"
                height="15px" width="15px" class='codemirror-emoji-hint'/>${emoji.name}`,
              render: (element: HTMLLIElement, data: Hints, cur: Hint): void => {
                element.innerHTML = cur.displayText ?? '';
              },
            })),
            // eslint-disable-next-line new-cap
            from: CodeMirror.Pos(line, ch),
            // eslint-disable-next-line new-cap
            to: CodeMirror.Pos(line, end),
          };
        }
      }
      currentWord = t + currentWord;
    }
  }, { completeSingle: false });
};
