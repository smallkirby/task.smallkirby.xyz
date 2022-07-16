import { ClientOnly } from 'remix-utils';
import InnerEditor from './innerEditor.client';
import { Links } from '@remix-run/react';
import SwitchModeButton from './switchModeButton';
import type { DayTask } from '../../typings/task';
import Preview from './preview';
import type { EditorMode } from 'typings/editor';
import TaskAnalysisPanel from 'components/task/TaskAnalysisPanel';
import TaskClock from 'components/task/taskClock';
import { useState } from 'react';

export default function NonEditableEditor({ dtask }:{ dtask: DayTask },
) {
  const [mode, setMode] = useState<EditorMode>('view');

  const onSwitchModeClick = () => {
    setMode(mode === 'edit' ? 'view' : 'edit');
  };

  return (
    <div>
      <Links />

      <div className='flex mt-2 mx-2 md:px-2 justify-between justify-items-end'>
        <div className='border-r-2 border-skblack-light pr-8 flex justify-center'>
          <div className='mr-4'>
            <TaskClock dtask={dtask} />
          </div>
          <div className='my-auto pt-1 text-gray-400'>(Read-Only)</div>
        </div>
        <div className='flex justify-end justify-items-end'>
          <div className='mr-4'><SwitchModeButton callback={onSwitchModeClick} mode={mode} /></div>
        </div>
      </div>
      <div className='mt-2'>
        {mode === 'edit' ? (
          <ClientOnly fallback={<div>SSR not supported for this component</div>}>
            {() => <InnerEditor rawmd={dtask.note_md} disable={true} />}
          </ClientOnly>
        ) :
          <div>
            <div>
              <TaskAnalysisPanel dtask={dtask}/>
            </div>
            <div className='mt-4'>
              <Preview rawmd={dtask.note_md} />
            </div>
          </div>
        }
      </div>
    </div>
  );
}
