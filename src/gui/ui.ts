
import { Actor, Color, Scene, Vector, vec } from "excalibur";
import { IdleUnitAnimation } from './PrepareSprites';

export const calculateExPixelConversion = (screen: ex.Screen) => {
  const origin = screen.worldToPageCoordinates(Vector.Zero);
  const singlePixel = screen.worldToPageCoordinates(vec(1, 0)).sub(origin);
  const pixelConversion = singlePixel.x;
  document.documentElement.style.setProperty('--pixel-conversion', pixelConversion.toString());
}

export class ContextMenuMVC {
  menuContainer: HTMLElement = document.createElement(`div`);
  menuHeader: HTMLElement = document.createElement(`h3`);
  addUnitButton: HTMLElement = document.createElement(`button`);
  removeUnitButton: HTMLElement = document.createElement(`button`);
  currentWorldPos: Vector = vec(0, 0);
  constructor(
    public rootElement: HTMLElement,
    public scene: Scene
  ) {
    scene.input.pointers.on('down', (evt) => {
      this.show();
      this.currentWorldPos = scene.engine.screen.pageToWorldCoordinates(vec(evt.pagePos.x, evt.pagePos.y));
      document.documentElement.style.setProperty('--pointer-x', evt.pagePos.x.toString() + 'px');
      document.documentElement.style.setProperty('--pointer-y', evt.pagePos.y.toString() + 'px');
    });

    this.menuContainer.id = 'menu';
    this.menuContainer.classList.add('menu','excalibur-scale','hide');
    this.menuHeader.innerText = 'Menu';
    this.addUnitButton.id = 'add-unit';
    this.addUnitButton.innerText = 'Add Unit';
    this.removeUnitButton.id = 'remove-unit';
    this.removeUnitButton.innerText = 'Remove Unit';

    this.rootElement.appendChild(this.menuContainer);
    this.menuContainer.appendChild(this.menuHeader);
    this.menuContainer.appendChild(this.addUnitButton);
    this.menuContainer.appendChild(this.removeUnitButton);

    this.addUnitButton.addEventListener('click', () => this.addUnit());
    this.removeUnitButton.addEventListener('click', () =>this.removeUnit());
  }

  addUnit() {
    const actor = new Actor({
      pos: this.currentWorldPos,
      scale: vec(2, 2),
      color: Color.Red
    });
    actor.graphics.use(IdleUnitAnimation);
    this.scene.add(actor);
    this.hide();
  }

  removeUnit() {
    for (let actor of this.scene.actors) {
      if (actor.graphics.bounds.contains(this.currentWorldPos)) {
        actor.kill();
      }
    }
    this.hide();
  }

  show() {
    this.menuContainer.classList.remove('hide');
    this.menuContainer.classList.add('show');
  }

  hide() {
    this.menuContainer.classList.remove('show');
    this.menuContainer.classList.add('hide');
  }
}
