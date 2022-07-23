import { stripIndent } from 'common-tags';
import Editor from 'components/editor/Editor';
import { rawmd2tasks } from 'lib/task';
import type { DayTask } from 'typings/task';
import { DEFAULT_DTASK } from 'lib/task';
import TopAbstraction from 'components/index/TopAbstraction';

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
    ...DEFAULT_DTASK,
    note_md: defaultMdContent,
    tasks: rawmd2tasks(defaultMdContent),
    day_id: 'SAMPLE',
    owner: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return (
    <div className='mt-20'>
      <div className='mb-20'>
        <TopAbstraction />
      </div>
      <Editor initialDtask={defaultDtask} dontCache={true} />
    </div>
  );
}
