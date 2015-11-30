import invariant from 'invariant';
import { extendObservable } from 'mobservable';
import Task from './Task';
import uniqueId from '../lib/uniqueId.js';

export default class Arrow {
  constructor({ from, to, id = uniqueId('arrow_') }) {
    invariant(from instanceof Task && to instanceof Task,
              'Arrow requires `to` and `from` to be Task instances.');
    extendObservable(this, {
      from,
      to
    });

    this.id = id;
  }
}
