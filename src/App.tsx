import React from "react";
import block from "bem-cn-lite";

import { PlaceOrder } from "./PlaceOrder";

import "./App.scss";

const b = block("app");

export default function App() {
  return (
    <div className={b()}>
      <div className={b("form")}>
        <PlaceOrder />
      </div>
    </div>
  );
}
