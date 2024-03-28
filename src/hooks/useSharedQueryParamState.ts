import React, { useState, useEffect } from 'react';

const sharedStates = new Map<string, any>();
const listeners = new Map<string, Array<() => void>>();

export function useSharedQueryParamState<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const value = urlParams.get(key);
    return value ? JSON.parse(value) : initialValue;
  });

  useEffect(() => {
    sharedStates.set(key, state);
    const funcs = listeners.get(key) || [];
    funcs.forEach(func => func());
  }, [key, state]);

  useEffect(() => {
    const handlePopState = () => {
      const sharedState = sharedStates.get(key);
      setState(sharedState ? sharedState : initialValue);
    };

    const handleStateChange = () => {
      const sharedState = sharedStates.get(key);
      setState(sharedState ? sharedState : initialValue);
    };

    window.addEventListener('popstate', handlePopState);
    const funcs = listeners.get(key) || [];
    funcs.push(handleStateChange);
    listeners.set(key, funcs);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      const funcs = listeners.get(key) || [];
      const index = funcs.indexOf(handleStateChange);
      if (index > -1) {
        funcs.splice(index, 1);
      }
      listeners.set(key, funcs);
    };
  }, [key, initialValue]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (state === initialValue) {
      urlParams.delete(key);
    } else {
      urlParams.set(key, JSON.stringify(state));
    }
    window.history.pushState({}, '', '?' + urlParams.toString());
  }, [key, state, initialValue]);

  return [state, setState];
}

export default useSharedQueryParamState;