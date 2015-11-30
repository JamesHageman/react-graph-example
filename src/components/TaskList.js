import React from 'react';
import { observer } from 'mobservable-react';
import TaskItem from './TaskItem.js';

const TaskList = ({tasks}) => {
  return <ul>
    {tasks.map(task => <TaskItem key={task.id} task={task}/>)}
  </ul>;
};

export default observer(TaskList);
