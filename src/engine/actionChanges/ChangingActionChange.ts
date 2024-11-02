import { ActionChangeType } from './ActionChangeType';
import {TargetActionChange} from "./TargetActionChange";

export interface ChangingActionChange extends TargetActionChange {
  type: ActionChangeType.Change;
  update: (targetId: string) => void;
}
