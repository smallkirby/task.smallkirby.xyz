import { useEffect, useState } from 'react';
import { compile2html } from 'lib/markdown';

export default function Preview(props: {rawmd: string }) {
  const [html, setHtml] = useState('');

  useEffect(() => {
    setHtml(compile2html(props.rawmd));
  }, [props.rawmd]);

  return (
    <div className='bg-skblack-dark text-skwhite rounded-2xl py-4 mr-2 px-6 md:px-10 pb-20
      h-full w-full drop-shadow-2xl'
    >
      <link rel='stylesheet' href='/css/preview.css'></link>
      {props.rawmd.length !== 0 &&
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      }
    </div>
  );
};
