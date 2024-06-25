import { ScreenElement, vec, Color, Rectangle, Actor, GraphicsGroup, Vector } from 'excalibur';
import { GameEngine } from '../GameEngine';

export interface ModalWindowConfig {
  width: number;
  height: number;
  onClose?: () => void;
}

export class ModalWindow extends ScreenElement {
  private graphicState = 'root';
  private backStageBackground = Color.fromHex('00000099');
  private backStage: Rectangle;
  private contentBorderBackground: Color = Color.fromHex('6f6f6f');
  private contentBorderSize = 5;
  private contentBorder: Rectangle;
  private contentWrapperBackground: Color = Color.fromHex('f0f0f0');
  private contentWrapper: Rectangle;
  private actors: Actor[] = [];

  constructor(
    private engine: GameEngine,
    private config: ModalWindowConfig,
  ) {
    super({
      name: 'ModalWindow',
      width: engine.screen.drawWidth,
      height: engine.screen.drawHeight,
      pos: vec(0, 0),
    });

    this.backStage = new Rectangle({
      width: engine.screen.drawWidth,
      height: engine.screen.drawHeight,
      color: this.backStageBackground,
      strokeColor: this.backStageBackground,
    });

    this.contentBorder = new Rectangle({
      width: this.config.width,
      height: this.config.height,
      color: this.contentBorderBackground,
    });

    this.contentWrapper = new Rectangle({
      width: this.config.width - this.contentBorderSize * 2,
      height: this.config.height - this.contentBorderSize * 2,
      color: this.contentWrapperBackground,
    });

    this.graphics.add(this.graphicState, this.generateWindow());
    this.graphics.use(this.graphicState);
  }

  onInitialize() {
    this.actors.forEach(actor => {
      this.engine.add(actor);
    });
  }

  onPreKill() {
    this.actors.forEach(actor => {
      this.engine.remove(actor);
    });

    this.config.onClose && this.config.onClose();
  }

  addEntity(entity: Actor, offset: Vector = vec(0, 0)): this {
    entity.pos = vec(
      this.engine.screen.drawWidth/2 + offset.x,
      (this.engine.screen.drawHeight - this.config.height) / 2 + this.contentBorderSize + offset.y
    );
    this.actors.push(entity);

    return this;
  }

  private generateWindow(): GraphicsGroup {
    return new GraphicsGroup({
      members: [
        {
          graphic: this.backStage,
          offset: vec(0, 0),
        },
        {
          graphic: this.contentBorder,
          offset: vec(
            (this.engine.screen.drawWidth - this.config.width) / 2,
            (this.engine.screen.drawHeight - this.config.height) / 2
          ),
        },
        {
          graphic: this.contentWrapper,
          offset: vec(
            (this.engine.screen.drawWidth - this.config.width) / 2 + this.contentBorderSize,
            (this.engine.screen.drawHeight - this.config.height) / 2 + this.contentBorderSize
          ),
        },
      ]
    });

  }
}
