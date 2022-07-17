import { useNavigate, useLocation } from '@remix-run/react';
import UserBadge from 'components/user/UserBadge';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      <header
        className="fixed top-0 left-0 py-2 px-6 w-screen h-14 z-40 border-b-[1px] border-skblack-light
          bg-skblack flex justify-between
        "
      >
        <div className='flex flex-shrink justify-items-center'>
          <button className="h-full mr-4 md:mr-8" onClick={() => navigate('/')}>
            <img src="/img/logo.png" alt="logo" className="h-6 md:h-8" />
          </button>

          <div className='text-sm md:text-lg my-auto border-skblack-light pt-2
            md:px-2 overflow-y-hidden overflow-x-hidden flex pb-0 pr-4'
          >
            <button
              className={`h-full px-2 hover:text-skwhite-dark transition-all duration-500 border-skwhite-dark mr-2
                ${location.pathname.startsWith('/today') ? 'border-b-2 ' : ''}`
              }
              onClick={() => navigate('/today')}
            >
              Today
            </button>
            <button
              className={`h-full px-2 hover:text-skwhite-dark transition-all duration-500 border-skwhite-dark mr-2
                ${location.pathname.startsWith('/calendar') ? 'border-b-2 ' : ''}`
              }
              onClick={() => navigate('/calendar')}
            >
              Calendar
            </button>
            <button
              className={`h-full px-2 hover:text-skwhite-dark transition-all duration-500 border-skwhite-dark mr-2
                ${location.pathname.startsWith('/analysis') ? 'border-b-2 ' : ''}`
              }
              onClick={() => navigate('/analysis')}
            >
              Analysis
            </button>
            <button
              className={`h-full px-2 hover:text-skwhite-dark transition-all duration-500 border-skwhite-dark mr-2
                ${location.pathname.startsWith('/api') ? 'border-b-2 ' : ''}`
              }
              onClick={() => navigate('/api')}
            >
              API
            </button>
          </div>
        </div>

        <div className='flex flex-shrink'>
          <UserBadge />
        </div>
      </header>
    </div>
  );
};
