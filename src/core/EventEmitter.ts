type AnyFunction = (...args: any[]) => any;
type NoArguments = undefined | null | void | never;
type EventMap = Record<string, any>;
type EventKey<T extends EventMap> = string & keyof T;
type EventCallback<T extends EventMap, K extends EventKey<T>>
  = T[K] extends NoArguments
    ? () => any
    : T[K] extends AnyFunction
      ? T[K]
      : (event: T[K]) => any;

class EventEmitter<T extends EventMap> {
  private _listenerMap: {
    [keys: string]: Array<EventCallback<T, EventKey<T>>>,
  };

  constructor() {
    this._listenerMap = {};
  }

  public on<K extends EventKey<T>>(eventName: K, callback: EventCallback<T, K>): this {
    const listenerMap = this._listenerMap;
    const listeners = listenerMap[eventName];

    if (listeners && listeners.indexOf(callback) < 0) {
      listeners.push(callback);
    } else {
      listenerMap[eventName] = [callback];
    }
    return this;
  }

  public off<K extends EventKey<T>>(eventName: K, callback?: EventCallback<T, K>): this {
    const listenerMap = this._listenerMap;
    const listeners = listenerMap[eventName];

    if (!callback) {
      delete listenerMap[eventName];
    } else if (listeners) {
      const callbackIdx = listeners.indexOf(callback);
      if (callbackIdx >= 0) {
        listeners.splice(callbackIdx, 1);
      }
    }

    return this;
  }

  public trigger<K extends EventKey<T>>(
    eventName: K,
    ...event: T[K] extends NoArguments ? void[] : T[K] extends AnyFunction ? Parameters<T[K]> : [T[K]]
  ): this {
    const listeners = this._listenerMap[eventName];

    if (listeners) {
      listeners.forEach(callback => {
        callback(...event);
      });
    }

    return this;
  }
}

export default EventEmitter;
