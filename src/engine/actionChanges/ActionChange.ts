import { ActionChangeType } from './ActionChangeType';

export interface ActionChange {
  type: ActionChangeType;
  sourceId: string;
}

