import { Actor, vec, Vector } from 'excalibur';
import { SystemActionEvent } from '../../events/SystemActionEvent';
import { SystemName } from '../../events/SystemName';
import { RoundedButton } from '../RoundedButton';
import { buildRoundedButton } from './buildRoundedButton';

export function buildMainMenuButton(
  screenCenter: Vector,
  offsetY: number,
  label: SystemName,
  onClick: (event: SystemActionEvent<RoundedButton>) => void
): Actor {
  const width = 400;
  const height = 100;

  return buildRoundedButton({
    systemName: label,
    width,
    height,
    pos: vec(screenCenter.x, offsetY),
    onClick,
  });
}
