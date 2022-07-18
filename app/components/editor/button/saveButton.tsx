export default function SaveButton({ callback }: {callback: () => void}) {
  return (
    <button
      className='w-20 rounded-md text-lg hover:bg-skblue-dark text-skwhite
      border-skblack-light hover:border-skblue-dark drop-shadow-xl
        transition-all duration-500'
      onClick={callback}
    >
      Save
    </button>
  );
};
