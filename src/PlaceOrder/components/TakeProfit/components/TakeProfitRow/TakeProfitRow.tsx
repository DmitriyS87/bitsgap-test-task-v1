import React from "react";

import block from "bem-cn-lite";

import "./TakeProfitRow.scss";
import { PERCENT, QUOTE_CURRENCY } from 'PlaceOrder/constants';
import { TakeProfitInput } from "../TakeProfitInput/TakeProfitInput";
import { TakeProfitDomain } from "PlaceOrder/store/TakeProfitDomain";
import { PlaceOrderStore } from "PlaceOrder/store/PlaceOrderStore";
import { RemoveButton } from "components";

const b = block('take-profit-row');

type PartialTakeProfitDomain = Omit<TakeProfitDomain, 'store' | 'setError' | 'addError' | 'setInitialState' | 'updateTargetPriceByMainPrice' | 'validateState' | 'getFormValue'>

interface Props extends PartialTakeProfitDomain {
  isProfitBySell?: boolean;
  onDelete: PlaceOrderStore['removeTakeProfit'];
  className?: string;
};


const TakeProfitRow = ({ id, error, isProfitBySell, className, profit, price, amount, setProfit, setPrice, setAmount, onDelete, updateAmount, updateProfit, updateTargetPrice }: Props) => {
  return <div className={b(null, className)}>
    <div className={b('cell', { 'profit': true })}>
      <TakeProfitInput
        error={error.profit}
        label="Profit"
        variant="underlined"
        value={profit}
        onBlur={updateTargetPrice}
        onChange={setProfit}
        InputProps={{ endAdornment: PERCENT }}
      />
    </div>
    <div className={b('cell', { 'target-price': true })}>
      <TakeProfitInput
        error={error.price}
        label="Target price"
        variant="underlined"
        value={price}
        onChange={setPrice}
        onBlur={updateProfit}
        InputProps={{ endAdornment: QUOTE_CURRENCY }}
      />
    </div>
    <div className={b('cell', { 'amount': true })}>
      <TakeProfitInput
        error={error.amount}
        label={isProfitBySell ? "Amount to sell" : "Amount to buy"}
        variant="underlined"
        value={amount}
        onChange={setAmount}
        onBlur={updateAmount}
        InputProps={{ endAdornment: PERCENT }}
      />
    </div>
    <div className={b('cell', { 'close': true })}>
      <RemoveButton className={b('remove-button')} onClick={() => onDelete(id)} />
    </div>
  </div>;
};

export { TakeProfitRow };
