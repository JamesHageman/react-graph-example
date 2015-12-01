import invariant from 'invariant';
import { extendObservable } from 'mobservable';
import Task from './Task';
import uniqueId from '../lib/uniqueId.js';

export default class Arrow {
  constructor({ fromTask, toTask, id = uniqueId('arrow_') }) {
    invariant(fromTask instanceof Task && toTask instanceof Task,
              'Arrow requires `to` and `from` to be Task instances.');
    invariant(fromTask !== toTask,
              '`fromTask` and `toTask` in Arrow Model must be unique.');
    extendObservable(this, {
      fromTask,
      toTask
    });

    this.id = id;
  }
}
