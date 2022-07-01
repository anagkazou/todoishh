import { useTasksCount } from "hooks";
import { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
export const ProjectTasksCounts = ({ projectId, name, isDefaultGroup }) => {
  const count = useTasksCount(isDefaultGroup, projectId, name);
  const [taskCount, setTaskCount] = useState(count);
  const params = useParams();
  useLayoutEffect(() => {
    setTaskCount(count);
  }, [count, params.isDefaultGroup]);
  return <div className={`task-count ${name == "Today" ? "task-count__red" : ""} `}>{taskCount > 0 && taskCount}</div>;
};
