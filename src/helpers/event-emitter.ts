type Listener = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  cb: Function;
  id: string;
};

type ListenerInfo = {
  [key: string]: Listener[];
};

class EventEmitter {
  listeners: ListenerInfo = {};

  private off(event: string, listenerId: string) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(
        (listener) => listener.id !== listenerId,
      );
    }
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  on(event: string, listener: Function) {
    const id = Math.random().toString(36).substr(2, 9);

    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push({ cb: listener, id });

    return () => {
      this.off(event, id);
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emit(event: string, data: any) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((listener) => {
        listener.cb(data);
      });
    }
  }
}

export default EventEmitter;
