import React from "react";
import block from "bem-cn-lite";
import {TrendingUp, TrendingDown} from '@material-ui/icons';

import { Button } from "components";
import { OrderSide } from "../../model";

import "./PlaceOrderTypeSwitch.scss";

const b = block("place-order-type-switch");

type Props = {
  activeOrderSide: OrderSide;
  onChange(orderSide: OrderSide): void;
};

const PlaceOrderTypeSwitch = ({ activeOrderSide, onChange }: Props) => {
  const handleToggle = (orderType: OrderSide) => {
    onChange(orderType);
  };

  return (
    <div className={b()}>
      <Button
        color="green"
        fullWidth
        inactive={activeOrderSide !== "buy"}
        onClick={() => handleToggle("buy")}
      >
        <TrendingUp/>&nbsp;
        Long
      </Button>
      <Button
        color="red"
        fullWidth
        inactive={activeOrderSide === "buy"}
        onClick={() => handleToggle("sell")}
      >
        <TrendingDown/>&nbsp;
        Short
      </Button>
    </div>
  );
};

export { PlaceOrderTypeSwitch };
