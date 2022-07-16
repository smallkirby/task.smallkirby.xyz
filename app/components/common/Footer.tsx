export default function Footer() {
  return (
    <footer
      className="mt-auto w-full bg-black text-white px-4 pt-6 flex flex-col md:flex-row
      items-start md:items-center justify-between"
    >
      {/* Logo for PC */}
      <div className="flex-col ml-4 mt-2 hidden md:flex">
        <div className="flex items-center">
          <img src="/img/logo.png" className="w-16 h-16 mr-4" alt='logo' />
          <p className="text-3xl">
            TASKS
          </p>
        </div>

        <div className="bottom-0 mt-2 mb-4 text-gray-400">
          2022 smallkirby. Few Rights Reserved.
        </div>
      </div>

      <div className="flex mt-2 md:mt-0 ml-3 md:mx-12">
        {/* Legal */}
        <div className="flex flex-col text-gray-300 md:mx-12 mb-4 md:mb-2">
          <div className="text-lg mb-1">
            <p>Legal</p>
          </div>
          <div className="text-gray-400 flex flex-col ml-3">
            <div>
              <a href="/privacy">
                Privacy
              </a>
            </div>
            <div>
              <a href="/disclaimer">
                Disclaimer
              </a>
            </div>
          </div>
        </div>

        {/* Follow us */}
        <div className="flex flex-col text-gray-300 md:mx-12 mb-4 md:mb-2">
          <div className="text-lg mb-1">
            <p>Follow Us</p>
          </div>
          <div className="text-gray-400 ml-3">
            <div className="mb-1">
              <a href="https://github.com/smallkirby/task.smallkirby.xyz"
                className="flex" target="_blank" rel="noreferrer"
              >
                <img src="/img/3rd/github/GitHub-Mark-Light-32px.png" className="w-5 h-5 mx-2" alt='github' />
                <p>Github</p>
              </a>
            </div>
            <div className="mb-1">
              <a href="https://twitter.com/smallkirby" className="flex" target="_blank" rel="noreferrer">
                <img src="/img/3rd/twitter/2021-Twitter-logo-blue.png" className="w-5 h-5 mx-2" alt='twitter' />
                <p>Twitter</p>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Logo for mobiles */}
      <div className="flex-col mx-auto mt-2 flex md:hidden">
        <div className="flex items-center mx-auto">
          <img src="/img/logo.png" className="w-16 h-16 mr-4" alt='logo' />
          <p className="text-3xl">
            TASKS
          </p>
        </div>

        <div className="bottom-0 mt-2 mb-4 text-gray-400">
          2022 smallkirby. Few Rights Reserved.
        </div>
      </div>
    </footer>
  );
};
