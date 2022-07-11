import { useNavigate } from '@remix-run/react';
import UserBadge from '~/components/user/UserBadge';

export default function Header() {
  const navigate = useNavigate();

  return (
    <div>
      <header
        className="fixed top-0 left-0 py-2 px-6 w-screen h-14 z-40 border-b-[1px] border-skblack-light
          flex justify-between
        "
      >
        <div className='flex'>
          <button className="h-full mr-8" onClick={() => navigate('/')}>
            <img src="/img/logo.png" alt="logo" className="h-8 rounded-full" />
          </button>

          <div className='text-xl my-auto'>
            <button className="h-full mr-6" onClick={() => navigate('/today')}>
              Today
            </button>
            <button className="h-full mr-6" onClick={() => navigate('/calendar')}>
              Calendar
            </button>
          </div>
        </div>

        <div className='flex'>
          <UserBadge />
        </div>
      </header>
    </div>
  );
};
