import React, { Component } from 'react';
import { observer } from 'mobservable-react';
import Canvas from './Canvas.js';
import Graph from '../models/Graph.js';
import Arrow from './Arrow.js';
import TaskList from './TaskList.js';
import Task from './Task.js';
import { findDOMNode } from 'react-dom';

const { instanceOf } = React.PropTypes;

class App extends Component {
  static propTypes = {
    store: instanceOf(Graph)
  }

  constructor(props) {
    super(props);
    this._canvas = null;
    this._unsub = () => {};
  }

  handleTaskDragStart = (task, mouseDownEv) => {
    const origin = {
      x: task.x - mouseDownEv.clientX,
      y: task.y - mouseDownEv.clientY
    };

    const handler = (mouseMoveEv) => {
      task.x = origin.x + mouseMoveEv.clientX;
      task.y = origin.y + mouseMoveEv.clientY;
    };

    document.addEventListener('mousemove', handler, false);

    this._unsub = () => {
      document.removeEventListener('mousemove', handler);
    };
  }

  handleTaskDragEnd = (task, e) => {
    e.stopPropagation();
    this._unsub();
  }

  handleTaskMouseMove = (task, { x, y }, e) => {
    const canvas = findDOMNode(this._canvas).getBoundingClientRect();
    task.x = e.clientX - canvas.left;
    task.y = e.clientY - canvas.top;
  }

  handleCanvasClick = ({ x, y }, e) => {
    const { store } = this.props;
    const newTask = store.addTask({ x, y });
    if (e.shiftKey && store.selectedTask) {
      store.addArrow(store.selectedTask, newTask);
      store.selectedTask = newTask;
    }
  }

  handleClickAway = () => {
    this.props.store.selectedTask = null;
  }

  render() {
    const { store } = this.props;
    return <div className="container">

      <div className="row">
        <div className="col-md-12">
          <h2>React Graph Example</h2>
          <ul className="list-unstyled">
            <li>Cmd-click or Alt-click on the canvas to add a task</li>
            <li>Shift click to join tasks with a line</li>
          </ul>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-8">

          <Canvas ref={canvas => {this._canvas = canvas;}}
            onClick={this.handleCanvasClick}
            onClickAway={this.handleClickAway}>

            <svg
              width={store.windowDimensions.width}
              height={480}
              style={{
                background: 'transparent'
              }}>
              <defs>
                <marker
                  id="arrow"
                  markerWidth="10"
                  markerHeight="10"
                  refx="0"
                  refy="3"
                  orient="auto"
                  markerUnits="strokeWidth">
                  <path d="M0,0 L0,6 L9,3 z" fill="#f00" />
                </marker>
              </defs>

              {store.arrows.map(arrow =>
                <Arrow key={arrow.id} arrow={arrow}
                  markerId="arrow"/>)}
            </svg>

            {store.tasks.map(task =>
              <Task
                key={task.id}
                task={task}
                selected={store.selectedTask === task}

                onDragStart={this.handleTaskDragStart.bind(this, task)}
                onDragEnd={this.handleTaskDragEnd.bind(this, task)}

                onClick={(e) => {
                  e.stopPropagation();
                  // const { selectedTask } = store;
                  // if (selectedTask && selectedTask !== task && e.shiftKey) {
                  //   // create an arrow
                  //   store.addArrow(selectedTask, task);
                  //   store.selectedTask = task;
                  //   return;
                  // }
                  const { selectedTask } = store;
                  if (selectedTask && e.shiftKey) {
                    store.addArrow(selectedTask, task);
                  }
                  store.selectedTask = task;
                }}
                onDeleteClick={() => {
                  store.removeTask(task);
                }}/>
            )}
          </Canvas>

        </div>

        <div className="col-sm-4">
          <TaskList tasks={store.tasks}/>
        </div>
      </div>

    </div>;
  }
}

export default observer(App);
