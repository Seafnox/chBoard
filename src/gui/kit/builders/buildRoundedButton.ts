import { Actor, vec, Color, Vector } from 'excalibur';
import { SystemActionEvent } from '../../events/SystemActionEvent';
import { SystemName } from '../../events/SystemName';
import { ButtonLabel } from '../ButtonLabel';
import { RoundedButton } from '../RoundedButton';

export interface CommonButtonConfig {
  systemName: SystemName;
  width: number;
  height: number;
  pos: Vector;
  onClick?: (event: SystemActionEvent<RoundedButton>) => void;
}

export function buildRoundedButton(config: CommonButtonConfig): Actor {
  return new RoundedButton({
    systemName: config.systemName,
    width: config.width,
    height: config.height,
    radius: config.height / 10,
    pos: config.pos,
    subNodes: [{
      graphic: new ButtonLabel({
        width: config.width,
        height: config.height,
        label: config.systemName,
      }),
      offset: vec(config.width / 2, config.height / 2),
    }],
    idleBackground: Color.Cyan,
    idleBorder: Color.Black,
    hoverBackground: Color.Blue,
    hoverBorder: Color.Black,
    pressedBackground: Color.Magenta,
    pressedBorder: Color.Black,
    onClick: config.onClick,
  });
}
