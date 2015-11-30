import React, { Component } from 'react';
import { observer } from 'mobservable-react';
import TaskModel from '../models/Task.js';
import { findDOMNode } from 'react-dom';

const { func, bool, instanceOf } = React.PropTypes;

class Task extends Component {
  static propTypes = {
    task: instanceOf(TaskModel).isRequired,
    selected: bool,
    onClick: func.isRequired,
    onMouseMove: func.isRequired
  }

  constructor(props) {
    super(props);
    this._listener = null;
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  handleMouseDown = (e) => {
    const rect = findDOMNode(this.refs.task).getBoundingClientRect();
    this._listener = this.props.onMouseMove.bind(this, {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });

    this.props.onClick(e);

    document.addEventListener('mousemove', this._listener, false);
    document.addEventListener('mouseup', this._unsubscribe, false);
  }

  _unsubscribe = () => {
    document.removeEventListener('mousemove', this._listener);
    document.removeEventListener('mouseup', this._unsubscribe);
  }

  handleMouseUp = (e) => {
    document.removeEventListener('mousemove', this._listener);
    e.stopPropagation();
  }

  render() {
    const {
      task,
      selected
    } = this.props;

    return <div
      style={{
        position: 'absolute',
        background: '#fff',
        border: selected ? '2px solid #000'
          : '1px solid #ccc',
        padding: 10,
        top: task.y,
        left: task.x,
        transform: 'translate(-50%, -50%)'
      }}
      ref="task"
      onMouseDown={this.handleMouseDown}
      onMouseUp={this.handleMouseUp}>
      <input
        type="text"
        value={task.name}
        onChange={e => {
          task.name = e.target.value;
        }}/>
    </div>;
  }
}

export default observer(Task);
