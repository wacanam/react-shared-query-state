# React Shared Query State

[![Build Status](https://img.shields.io/travis/wacanam/react-shared-query-state-2.svg)](https://travis-ci.org/wacanam/react-shared-query-state-2)
[![npm version](https://img.shields.io/npm/v/react-shared-query-state-2.svg)](https://www.npmjs.com/package/react-shared-query-state-2)
[![License](https://img.shields.io/npm/l/react-shared-query-state-2.svg)](https://github.com/wacanam/react-shared-query-state-2/blob/master/LICENSE)

A lightweight library for managing shared query state in React applications.

## Features

- Easily manage and synchronize query state across multiple components.
- Simple API for setting, getting, and observing query state changes.
- Works seamlessly with React's component lifecycle and hooks.

## Installation

Install the package using npm:
```bash
npm install react-shared-query-state-2
```

Install the package using yarn:
```bash
yarn add react-shared-query-state-2
```

## Usage

```jsx
import React from'react';
import { useSharedQueryParamState } from'react-shared-query-state-2';

const App = () => {
    const [state, setState] = useSharedQueryParamState("state", 0);

    return (
        <div>
            <h1>Query State: {state}</h1>
            <button onClick={() => setState(state + 1)}>Increment</button>
        </div>
    );
}

export default App;
```

## API

### `useSharedQueryParamState(key, initialValue)`
A custom hook for managing shared query state.

#### Arguments
1. `key` (_
    string_): The key to use for storing and retrieving the query state.
    This key should be unique to your application.
2. `initialValue` (_
    any_): The initial value to use for the query state.

#### Returns
1. `state` (_
any_): The current value of the query state.
2. `setState` (_
function_): A function for setting the value of the query state.
This function accepts a single argument, which is the new value to set.

