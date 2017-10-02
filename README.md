# react-observe-size
Observe element size in React. Get the size of an element and updates whenever it changes. 

## Motivation
Components need to be able to respond to their render width, rendering differently based on the 
available space and updating when it changes. Layout changes can have many causes, such as window resizing, device 
orientation changes, CSS state changes or JavaScript events. 

The [Resize Observer](https://wicg.github.io/ResizeObserver/) spec will solve this problem. react-observe-resize uses
[resize-observer-polyfill](https://github.com/que-etc/resize-observer-polyfill) and provides an easy to use interface
for React components.

## Installation

`npm install react-resize-observer`

or

`yarn add react-resize-observer`


## Usage

```jsx
import React from 'react';
import ObserveSize from 'react-observe-size';

class MyComponent extends Component {
    state = {
        renderWidth: window.innerWidth // an initial guess
    };
    
    render() {
        const { renderWidth } = this.state
        return (
            <ObserveSize observerFn={(layout) => { this.setState({renderWidth: layout.width}) }}>
                <div style={renderWidth < 600 ? styles.small : styles.large}>...</div>    
            </ObserveSize>
        )
    }
}

const styles = {
    small: {
        // ...
    },
    large: {
        // ...
    }
}
```

## API

### `<ObserveSize />`
Renders a `div` element that gets a resize observer. Will unbind observer on unmount.

| Property | Type | Required | Description |
|:---------|:-----|:---------|:------------|
| observerFn | [ObserverFn](#observerfn) | yes | Callback function that gets called on first render and on every layout change |
| children | Node | no | The children of the div element that gets monitored |

### `ObserverFn`
`function (contentRect: `[ContentRect](#contentrect)`)`

Callback function for the observer.

### `ContentRect`

| Property | Type |
|:---------|:-----|
| width | number |
| height | number |
| bottom | number |
| top | number |
| left | number |
| right | number |

