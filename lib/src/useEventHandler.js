import { useRef, useEffect } from "react";

const isOptionParamSupported = () => {
  let optionSupported = false;
  const fn = () => {};

  try {
    const opt = Object.defineProperty({}, "passive", {
      get: () => {
        optionSupported = true;
        return null;
      }
    });

    window.addEventListener("test", fn, opt);
    window.removeEventListener("test", fn, opt);
  } catch (e) {
    return false;
  }

  return optionSupported;
};

export default (listenerConfig = {}, shouldBeAttached = true) => {
  const {
    element = global,
    eventName = "",
    handler = () => {},
    options = { capture: false }
  } = listenerConfig;

  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = evt => savedHandler.current(evt);
    const { capture, ...restOpts } = options;
    const thirdParam = isOptionParamSupported()
      ? { capture: capture || false, ...restOpts }
      : capture || false;

    if (element && shouldBeAttached)
      element.addEventListener(eventName, eventListener, thirdParam);

    return () => {
      if (element)
        element.removeEventListener(eventName, eventListener, thirdParam);
    };
  }, [element, eventName, shouldBeAttached, options]);
};
