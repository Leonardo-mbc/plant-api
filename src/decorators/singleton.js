export function singleton(ctor) {
  let instance;
  Object.defineProperty(ctor, "instance", {
    get() {
      if (!instance) {
        instance = new ctor();
      }
      return instance;
    }
  });
}
