import { EventEmitter } from 'events';

export default class RouteChangeEvent extends EventEmitter {
  private static Instance: RouteChangeEvent;

  private constructor() {
    super();
  }

  static GetInstance() {
    if (!this.Instance) {
      this.Instance = new RouteChangeEvent();
      return this.Instance;
    } else {
      return this.Instance;
    }
  }
}
