import { useEffect, useState } from 'react';
import { compile2html } from 'lib/markdown';
import 'styles/preview.css';

export default function Preview(props: {rawmd: string }) {
  const [html, setHtml] = useState('');

  useEffect(() => {
    setHtml(compile2html(props.rawmd));
  }, [props.rawmd]);

  return (
    <div className='bg-skblack-dark text-skwhite rounded-2xl py-4 px-10 pb-20 h-full w-full'>
      <link rel='stylesheet' href='/css/preview.css'></link>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </div>
  );
};
