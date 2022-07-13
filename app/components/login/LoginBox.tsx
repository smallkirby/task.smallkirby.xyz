import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { getProjectAuth } from 'lib/firebase';

const provider = new GithubAuthProvider();

export default function LoginBox() {
  const doLogin = async () => {
    const auth = getProjectAuth();
    if (auth === null) {
      console.error('Failed to get project auth.');
      return;
    }
    return await signInWithPopup(auth, provider);
  };

  return (
    <div
      className='mx-auto text-center flex-col'
    >
      <div className='py-4'>
        <img src='/img/3rd/github/GitHub-Mark-Light-32px.png' alt='Github' className='h-12 mx-auto' />
      </div>
      <div className='text-3xl mt-2 mb-4'>
        Sign in with GitHub
      </div>
      <button
        className='rounded-md w-32 bg-skgreen hover:bg-skgreen-dark shadow-md py-1 text-skwhite-light text-lg'
        onClick={doLogin}
      >
        Sign in
      </button>
    </div>
  );
};
