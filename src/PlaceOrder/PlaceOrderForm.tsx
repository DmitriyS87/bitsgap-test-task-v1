import React, { FormEventHandler } from "react";
import { observer } from "mobx-react";
import block from "bem-cn-lite";
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';

import { NumberInput, Button } from "components";

import { BASE_CURRENCY, QUOTE_CURRENCY } from "./constants";
import { useStore } from "./context";
import { PlaceOrderTypeSwitch } from "./components/PlaceOrderTypeSwitch/PlaceOrderTypeSwitch";

import "./PlaceOrderForm.scss";
import { TakeProfit } from "./components/TakeProfit/TakeProfit";

const b = block("place-order-form");

export const PlaceOrderForm = observer(() => {
  const {
    activeOrderSide,
    price,
    total,
    amount,
    validatePlaceOrder,
    setPrice,
    setTotal,
    setOrderSide,
    updateAmount,
    updateChildren
  } = useStore();

  const handleSubmitForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const isValid = validatePlaceOrder();

    if (isValid) {
      // submit form
    }
  }

  return (
    <form className={b()} onSubmit={handleSubmitForm}>
      <div className={b("header")}>
        Binance: {`${BASE_CURRENCY} / ${QUOTE_CURRENCY}`}
        <IconButton className={b('close-icon')}>
          <CancelIcon />
        </IconButton>
      </div>
      <div className={b('content')}>
        <div className={b("type-switch")}>
          <PlaceOrderTypeSwitch
            activeOrderSide={activeOrderSide}
            onChange={setOrderSide}
          />
        </div>
        <div className={b("price")}>
          <NumberInput
            label={`Price, ${QUOTE_CURRENCY}`}
            value={price}
            onChange={(value) => setPrice(Number(value))}
            onBlur={updateChildren}
            InputProps={{ endAdornment: QUOTE_CURRENCY }}
          />
        </div>
        <div className={b("amount")}>
          <NumberInput
            value={amount}
            label={`Amount, ${BASE_CURRENCY}`}
            onChange={(value) => updateAmount(Number(value))}
            InputProps={{ endAdornment: BASE_CURRENCY }}
          />
        </div>
        <div className={b("total")}>
          <NumberInput
            value={total}
            label={`Total, ${QUOTE_CURRENCY}`}
            onChange={(value) => setTotal(Number(value))}
            InputProps={{ endAdornment: QUOTE_CURRENCY }}
          />
        </div>
        <div className={b("take-profit")}>
          <TakeProfit />
        </div>
        <div className="submit">
          <Button
            color={activeOrderSide === "buy" ? "green" : "red"}
            type="submit"
            fullWidth
          >
            {activeOrderSide === "buy"
              ? `Buy ${BASE_CURRENCY}`
              : `Sell ${QUOTE_CURRENCY}`}
          </Button>
        </div>
      </div>
    </form>
  );
});
