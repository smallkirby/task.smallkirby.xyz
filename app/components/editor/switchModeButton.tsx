import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPen } from '@fortawesome/free-solid-svg-icons';
import type { EditorMode } from 'typings/editor';

export default function SwitchModeButton({ callback, mode }: {callback: () => void, mode: EditorMode}) {
  return (
    <button
      className='w-6 h-6 rounded-md text-lg text-skwhite my-auto'
      onClick={callback}
    >
      <FontAwesomeIcon icon={mode === 'edit' ? faEye : faPen }
        className='hover:text-skgreen mb-0 pb-0 transition-all duration-500'
      />
    </button>
  );
};
