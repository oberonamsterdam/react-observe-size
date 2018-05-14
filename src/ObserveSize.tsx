import * as React from 'react';
import { observeElementSize, unobserveElementSize, ObserverFn } from './observeElementSize';

export interface ObserveSizeProps {
    observerFn: ObserverFn,
    children?: React.ReactNode
}

class ObserveSize extends React.Component<ObserveSizeProps> {
    element?: HTMLElement;

    sizeRef = (el: HTMLDivElement | null) => {
        if (el) {
            observeElementSize(el, this.props.observerFn);
            this.element = el;
        }
    };

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
