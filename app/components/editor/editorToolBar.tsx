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
    <div className='flex mt-2 mx-2 md:px-2 justify-between justify-items-end'>
      <div className='border-r-2 border-skblack-light pr-8'>
        <TaskClock dtask={dtask} />
      </div>
      <div className='flex justify-end justify-items-end'>
        <div className='mr-4'><SwitchModeButton callback={onSwitchModeClick} mode={mode} /></div>
        {!disable &&
          <SaveButton callback={onSaveClick ?? emptyCallback }/>
        }
      </div>
    </div>
  );
};
