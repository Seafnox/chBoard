import { ActionChangeType } from './ActionChangeType';
import {TargetActionChange} from "./TargetActionChange";

export interface AddActionChange extends TargetActionChange {
  type: ActionChangeType.Add;
  to: string;
}
