import { stripIndent } from 'common-tags';
import Editor from 'components/editor/Editor';
import type { DayTask } from 'typings/task';

const defaultMdContent = stripIndent`
  # task.smallkirby.xyz

  ## Welcome to \`task.smallkirby.xyz\`!

  Here are what you have to do today:

  - [ ] Nirugiri
  - [x] uouo fish life
  - [ ] fitbit
`;

const defaultDtask: DayTask = {
  note_md: defaultMdContent,
  day_id: 'SAMPLE',
  owner: null,
  tasks: [],
};

export default function Index() {
  return (
    <div>
      <Editor initialDtask={defaultDtask}/>
    </div>
  );
}
