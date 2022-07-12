export default function SaveButton({ callback }: {callback: () => void}) {
  return (
    <button
      className='w-20 border-2 rounded-md text-lg hover:bg-skblue-dark text-skwhite
        border-skblue-dark drop-shadow-xl'
      onClick={callback}
    >
      Save
    </button>
  );
};
