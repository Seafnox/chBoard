import { ActionChangeType } from './ActionChangeType';
import {TargetActionChange} from "./TargetActionChange";

export interface MovingActionChange extends TargetActionChange {
  type: ActionChangeType.Move;
  to: string;
}
