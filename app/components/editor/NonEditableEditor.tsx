import { ClientOnly } from 'remix-utils';
import InnerEditor from './innerEditor.client';
import { Links } from '@remix-run/react';
import type { DayTask } from '../../typings/task';
import Preview from './preview';
import type { EditorMode } from 'typings/editor';
import TaskAnalysisPanel from 'components/task/TaskAnalysisPanel';
import { useState } from 'react';
import EditorToolBar from './editorToolBar';

export default function NonEditableEditor({ dtask }:{ dtask: DayTask },
) {
  const [mode, setMode] = useState<EditorMode>('view');

  const onSwitchModeClick = () => {
    setMode(mode === 'edit' ? 'view' : 'edit');
  };

  return (
    <div>
      <Links />

      <div className='mt-2'>
        <EditorToolBar dtask={dtask} disable={true} onSwitchModeClick={onSwitchModeClick} mode={mode} />
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
