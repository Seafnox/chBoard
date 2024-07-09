// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type EventMap = Record<string, any>;
export type EventKey<T extends EventMap> = string & keyof T;
export type Handler<EventType> = (event: EventType) => void;
/**
 * Interface that represents a handle to a subscription that can be closed
 */
export interface Subscription {
  close(): void;
}

export class EventEmitter<TEventMap extends EventMap = EventMap> {
  private _paused = false;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _listeners: Partial<Record<EventKey<TEventMap>, Handler<any>[]>> = {};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _listenersOnce: Partial<Record<EventKey<TEventMap>, Handler<any>[]>> = {};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _pipes: EventEmitter<any>[] = [];

  clear(): void {
    this._listeners = {};
    this._listenersOnce = {};
    this._pipes = [];
  }

  private listeners<TEventName extends EventKey<TEventMap>>(eventName: TEventName): Handler<TEventMap[TEventName]>[] {
    this._listeners[eventName] = this._listeners[eventName] || [];

    return this._listeners[eventName]!;
  }

  private listenerOnces<TEventName extends EventKey<TEventMap>>(eventName: TEventName): Handler<TEventMap[TEventName]>[] {
    this._listenersOnce[eventName] = this._listenersOnce[eventName] || [];

    return this._listenersOnce[eventName]!;
  }

  on<TEventName extends EventKey<TEventMap>>(eventName: TEventName, handler: Handler<TEventMap[TEventName]>): Subscription {
    this.listeners(eventName).push(handler);

    return {
      close: () => this.off(eventName, handler)
    };
  }

  once<TEventName extends EventKey<TEventMap>>(eventName: TEventName, handler: Handler<TEventMap[TEventName]>): Subscription {
    this.listenerOnces(eventName).push(handler);

    return {
      close: () => this.off(eventName, handler)
    };
  }

  off<TEventName extends EventKey<TEventMap>>(eventName: TEventName, handler?: Handler<TEventMap[TEventName]>): void {
    if (!handler) {
      this._listeners[eventName] = [];
      this._listenersOnce[eventName] = [];
      return;
    }

    this._listeners[eventName] = this.listeners(eventName).filter(h => h !== handler);
    this._listenersOnce[eventName] = this.listenerOnces(eventName).filter(h => h !== handler);
  }

  emit<TEventName extends EventKey<TEventMap>>(eventName: TEventName, event: TEventMap[TEventName]): void {
    if (this._paused) {
      return;
    }

    this.listeners(eventName).forEach((fn) => fn(event));
    this.listenerOnces(eventName).forEach((fn) => fn(event));
    this._listenersOnce[eventName] = [];

    this._pipes.forEach((pipe) => {
      pipe.emit(eventName, event);
    });
  }

  pipe<TOtherEventMap extends EventMap = EventMap>(emitter: EventEmitter<TOtherEventMap>): Subscription {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (this === emitter) {
      throw Error('Cannot pipe to self');
    }

    this._pipes.push(emitter);

    return {
      close: () => this.unpipe(emitter),
    };
  }

  unpipe<TOtherEventMap extends EventMap = EventMap>(emitter: EventEmitter<TOtherEventMap>): void {
    const i = this._pipes.indexOf(emitter);
    if (i > -1) {
      this._pipes.splice(i, 1);
    }
  }

  pause() {
    this._paused = true;
  }

  unpause() {
    this._paused = false;
  }
}
//# sourceMappingURL=EventEmitter.js.map
