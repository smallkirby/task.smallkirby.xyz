import ReactLoading from 'react-loading';

export default function Loading() {
  return (
    <div className='w-full h-full mx-auto px-auto mt-12'>
      <ReactLoading type='spinningBubbles' color='#005052' className='mx-auto px-auto' />
    </div>
  );
};
