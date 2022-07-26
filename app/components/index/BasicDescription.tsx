export default function BasicDescription() {
  return (
    <div className="flex flex-col-reverse md:flex-row md:pt-4">
      <div className="w-full md:w-1/2 flex flex-col justify-center justify-items-center">
        <div className="flex mx-auto mb-5 w-full justify-center justify-items-center">
          <div className="pl-2 pr-1">
            <img src='/img/sample/task_list.png' alt='task list' className="rounded-2xl" />
          </div>
          <div className="pl-2 pr-1">
            <img src='/img/sample/task_progress.png' alt='task progress' className="rounded-2xl" />
          </div>
        </div>
        <div className="mx-auto px-5 md:px-10">
          <img src='/img/sample/preview.png' alt='preview' className="rounded-2xl w-full" />
        </div>
      </div>

      <div className="w-full md:w-1/2 px-4 md:px-10 mb-8 md:my-auto md:py-auto">
        <div className="text-4xl md:text-6xl font-oswald font-bold leading-relaxed">
          <h2>
            <span className="text-skblue">List</span>
            <span className="mx-4">+</span>
            <span className="text-skred">Progress</span>
            <span className="mx-4">+</span>
            <br/>
            <span className="text-skgreen-light">Detailed Memo</span>
            <span className="mx-4">=</span>
            <span className="">😊</span>
          </h2>
        </div>
      </div>
    </div>
  );
};
