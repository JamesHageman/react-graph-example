import React, { Component } from 'react';
import { observer } from 'mobservable-react';
import TaskModel from '../models/Task.js';

const { func, bool, instanceOf } = React.PropTypes;

class Task extends Component {
  static propTypes = {
    task: instanceOf(TaskModel).isRequired,
    selected: bool,
    onClick: func.isRequired,
    onDragStart: func.isRequired,
    onDragEnd: func.isRequired,
    onDeleteClick: func.isRequired
  }

  constructor(props) {
    super(props);
  }

  handleDragHandleMouseUp = (e) => {
    this.props.onDragEnd(e);
  }

  render() {
    const {
      task,
      selected
    } = this.props;

    return <div
      style={{
        position: 'absolute',
        display: 'flex',
        background: '#fff',
        border: selected ? '2px solid #000'
          : '1px solid #ccc',
        padding: 10,
        top: task.y,
        left: task.x,
        transform: 'translate(-50%, -50%)'
      }}
      onClick={this.props.onClick}>
      <div
        style={{
          backgroundColor: '#aaa',
          width: 24,
          height: 24,
          marginRight: 10
        }}
        onMouseDown={this.props.onDragStart}
        onMouseUp={this.handleDragHandleMouseUp}
        />
      <input
        style={{
          flex: 1,
          alignSelf: 'center',
          border: 'none'
        }}
        type="text"
        value={task.name}
        onChange={e => {
          task.name = e.target.value;
        }}/>
      <small>
        <a onClick={this.props.onDeleteClick}>x</a>
      </small>
    </div>;
  }
}

export default observer(Task);
