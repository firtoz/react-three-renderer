class EventDispatcher {
  dispatchEvent(threeObject, eventName, ...params) {
    const eventCallbacks = threeObject.userData._eventCallbacks;
    const callback = eventCallbacks && eventCallbacks[eventName];

    if (callback) {
      callback(...params);
    }
  }
}

module.exports = EventDispatcher;
