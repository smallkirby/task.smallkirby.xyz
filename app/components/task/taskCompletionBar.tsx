import type { DayTask } from 'typings/task';
import { useState, useEffect } from 'react';
import { ResponsiveBar } from '@nivo/bar';

export default function TaskCompletionBar({ dtask }: {dtask: DayTask}) {
  const [totalDone, setTotalDone] = useState(0);
  const [totalUndone, setTotalUndone] = useState(0);
  const [data, setData] = useState([{
    kind: 'task',
    done: 0,
    undone: 0,
  }]);

  useEffect(() => {
    const completedTasks = dtask.tasks.filter((task) => task.done);
    setTotalDone(completedTasks.length);
  }, [dtask]);

  useEffect(() => {
    setTotalUndone(dtask.tasks.length - totalDone);
  }, [totalDone, dtask]);

  useEffect(() => {
    setData([{
      ...data[0],
      done: totalDone,
      undone: totalUndone,
    }]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalDone, totalUndone]);

  return (
    <ResponsiveBar
      data={data}
      indexBy='kind'
      keys={['done', 'undone']}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'dark2' }}
      layout='horizontal'
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      borderRadius={7}
      enableGridY={false}
      axisLeft={null}
      axisBottom={null}
      label={(d) => `${d.id === 'done' ? 'done' : 'TODO'}: ${d.value}` }
      tooltip={function() {
        return null;
      }}
      labelTextColor='#282828'
    />
  );
};
