import { useCallback, useEffect, useState } from "react";
import { nanoid } from "nanoid";

type Task = () => Promise<void>;

interface PendingTask {
  id: string;
  callback: Task;
}

function resolve(task: PendingTask) {
  return task.callback().catch((e) => console.log(e));
}

function removeCurrentTask(
  current: PendingTask | undefined,
  incoming: PendingTask
) {
  if (current?.id === incoming.id) {
    return undefined;
  }
  return current;
}

export function useAsyncReplaceableTask() {
  const [running, setRunning] = useState(false);
  const [pending, setPending] = useState<PendingTask>();

  const replace = useCallback((task: Task) => {
    setPending({
      id: nanoid(),
      callback: task,
    });
  }, []);

  useEffect(() => {
    if (running) {
      return;
    }

    if (!pending) {
      return;
    }

    const onFinish = () => {
      setRunning(false);
    };

    setRunning(true);
    setPending((current) => removeCurrentTask(current, pending));
    resolve(pending).then(onFinish);
  }, [running, pending]);

  return { replace, running };
}
