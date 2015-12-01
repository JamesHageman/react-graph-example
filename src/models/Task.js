import { extendObservable } from 'mobservable';
import uniqueId from '../lib/uniqueId.js';

export default class Task {
  constructor({ x, y, name, id = uniqueId('task_') }) {
    const taskName = name ? name : id;
    extendObservable(this, {
      x,
      y,
      name: taskName
    });

    this.id = id;
  }
}
