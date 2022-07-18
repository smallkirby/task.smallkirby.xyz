import type { DayTask } from 'typings/task';
import TaskClock from 'components/task/taskClock';
import SaveButton from './button/saveButton';
import SwitchModeButton from './button/switchModeButton';
import type { EditorMode } from 'typings/editor';
import OtherMenuButton from './button/otherMenuButton';
import type { DirtySyncStatus } from './button/dirtyIndicator';
import DirtyIndicator from './button/dirtyIndicator';

export interface EditorToolbarCallbacks {
  onSaveClick?: () => void;
  onSwitchModeClick?: () => void;
  onCopyPreviousClicked?: () => void;
};

export default function EditorToolBar(
  { disable = false, dtask, mode, callbacks, indStatus }: {
  disable?: boolean, dtask: DayTask, mode: EditorMode, callbacks: EditorToolbarCallbacks, indStatus: DirtySyncStatus,
}) {
  return (
    <div className='flex mt-2 px-4 justify-between justify-items-end bg-skblack
      rounded-md drop-shadow-2xl border-b-2 border-skblack-light pb-1 h-12'
    >
      <div className='pr-8 flex justify-items-end'>
        <TaskClock dtask={dtask} />
        {disable ?
          <div className='ml-2 py-auto my-auto pt-1 text-skblack-light'>(Read-only)</div> :
          <div className='my-auto ml-4'>
            <DirtyIndicator status={indStatus} />
          </div>
        }
      </div>
      <div className='flex justify-end justify-items-end'>
        <SwitchModeButton callback={() => callbacks?.onSwitchModeClick?.()} mode={mode} />
        {!disable &&
          <SaveButton callback={() => callbacks?.onSaveClick?.() }/>
        }
        <OtherMenuButton disable={disable} callbacks={{
          onCopyPreviousClicked: () => callbacks?.onCopyPreviousClicked?.(),
        }} />
      </div>
    </div>
  );
};
