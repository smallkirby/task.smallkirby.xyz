import { stripIndent } from 'common-tags';
import Editor from 'components/editor/Editor';
import { rawmd2tasks } from 'lib/task';
import type { DayTask } from 'typings/task';

const defaultMdContent = stripIndent`
  # task.smallkirby.xyz

  ## Welcome to \`task.smallkirby.xyz\`!

  Here are what you have to do today:

  - [ ] Nirugiri
  - [x] uouo fish life
  - [ ] fitbit

  <br>

  ### :warning: UNDER CONSTRUCTION :warning:
`;

export default function Index() {
  const defaultDtask: DayTask = {
    note_md: defaultMdContent,
    day_id: 'SAMPLE',
    owner: null,
    tasks: rawmd2tasks(defaultMdContent),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return (
    <div>
      <Editor initialDtask={defaultDtask} dontCache={true} />
    </div>
  );
}
