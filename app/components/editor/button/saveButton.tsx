import { Tooltip } from '@mui/material';

export default function SaveButton({ callback }: {callback: () => void}) {
  return (
    <button
      className='w-20 rounded-md text-lg hover:bg-skblue-dark text-skwhite
      border-skblack-light hover:border-skblue-dark drop-shadow-xl
        transition-all duration-500'
      onClick={callback}
    >
      <Tooltip title="Push changes">
        <div>Save</div>
      </Tooltip>
    </button>
  );
};
