import React, { FC } from "react";
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import block from "bem-cn-lite";

import "./TakeProfitItem.scss";
import { PERCENT, QUOTE_CURRENCY } from 'PlaceOrder/constants';
import { TakeProfitInput } from "./components/TakeProfitInput";
import { TakeProfitDomain } from "PlaceOrder/store/TakeProfitDomain";
import { PlaceOrderStore } from "PlaceOrder/store/PlaceOrderStore";

const b = block('take-profit-row');

type PartialTakeProfitDomain = Omit<TakeProfitDomain, 'store' | 'setError' | 'addError' | 'setInitialState' | 'updateTargetPriceByMainPrice' | 'validateState' | 'getFormValue'>

interface Props extends PartialTakeProfitDomain {
  isProfitBySell?: boolean;
  onDelete: PlaceOrderStore['removeTakeProfit'];
  className?: string;
};

const RemoveButton: FC<IconButtonProps> = ({ className, ...props }) => <IconButton {...props} className={b('remove-button', className)} ><CancelIcon fontSize="small" /></IconButton>

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
