import useStore from '../../store';
import { useState } from 'react';
import { useNavigate } from '@remix-run/react';
import { Button } from '@mui/material';
import Menu from '@mui/material/Menu';
import { MenuItem, ListItemIcon } from '@mui/material';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

export default function UserBadge() {
  const { fbuser } = useStore();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (fbuser === null) {
      setAnchorEl(null);
      navigate('/login');
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='pt-0 mt-0'>
      <Button className='my-auto' onClick={handleClick} id='user-badge'
        aria-controls={open ? 'user-badge' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        sx={{
          paddingTop: 1,
        }}
      >
        {fbuser === null || fbuser === 'pending' ?
          <FontAwesomeIcon
            icon={faQuestion}
            className='text-skwhite border-2 border-skblack-light rounded-full p-2 h-4 w-4'
          /> :
          <img src={fbuser.photoURL || ''} alt={fbuser.displayName || ''}
            className={'h-6 md:h-8 rounded-full'}
          />
        }
      </Button>

      <Menu
        id='user-menu'
        aria-labelledby='user-badge'
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
      >
        <MenuItem className='text-sm hover:bg-skblack-light' onClick={() => {
          setAnchorEl(null); navigate('/profile');
        }}>
          <ListItemIcon><Settings fontSize='small' className='text-skwhite' /></ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem className='text-sm hover:bg-red-500' onClick={() => {
          setAnchorEl(null); navigate('/logout');
        }}>
          <ListItemIcon><Logout fontSize='small' className='text-skwhite' /></ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};
