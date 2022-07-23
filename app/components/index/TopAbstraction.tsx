export default function TopAbstraction() {
  return (
    <div className="flex flex-col md:flex-row md:pt-4">
      <div className="md:w-1/2 mx-4 md:ml-20 mt-8 mb-8 items-end flex flex-col justify-self-end pr-20">
        <div className="flex flex-col justify-items-end w-max">
          <div className="w-max">
            <h2 className="text-4xl md:text-6xl font-oswald leading-tight mb-6 text-skwhite-light font-bold">
              <div>
            Remember <span className="text-skblue">what you do</span>.
              </div>
              <div>
            Remember <span className="text-skgreen-light">what you did</span>.
              </div>
              <div>
            They are <span className="text-skred">what you are</span>.
              </div>
            </h2>
          </div>

          <div className="ml-2 mb-8 w-max">
            <p>TASK is a simple, but powerful tool to write down your daily TODOs,</p>
            <p>visualize their achievement rate,</p>
            <p>with powerful and well-configured Markdown editor.</p>
          </div>

          <div className="text-center items-center w-max">
            <button
              className="mx-auto px-8 py-3 rounded-lg drop-shadow-2xl
            text-xl bg-skwhite text-skblack font-bold
            hover:bg-skwhite-dark"
            >
            Get Started
            </button>
          </div>
        </div>
      </div>

      <div
        className="md:w-1/2 relative overflow-y-hidden overflow-x-visible
        h-[58rem] py-4 pl-8 w-screen rounded-l-3xl"
      >
        <div
          style={{ backgroundImage: 'url("/img/3rd/free/penki-splash.jpg")' }}
          className="drop-shadow-2xl blur-sm brightness-50 z-0 left-0 h-full"
        />
        <div className="top-0 left-0 absolute w-5/6 pt-16 pl-20">
          <img src='/img/exp-diary.png' alt='example diary'
            className="w-full rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};
