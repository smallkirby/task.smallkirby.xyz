import useStore from '../../store';

export default function UserBadge() {
  const { user } = useStore();

  return (
    <button className='my-auto'>
      <img src={user?.photoURL || '/img/question.png'} alt={user?.displayName || 'Not Logged In'}
        className={`h-8 rounded-full ${user === null ? 'border-2 border-skblack-light p-2' : ''}`} />
    </button>
  );
};
