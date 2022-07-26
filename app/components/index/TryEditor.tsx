import Editor from 'components/editor/Editor';
import { stripIndent } from 'common-tags';
import { rawmd2tasks } from 'lib/task';
import type { DayTask } from 'typings/task';
import { DEFAULT_DTASK } from 'lib/task';

const defaultMdContent = stripIndent`
  # [task.smallkirby.xyz](https://task.smallkirby.xyz)

  ## Welcome to **task.smallkirby.xyz**!

  Here are what you have to do:

  - [x] Try the editor :memo:
  - [ ] View preview and check task list :eyes:
    - Click the :eye: icon in the top-right menu.
  - [ ] Sign in by GitHub account
  - [ ] Write the first TODO list and related memo! :sparkle:

  <br>

  ## Features :sparkles:

  ### Basic Markdown support

  ### Code block syntax highlighting :cake:

  \`\`\`ts
  const tasks = async (info: DayTask): number => {
    console.log('uouo fish life');
  };
  \`\`\`
`;

export default function TryEditor() {
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
    <div>
      <div className='text-4xl md:text-7xl font-oswald font-bold leading-relaxed mx-auto text-center mb-10 md:mb-20'>
        <span className='text-skred mr-4 md:mr-8'>Try</span>
        <span className='mr-4 md:mr-8'>it</span>
        <span className='text-skgreen-light'>by yourself...</span>
      </div>
      <div className='w-full md:w-2/3 md:mx-auto px-4'>
        <Editor initialDtask={defaultDtask} dontCache={true} mockSave={true} />
      </div>
    </div>
  );
};
