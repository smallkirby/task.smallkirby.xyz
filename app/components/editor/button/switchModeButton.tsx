import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPen } from '@fortawesome/free-solid-svg-icons';
import type { EditorMode } from 'typings/editor';
import { Tooltip } from '@mui/material';

export default function SwitchModeButton({ callback, mode }: {callback: () => void, mode: EditorMode}) {
  return (
    <button
      className='w-6 rounded-md text-lg text-skwhite mb-0 pb-0 mr-4'
      onClick={callback}
    >
      <Tooltip title={mode === 'edit' ?
        'Go to preview mode' :
        'Go to edit mode'
      }>
        <FontAwesomeIcon icon={mode === 'edit' ? faEye : faPen }
          className='hover:text-skgreen mb-0 pb-0 transition-all duration-500 pt-2'
        />
      </Tooltip>
    </button>
  );
};
