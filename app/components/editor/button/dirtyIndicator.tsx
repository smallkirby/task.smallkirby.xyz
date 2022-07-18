import { SyncProblem } from '@mui/icons-material';
import { Tooltip, CircularProgress } from '@mui/material';
import { CloudDone } from '@mui/icons-material';

export type DirtySyncStatus = 'synced' | 'dirty' | 'syncing';

export default function DirtyIndicator({ status }: {status: DirtySyncStatus}) {
  return (
    <div className="h-full text-skblack-light text-lg py-auto">
      {status === 'syncing' &&
        <Tooltip title="Syncing with server">
          <div className='py-2'>
            <CircularProgress size={25} />
          </div>
        </Tooltip>
      }
      {status === 'dirty' &&
        <Tooltip title="Unsaved changes">
          <SyncProblem fontSize='large' />
        </Tooltip>
      }
      {status === 'synced' &&
        <Tooltip title='Changes saved'>
          <CloudDone fontSize='large' />
        </Tooltip>
      }
    </div>
  );
};
