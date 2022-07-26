export default function BasicDescription() {
  return (
    <div className="flex flex-col md:flex-row md:pt-4">
      <div className="md:w-1/2 flex flex-col px-10">
        <div>
          <div className="flex mx-auto mb-5">
            <img src='/img/sample/task_list.png' alt='task list' className="rounded-2xl mr-5 w-1/2" />
            <img src='/img/sample/task_progress.png' alt='task progress' className="rounded-2xl w-1/2" />
          </div>
        </div>
        <div className="mx-auto">
          <img src='/img/sample/preview.png' alt='preview' className="rounded-2xl w-full" />
        </div>

      </div>
      <div className="md:w-1/2 px-10 my-auto py-auto">
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
