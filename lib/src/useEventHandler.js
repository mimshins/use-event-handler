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

export default (
  {
    element = null,
    eventName = "",
    handler = () => {},
    opts = { useCapture: false }
  },
  shouldBeAttached = true
) => {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = evt => savedHandler.current(evt);
    const { useCapture, ...restOpts } = opts;
    const thirdParam = isOptionParamSupported()
      ? { capture: useCapture || false, ...restOpts }
      : useCapture || false;

    if (element && shouldBeAttached)
      element.addEventListener(eventName, eventListener, thirdParam);

    return () => {
      if (element)
        element.removeEventListener(eventName, eventListener, thirdParam);
    };
  }, [element, eventName, shouldBeAttached, opts]);
};
