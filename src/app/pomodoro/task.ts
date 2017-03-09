import {Duration} from './duration';
import {TaskState} from './task-state.enum';
/**
 * Created by yclee on 09/03/2017.
 */

export class Task {
  name: string;
  duration: Duration;
  pauses: Duration[];
  state: TaskState;

  constructor(name: string) {
    this.name = name;
    this.duration = {
      start: null,
      end: null
    };
    this.pauses = [];
    this.state = TaskState.UNTOUCHED;
  }
}
