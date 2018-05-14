"use strict";
exports.__esModule = true;
var resize_observer_polyfill_1 = require("resize-observer-polyfill");
var observers = new Map();
// Observe the size of an element. The observer function gets called with the ContentRect immediately and whenever the
// size of the element changes, using ResizeObserver. Supports only one observer per element.
exports.observeElementSize = function (element, observerFn) {
    var observer = new resize_observer_polyfill_1["default"](function (entries) {
        if (entries.length === 1) {
            observerFn(entries[0].contentRect);
        }
    });
    observers.set(element, observer);
    observer.observe(element);
};
// Remove size observer from element.
exports.unobserveElementSize = function (element) {
    var observer = observers.get(element);
    if (observer) {
        observer.disconnect();
        observers["delete"](element);
    }
};
