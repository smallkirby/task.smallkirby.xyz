import { useState } from 'react';
import { IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { MoreVert, ContentCopy } from '@mui/icons-material';

export interface OtherMenuCallbaks {
  onCopyPreviousClicked?: () => void;
};

export default function OtherMenuButton({ callbacks, disable = false }: {
  callbacks: OtherMenuCallbaks, disable?: boolean
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label='menu-button'
        id='other-menu-button'
        aria-controls={open ? 'menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
        className='text-skwhite'
      >
        <MoreVert />
      </IconButton>

      <Menu
        id='menu'
        aria-labelledby='other-menu-button'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        sx={{
          '.MuiPaper-root': {
            backgroundColor: '#282828',
          },
          '.MuiList-root': {
            backgroundColor: '#282828',
            borderColor: '474747',
            borderRadius: '8px',
            color: '#FBF1C7',
          },
        }}
        className='text-skwhite'
      >
        {!disable &&
          <MenuItem className='text-sm hover:bg-skblack-light' onClick={() => {
            setAnchorEl(null);
            callbacks.onCopyPreviousClicked?.();
          }}>
            <ListItemIcon className='text-skwhite'>
              <ContentCopy className='pr-2'/>
              Copy from previous day
            </ListItemIcon>
          </MenuItem>
        }
      </Menu>
    </div>
  );
};
