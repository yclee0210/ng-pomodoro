import {Duration} from './duration';
import {PomodoroState} from '../_enums/pomodoro-state.enum';
import {StateObject} from './state-object';

export interface Pomodoro extends Duration, StateObject {
  id: number;
  taskId: number;
  pauses: Duration[];
  pomodoroState: PomodoroState;
}
