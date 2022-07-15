export default function NotFound() {
  return (
    <div className='w-full md:w-1/2 mx-auto px-auto pt-16 pb-20 relative'>
      <div className="absolute mx-auto px-auto w-full">
        <img src='/img/logo.png' alt='logo' className='h-72 z-0 mx-auto px-auto blur-md' />
      </div>
      <div className='text-3xl z-30 absolute mx-auto px-auto w-full'>
        <p className="text-center text-6xl pt-8 text-skblack-light">Not Found</p>
      </div>
    </div>
  );
}
