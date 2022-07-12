import { ClientOnly } from 'remix-utils';
import type { EditorCallbacks } from './innerEditor.client';
import InnerEditor from './innerEditor.client';
import cmcss from 'codemirror/lib/codemirror.css';
import dracula from 'codemirror/theme/dracula.css';
import { Links } from '@remix-run/react';
import SaveButton from './saveButton';
import type { LinksFunction } from '@remix-run/cloudflare';
import type { DayTask } from '../../../typings/task';
import { rawmd2tasks, todaysDayID } from '../../lib/task';
import { useState } from 'react';
import { useEffect } from 'react';
import { throttle } from 'lodash';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: cmcss },
    { rel: 'stylesheet', href: dracula },
  ];
};

const THROTTLE_MS = 500;

export default function Editor({ initialDtask = null }: { initialDtask?: DayTask | null }) {
  const [dtask, setDtask] = useState<DayTask>(initialDtask || {
    day_id: todaysDayID(),
    note_md: '',
    tasks: [],
    owner: null,
  });
  const [callbacks] = useState<EditorCallbacks>({
    onChange: throttle((note) => {
      setDtask({ ...dtask, note_md: note, tasks: rawmd2tasks(note) });
    }, THROTTLE_MS),
  });

  useEffect(() => {
    console.log(dtask);
  }, [dtask]);

  const onSaveClick = () => {
    console.log('saved');
  };

  return (
    <div>
      <Links />

      <div className='flex mt-2'>
        <SaveButton callback={onSaveClick}/>
      </div>
      <div className='mt-2'>
        <ClientOnly fallback={<div>SSR not supported for this component</div>}>
          {() => <InnerEditor callbacks={callbacks} />}
        </ClientOnly>
      </div>
    </div>
  );
}
