import React, { FC } from "react";
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import block from "bem-cn-lite";

import "./TakeProfitItem.scss";
import { PERCENT, QUOTE_CURRENCY } from 'PlaceOrder/constants';
import { TakeProfitInput } from "./components/TakeProfitInput";

const b = block('take-profit-row');

type Props = {
  id: string;
  isProfitBySell?: boolean;
  className?: string;
  amount: any;
  profit: any;
  price: any;
  onChangeProfit: any;
  onChangeTragetPrice: any;
  onChangeAmount: any;
  onDelete: any;
  updateProfit: any;
  updateTargetPrice: any;
  updateAmount: any;
  error: any;
  };

const RemoveButton: FC<IconButtonProps> = ({ className, ...props }) => <IconButton {...props} className={b('remove-button', className)} ><CancelIcon fontSize="small" /></IconButton>

const TakeProfitRow = ({ id, error, isProfitBySell, className, profit, price, amount, onChangeProfit, onChangeTragetPrice, onChangeAmount, onDelete, updateAmount, updateProfit, updateTargetPrice }: Props) => {


  return <div className={b(null, className)}>
    <div className={b('cell', { 'profit': true })}>
      <TakeProfitInput
        error={error.profit}
        label="Profit"
        variant="underlined"
        value={profit}
        onBlur={updateTargetPrice}
        onChange={onChangeProfit}
        InputProps={{ endAdornment: PERCENT }}
      />
    </div>
    <div className={b('cell', { 'target-price': true })}>
      <TakeProfitInput
        error={error.price}
        label="Target price"
        variant="underlined"
        value={price}
        onChange={onChangeTragetPrice}
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
        onChange={onChangeAmount}
        onBlur={updateAmount}
        InputProps={{ endAdornment: PERCENT }}
      />
    </div>
    <div className={b('cell', { 'close': true })}>
      <RemoveButton className={b('remove-button')} onClick={() => onDelete(id)} />
    </div>
  </div>;
};

export { TakeProfitRow as TakeProfitItem };
