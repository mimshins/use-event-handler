# useEventHandler

A custom React Hook that handles binding and unbinding event listeners in a smart way.

## Installation

To add `useEventHandler` hook to your React Project, run the following command:

```shell
$ npm install use-event-handler
```

or `Yarn` if you prefer:

```shell
$ yarn add use-event-handler
```

## Usage

Here's a basic setup:

```javascript
useEventHandler({
  element: myElement,
  eventName: "myEvent",
  handler: myCallbackFunction,
  options: { passive: false, ...etc }
});
```

### Parameters

Here's a list of parameters you can use: (\* = optional)

#### `listenerConfig` - [`Object`]

An object to be passed to `addEventListener` for configurations.<br>
It contains the following properties:

| Parameter   | Description                                                                                                                                                                                                                                                                                                                                                                   |
| :---------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `element`\* | An optional element to listen on. Defaults to `global` (i.e., `window`)<br>[element may be any object that supports events]                                                                                                                                                                                                                                                   |
| `eventName` | A case-sensitive string representing the event type to listen for.                                                                                                                                                                                                                                                                                                            |
| `handler`   | The object that receives a notification when an event of the specified type (`eventName`) occurs. This must be an object implementing the EventListener interface, or a JavaScript function. See [The event listener callback](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#The_event_listener_callback) for details on the callback itself. |
| `options`\* | An object specifies characteristics about the event listener. The available options are: `capture`, `passive`, `once`. (See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) for details.)                                                                                                                                                |

#### `shouldBeAttached`\* - [`Boolean`][default: `true`]

A boolean detemines whether to attach the eventListener or not.<br>
You can use it to attach events dynamically or conditionally.

Example:

```javascript
useEventHandler(
  {
    element: document,
    eventName: "mousemove",
    handler: onDragMove,
    options: { passive: false }
  },
  isMouseDragAllowed && isDragStarted
);
```
