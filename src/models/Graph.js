import { extendObservable, transaction } from 'mobservable';
import Task from './Task.js';
import Arrow from './Arrow.js';

export default class Graph {
  constructor() {
    extendObservable(this, {
      tasks: [],
      arrows: [],
      selectedTask: null,
      windowDimensions: this.getWindowDimesions()
    });

    window.addEventListener('resize', () => {
      this.windowDimensions = this.getWindowDimesions();
    }, false);
  }

  getWindowDimesions() {
    return {
      width: window.innerWidth,
      height: window.innerHieght
    };
  }

  addTask = ({x, y, name = ''}) => {
    const task = new Task({ x, y, name });
    this.tasks.push(task);
    return task;
  }

  addArrow = (fromTask, toTask) => {
    if (fromTask === toTask) return fromTask;
    const arrow = new Arrow({fromTask, toTask});
    this.arrows.push(arrow);
    return arrow;
  }

  removeTask = (task) => transaction(() => {
    if (this.selectedTask === task) {
      this.selectedTask = null;
    }

    this.arrows = this.arrows.filter(arrow => {
      return arrow.fromTask !== task && arrow.toTask !== task;
    });

    this.tasks.remove(task);
  });
}
