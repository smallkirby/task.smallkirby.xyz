import TopAbstraction from 'components/index/TopAbstraction';
import BasicDescription from 'components/index/BasicDescription';
import TryEditor from 'components/index/TryEditor';

export default function Index() {
  return (
    <div className='mt-20'>
      <div className='mb-20'>
        <TopAbstraction />
      </div>
      <div className='mt-40 mb-20'>
        <BasicDescription />
      </div>
      <div className='mt-20 md:mt-80 mb-20'>
        <TryEditor />
      </div>
    </div>
  );
}
