import { vec, Color, Vector } from 'excalibur';
import { SystemActionEvent } from '../../events/SystemActionEvent';
import { SystemName } from '../../events/SystemName';
import { ButtonLabel } from '../ButtonLabel';
import { CircleButton } from '../CircleButton';

export interface CircleButtonConfig {
  systemName: SystemName;
  diameter: number;
  pos: Vector;
  onClick?: (event: SystemActionEvent<CircleButton>) => void;
}


export function buildCircleButton(config: CircleButtonConfig) {
  return new CircleButton({
    systemName: config.systemName,
    radius: config.diameter / 2,
    borderSize: config.diameter / 20,
    pos: config.pos,
    subNodes: [{
      graphic: new ButtonLabel({
        width: config.diameter,
        height: config.diameter,
        label: config.systemName,
      }),
      offset: vec(config.diameter / 2, config.diameter / 2.5),
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
