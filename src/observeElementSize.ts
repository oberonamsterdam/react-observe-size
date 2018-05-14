import ResizeObserver from 'resize-observer-polyfill';

export interface ContentRect {
    width: number,
    height: number,
    bottom: number,
    top: number,
    left: number,
    right: number
}

export type ObserverFn = (contentRect: ContentRect) => void;

const observers = new Map();

// Observe the size of an element. The observer function gets called with the ContentRect immediately and whenever the
// size of the element changes, using ResizeObserver. Supports only one observer per element.
export const observeElementSize = (element: HTMLElement, observerFn: ObserverFn) => {
    const observer = new ResizeObserver(entries => {
        if (entries.length === 1) {
            observerFn(entries[0].contentRect);
        }
    });
    observers.set(element, observer);
    observer.observe(element);
};

// Remove size observer from element.
export const unobserveElementSize = (element: HTMLElement) => {
    const observer = observers.get(element);
    if (observer) {
        observer.disconnect();
        observers.delete(element);
    }
};
