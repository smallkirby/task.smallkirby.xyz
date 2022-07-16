import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from '@remix-run/react';
import type { DayTask } from 'typings/task';
import { fetchTask } from 'lib/task';
import useStore from 'store';
import TaskNotFound from 'components/task/TaskNotFound';
import NonEditableEditor from 'components/editor/NonEditableEditor';

export default function TaskPage() {
  const params = useParams();
  const [dtask, setDtask] = useState<DayTask | null>(null);
  const { user, setPendingRedirect } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    (async () => {
      const uid = user?.uid;
      if (!uid) {
        setPendingRedirect(location.pathname);
        navigate('/login');
        return;
      }
      const dayid = params.taskDayId;
      if (!dayid) return;
      const fetchedTask = await fetchTask(uid, dayid);
      if (fetchedTask) {
        setDtask(fetchedTask);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div>
      {user?.uid && dtask ?
        <div>
          <NonEditableEditor dtask={dtask} />
        </div> :
        <div className='pt-12'>
          <TaskNotFound />
        </div>
      }
    </div>
  );
};
