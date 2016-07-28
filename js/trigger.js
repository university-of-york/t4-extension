// Trigger event in parent window (if loaded in iframe)
// iFrame window doesn't have access to window.parent :(

(function () {

  if (window.parent != window.top) {

    // We're deeper than one down - create custom event
    var event = new Event('frameLoaded');

    // Dispatch the event.
    window.parent.dispatchEvent(event);

  }

})();