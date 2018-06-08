import * as React from 'react';
import {
    observeElementSize,
    unobserveElementSize,
    ObserverFn,
    ContentRect, createContentRect,
} from './observeElementSize';

export interface ObserveSizeProps {
    observerFn?: ObserverFn,
    children?: React.ReactNode | ((contentRect: ContentRect) => React.ReactNode),
    defaults?: Partial<ContentRect>,
}

export interface State {
    contentRect?: ContentRect;
}

class ObserveSize extends React.Component<ObserveSizeProps, State> {
    element?: HTMLElement;
    state: State = {};

    sizeRef = (el: HTMLDivElement | null) => {
        if (el) {
            observeElementSize(el, contentRect => {
                if (typeof this.props.observerFn === 'function') {
                    this.props.observerFn(contentRect);
                }
                if (typeof this.props.children === 'function') {
                    this.setState({contentRect})
                }
            });
            this.element = el;
        }
    };

    componentWillUnmount () {
        if (this.element) {
            unobserveElementSize(this.element);
        }
    }

    render () {
        const contentRect = this.state.contentRect ||
            {...createContentRect(), ...(this.props.defaults || {})};

        return (
            <div ref={this.sizeRef}>
                {typeof this.props.children === 'function'
                    ? contentRect && this.props.children(contentRect)
                    : this.props.children
                }
            </div>
        );
    }
}

export default ObserveSize;
