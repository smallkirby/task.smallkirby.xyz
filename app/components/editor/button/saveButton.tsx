import { Tooltip } from '@mui/material';

export default function SaveButton({ callback, disable }: {callback: () => void, disable?: boolean}) {
  return (
    <button
      className={`w-20 rounded-md text-lg hover:bg-skblue-dark text-skwhite
      border-skblack-light hover:border-skblue-dark drop-shadow-xl
        transition-all duration-500 ${disable ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={() => !disable && callback()}
    >
      <Tooltip title={disable ? 'No new changes' : 'Push changes'} >
        <div>Save</div>
      </Tooltip>
    </button>
  );
};
