import {StateObject} from './state-object';
import {TaskState} from '../_enums/task-state.enum';
import {Pomodoro} from './pomodoro';
import {Duration} from './duration';

export interface Task extends Duration, StateObject {
  id: number;
  name: string;
  pomodoros: Pomodoro[];
  taskState: TaskState
}
