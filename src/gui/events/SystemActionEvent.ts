import { SystemName } from './SystemName';

export interface SystemActionEvent<T> {
  systemName: SystemName;
  source: T;
}
