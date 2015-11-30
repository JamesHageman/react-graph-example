import { extendObservable } from 'mobservable';
import uniqueId from '../lib/uniqueId.js';

export default class Task {
  constructor({ x, y, name, id = uniqueId('task_') }) {
    extendObservable(this, {
      x,
      y,
      name
    });

    this.id = id;
  }
}
