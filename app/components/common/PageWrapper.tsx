import type { ReactNode } from 'react';

export default function PageWrapper({ children }: {children: ReactNode}) {
  return (
    <div className='mt-16 w-full md:w-2/3 mx-auto px-1 md:px-4 mb-20'>
      { children }
    </div>
  );
};
