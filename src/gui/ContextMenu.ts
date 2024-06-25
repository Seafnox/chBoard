import { vec, PointerButton } from 'excalibur';
import { GameEngine, GameEvent } from './GameEngine';
import { GameProperty } from './GameProperty';

// TODO Remove this
export class ContextMenuController {
  view: ContextMenuView;
  constructor(
    private engine: GameEngine,
  ) {
    this.view = new ContextMenuView(this.engine.canvas.parentElement as HTMLElement, this);
    this.engine.gameEvents.on(GameEvent.PointerDown, event => {
      if (event.button !== PointerButton.Right) {
        return;
      }

      const x = +this.engine.properties.get(GameProperty.PointerDownX)!;
      const y = +this.engine.properties.get(GameProperty.PointerDownY)!;
      this.view.show(x, y);
    });
  }

  addUnit() {
    const x = +this.engine.properties.get(GameProperty.WorldPointerDownX)!;
    const y = +this.engine.properties.get(GameProperty.WorldPointerDownY)!;

    this.engine.gameEvents.emit(GameEvent.AddUnit, vec(x, y));
    this.view.hide();
  }

  removeUnit() {
    const x = +this.engine.properties.get(GameProperty.WorldPointerDownX)!;
    const y = +this.engine.properties.get(GameProperty.WorldPointerDownY)!;

    this.engine.gameEvents.emit(GameEvent.RemoveUnit, vec(x, y));
    this.view.hide();
  }
}

export class ContextMenuView {
  menuContainer: HTMLElement = document.createElement(`div`);
  menuHeader: HTMLElement = document.createElement(`h3`);
  addUnitButton: HTMLElement = document.createElement(`button`);
  removeUnitButton: HTMLElement = document.createElement(`button`);
  constructor(
    private rootElement: HTMLElement,
    private controller: ContextMenuController,
  ) {
    this.menuContainer.id = 'menu';
    this.menuContainer.classList.add('menu', 'excalibur-scale', 'hide');
    this.menuHeader.innerText = 'Menu';
    this.addUnitButton.id = 'add-unit';
    this.addUnitButton.innerText = 'Add Unit';
    this.removeUnitButton.id = 'remove-unit';
    this.removeUnitButton.innerText = 'Remove Unit';

    this.rootElement.appendChild(this.menuContainer);
    this.menuContainer.appendChild(this.menuHeader);
    this.menuContainer.appendChild(this.addUnitButton);
    this.menuContainer.appendChild(this.removeUnitButton);

    this.addUnitButton.addEventListener('click', () => this.controller.addUnit());
    this.removeUnitButton.addEventListener('click', () => this.controller.removeUnit());
  }

  show(x: number, y: number) {
    this.menuContainer.classList.remove('hide');
    this.menuContainer.classList.add('show');
    this.menuContainer.style.left = `${x}px`;
    this.menuContainer.style.top = `${y}px`;
  }

  hide() {
    this.menuContainer.classList.remove('show');
    this.menuContainer.classList.add('hide');
  }
}
