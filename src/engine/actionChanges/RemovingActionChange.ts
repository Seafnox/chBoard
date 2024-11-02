import { ActionChangeType } from './ActionChangeType';
import {TargetActionChange} from "./TargetActionChange";

export interface RemovingActionChange extends TargetActionChange {
  type: ActionChangeType.Remove;
}
