// @flow
import React, { Component, type Node } from 'react';
import { observeElementSize, unobserveElementSize } from './observeElementSize';
import type { ObserverFn } from './observeElementSize';

type ObserveSizeProps = {
    observerFn: ObserverFn,
    children?: Node
}

class ObserveSize extends Component<ObserveSizeProps> {
    element: ?HTMLElement

    sizeRef = (el: ?HTMLElement) => {
        if (el) {
            observeElementSize(el, this.props.observerFn);
            this.element = el;
        }
    }

    componentWillUnmount () {
        if (this.element) {
            unobserveElementSize(this.element);
        }
    }

    render () {
        return (
            <div ref={this.sizeRef}>
                {this.props.children}
            </div>
        );
    }
}

export default ObserveSize;
