import { ScreenElement, vec, Color, Rectangle, Actor, GraphicsGroup, Vector, BoundingBox } from 'excalibur';
import { SystemName } from '../events/SystemName';
import { GameEngine } from '../GameEngine';

export interface ModalWindowConfig {
  systemName: SystemName;
  width: number;
  height: number;
  onClose?: () => void;
  onOpen?: () => void;
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
  private subNodes: Actor[] = [];

  private isPointerDownHere = false;

  constructor(
    private engine: GameEngine,
    private config: ModalWindowConfig,
  ) {
    super({
      name: `Modal_${config.systemName}`,
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
    this.subNodes.forEach(actor => {
      this.engine.add(actor);
    });

    const modalBoundingVectors = this.contentBorder.localBounds.getPoints().map(point => point.add(this.getContentBorderOffset()));
    const modalBounding = BoundingBox.fromPoints(modalBoundingVectors);

    this.on('pointerup', event => {
      if (!this.isPointerDownHere) {
        return;
      }
      this.isPointerDownHere = false;

      if (!modalBounding.contains(event.worldPos)) {
        this.close();
      }
    });

    this.on('pointerdown', () => {
      this.isPointerDownHere = true;
    })
  }

  onPreKill() {
    this.subNodes.forEach(actor => {
      this.engine.remove(actor);
    });
  }

  open() {
    this.engine.add(this);
    this.config.onOpen && this.config.onOpen();
  }

  close() {
    this.kill();
    this.config.onClose && this.config.onClose();
  }

  addEntity(entity: Actor, offset: Vector = vec(0, 0)): this {
    entity.pos = vec(
      this.engine.screen.drawWidth/2 + offset.x,
      (this.engine.screen.drawHeight - this.config.height) / 2 + this.contentBorderSize + offset.y
    );
    this.subNodes.push(entity);

    return this;
  }

  private getContentBorderOffset(): Vector {
    return vec(
      (this.engine.screen.drawWidth - this.config.width) / 2,
      (this.engine.screen.drawHeight - this.config.height) / 2
    );
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
          offset: this.getContentBorderOffset(),
        },
        {
          graphic: this.contentWrapper,
          offset: this.getContentBorderOffset().add(vec(this.contentBorderSize, this.contentBorderSize)),
        },
      ]
    });

  }
}
