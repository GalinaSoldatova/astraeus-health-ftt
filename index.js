import React from "react";
import { configureStore, createAction } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { createRoot } from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";

const increment = createAction("increment");
const decrement = createAction("decrement");

const counter = (s = 0, action: any) =>
  increment.match(action) ? s + 1 : decrement.match(action) ? s - 1 : s;

const root = combineReducers({ counter });

const timer = ({ dispatch }: { dispatch: any }) => {
  setInterval(() => dispatch(increment()), 1000);

  return (next: any) => (action: any) => {
    next(action);
  };
};

const s = configureStore({
  reducer: root,
  middleware: [timer],
});

const App = () => {
  const dispatch = useDispatch();
  const counter = useSelector((s: any) => s.counter);

  return (
    <>
      <button onClick={() => dispatch(decrement())}>-</button>
      {counter}
      <button onClick={() => dispatch(increment())}>+</button>
    </>
  );
};

createRoot(document.getElementById("root")!).render(
  <Provider store={s}>
    <App />
  </Provider>
);

/*

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Assignment</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script defer src="/bundle.js"></script>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>

*/
