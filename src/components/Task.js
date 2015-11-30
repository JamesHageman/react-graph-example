import React, { Component } from 'react';
import { observer } from 'mobservable-react';
import TaskModel from '../models/Task.js';

const { func, bool, instanceOf } = React.PropTypes;

class Task extends Component {
  static propTypes = {
    task: instanceOf(TaskModel).isRequired,
    selected: bool,
    onClick: func.isRequired,

    // from react-dnd
    connectDragSource: func
  }

  constructor(props) {
    super(props);
    this._listener = null;
  }

  mouseMoveHandler = ({ x, y }, e) => {
    const { task } = this.props;

    task.x = e.clientX - x;
    task.y = e.clientY - y;
  }

  handleMouseDown = (e) => {
    this._listener = this.mouseMoveHandler.bind(this, {
      x: e.nativeEvent.layerX,
      y: e.nativeEvent.layerY
    });

    this.props.onClick(e);

    document.addEventListener('mousemove', this._listener, false);
  }

  handleMouseUp = () => {
    document.removeEventListener('mousemove', this._listener);
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
