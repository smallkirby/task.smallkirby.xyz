import type { DayTask } from 'typings/task';
import TaskClock from 'components/task/taskClock';
import SaveButton from './saveButton';
import SwitchModeButton from './switchModeButton';
import type { EditorMode } from 'typings/editor';

export default function EditorToolBar(
  { disable = false, dtask, mode, onSaveClick, onSwitchModeClick }: {
  disable?: boolean, dtask: DayTask, mode: EditorMode,
  onSaveClick?: () => void,
  onSwitchModeClick: () => void,
}) {
  const emptyCallback = () => {};

  return (
    <div className='flex mt-2 px-4 justify-between justify-items-end bg-skblack
      rounded-md drop-shadow-2xl border-b-2 border-skblack-light pb-1'
    >
      <div className='pr-8'>
        <TaskClock dtask={dtask} />
      </div>
      <div className='flex justify-end justify-items-end'>
        <SwitchModeButton callback={onSwitchModeClick} mode={mode} />
        {!disable &&
          <SaveButton callback={onSaveClick ?? emptyCallback }/>
        }
      </div>
    </div>
  );
};
