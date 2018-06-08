# react-observe-size
Observe element size in React. Get the size of an element and updates whenever it changes. 

## Motivation
Components need to be able to respond to their render width, rendering differently based on the 
available space and updating when it changes. Layout changes can have many causes, such as window resizing, device 
orientation changes, CSS state changes or JavaScript events. 

The [Resize Observer](https://wicg.github.io/ResizeObserver/) spec will solve this problem. react-observe-size uses
[resize-observer-polyfill](https://github.com/que-etc/resize-observer-polyfill) and provides an easy to use interface
for React components.

## Installation

`npm install react-observe-size`

or

`yarn add react-observe-size`


## Usage

```jsx
import React from 'react';
import ObserveSize from 'react-observe-size';

const MyComponent = () =>
    <ObserveSize>
        {({ width }) =>
            <div style={width < 600 ? styles.small : styles.large}>...</div>
        }
    </ObserveSize>

const styles = {
    small: {
        // ...
    },
    large: {
        // ...
    }
}
```

OR if you need the dimensions outside of your render method:

```jsx
import React from 'react';
import ObserveSize from 'react-observe-size';

class MyComponent extends Component {
    updateDimensions = (width, height) => {
        // ...
    };
    
    render() {
        const { renderWidth } = this.state
        return (
            <ObserveSize observerFn={(contentRect) => { this.updateDimensions(contentRect.width, contentRect.height); }}>
                <div>...</div>
            </ObserveSize>
        )
    }
}
```

You can also combine the two examples above if you need both use cases.

Note: on the first render there is no layout yet so the contentRect will have its values set to 0. You can define defaults
using the `defaults` prop to set values for the first render or you can choose to not render the first frame by checking
the values for 0::

Use defaults for first frame:
```jsx
<ObserveSize defaults={{width: 1000}}>
    {({ width }) => width > 0 &&
        <div>...</div>
    }
</ObserveSize>
```

Don't render first frame: 
```jsx
<ObserveSize>
    {({ width }) => width > 0 &&
        <div>...</div>
    }
</ObserveSize>
```

## API

### `<ObserveSize />`
Renders a `div` element that gets a resize observer. Will unbind observer on unmount.

| Property | Type | Required | Description |
|:---------|:-----|:---------|:------------|
| observerFn | [ObserverFn](#observerfn) | no | Callback function that gets called on first render and on every layout change |
| children | `Node` or `function (contentRect:` [ContentRect](#contentrect)`) => Node` | no | The children of the div element that gets monitored |
| defaults | `Partial<`[ContentRect](#contentrect)`>` | Define defaults for first render. Can be useful for server-side rendering or to prevent flashes of first frame |

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

