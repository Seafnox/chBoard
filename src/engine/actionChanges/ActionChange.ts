import { ActionChangeType } from './ActionChangeType';

export interface ActionChange<TInteractiveEntity> {
  type: ActionChangeType;
  entity: TInteractiveEntity;
}

