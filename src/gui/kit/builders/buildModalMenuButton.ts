import { Actor, Vector } from 'excalibur';
import { SystemActionEvent } from '../../events/SystemActionEvent';
import { SystemName } from '../../events/SystemName';
import { RoundedButton } from '../RoundedButton';
import { buildRoundedButton } from './buildRoundedButton';

export function buildModalMenuButton(
  position: Vector,
  width: number,
  label: SystemName,
  onClick: (event: SystemActionEvent<RoundedButton>) => void
): Actor {
  const height = 100;

  return buildRoundedButton({
    systemName: label,
    width,
    height,
    pos: position,
    onClick,
  });
}
