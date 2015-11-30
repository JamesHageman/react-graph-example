import { extendObservable } from 'mobservable';
import Task from './Task.js';
import Arrow from './Arrow.js';

export default class Graph {
  constructor() {
    extendObservable(this, {
      tasks: [],
      arrows: [],
      selectedTask: null
    });
  }

  addTask = ({x, y, name = ''}) => {
    this.tasks.push(new Task({ x, y, name }));
  }

  addArrow = (from, to) => {
    this.arrows.push(new Arrow({from, to}));
  }
}
