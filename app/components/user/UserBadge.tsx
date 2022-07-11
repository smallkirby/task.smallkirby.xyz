import useStore from '../../store';
import { useNavigate } from '@remix-run/react';

export default function UserBadge() {
  const { fbuser } = useStore();
  const navigate = useNavigate();

  return (
    <button className='my-auto'>
      <img src={fbuser?.photoURL || '/img/question.png'} alt={fbuser?.displayName || 'Not Logged In'}
        className={`h-8 rounded-full ${fbuser === null ? 'border-2 border-skblack-light p-2' : ''}`}
        onClick={() => {
          fbuser || navigate('/login');
        }}
      />
    </button>
  );
};
