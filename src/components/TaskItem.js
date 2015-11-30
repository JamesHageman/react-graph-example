import React from 'react';
import { observer } from 'mobservable-react';

const TaskItem = ({task}) => {
  return <li>{task.name}</li>;
};

export default observer(TaskItem);
