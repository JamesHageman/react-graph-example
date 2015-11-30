import React, { Component } from 'react';
import { observer } from 'mobservable-react';
import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Canvas from './Canvas.js';
import Graph from '../models/Graph.js';
import Arrow from './Arrow.js';
import TaskList from './TaskList.js';
import Task from './Task.js';

const { instanceOf } = React.PropTypes;

class App extends Component {
  static propTypes = {
    store: instanceOf(Graph)
  }

  constructor(props) {
    super(props);
  }

  handleCanvasClick = ({ x, y }) => {
    const { store } = this.props;
    store.addTask({ x, y });
  }

  render() {
    const { store } = this.props;
    return <div>
      <Canvas onClick={this.handleCanvasClick}>
        <svg width={640} height={480} style={{
          background: 'transparent'
        }}>
          {store.arrows.map(arrow => <Arrow key={arrow.id} arrow={arrow}/>)}
        </svg>

        {store.tasks.map(task =>
          <Task
            key={task.id}
            task={task}
            selected={store.selectedTask === task}
            onClick={e => {
              const { selectedTask } = store;
              if (selectedTask && selectedTask !== task && e.shiftKey) {
                // create an arrow
                store.addArrow(selectedTask, task);
                store.selectedTask = task;
                return;
              }

              store.selectedTask = task;
            }}/>
        )}
      </Canvas>
      <TaskList tasks={store.tasks}/>
    </div>;
  }
}

export default dragDropContext(HTML5Backend)(
  observer(App)
);
