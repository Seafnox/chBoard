import {ActionChangeDto} from "./ActionChangeDto";

export interface ActionDto {
  id: string;
  priority: number;
  isActive: boolean;
  isAvailable: boolean;
  changes: ActionChangeDto[];
}
