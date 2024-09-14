import { Actor, Vector } from 'excalibur';
import { SystemActionEvent } from '../../events/SystemActionEvent';
import { SystemName } from '../../events/SystemName';
import { CircleButton } from '../CircleButton';
import { buildCircleButton } from './buildCircleButton';

export function buildIconButton(
  position: Vector,
  label: SystemName,
  onClick: (event: SystemActionEvent<CircleButton>) => void
): Actor {
  const diameter = 100;

  return buildCircleButton({
    systemName: label,
    diameter,
    pos: position,
    onClick,
  });
}
