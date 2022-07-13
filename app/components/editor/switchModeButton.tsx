import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import type { EditorMode } from 'typings/editor';

export default function SwitchModeButton({ callback, mode }: {callback: () => void, mode: EditorMode}) {
  return (
    <button
      className='w-6 h-6 rounded-md text-lg text-skwhite my-auto'
      onClick={callback}
    >
      <FontAwesomeIcon icon={faEye} className='hover:text-skgreen mb-0 pb-0' />
    </button>
  );
};
