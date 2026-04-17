export class Dispatcher {
  constructor() {
    this.callbacks = [];
  }

  register(callback) {
    this.callbacks.push(callback);
    return () => {
      this.callbacks = this.callbacks.filter((cb) => cb !== callback);
    };
  }

  dispatch(action) {
    this.callbacks.forEach((cb) => cb(action));
  }
}

export const dispatcher = new Dispatcher();
