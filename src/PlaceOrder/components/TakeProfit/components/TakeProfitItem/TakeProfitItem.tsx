import React, { FC } from "react";
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import block from "bem-cn-lite";

import "./TakeProfitItem.scss";
import { NumberInput } from 'components';
import { PERCENT, QUOTE_CURRENCY } from 'PlaceOrder/constants';
import { InputLabel, Typography, TypographyProps } from "@material-ui/core";
import { TakeProfitInput } from "./components/TakeProfitInput";

const b = block('take-profit-row');

type Props = {
  className?: string;
};

const CloseButton: FC<IconButtonProps> = ({ className, ...props }) => <IconButton {...props} className={b('close-button', className)} ><CancelIcon fontSize="small" /></IconButton>

const TakeProfitRow = ({ className }: Props) => {
  return <div className={b(null, className)}>
    <div className={b('cell', { 'profit': true })}>
      <TakeProfitInput
        label="Profit"
        variant="underlined"
        value={0}
        onChange={(value) => console.log(Number(value))}
        InputProps={{ endAdornment: PERCENT }}
      />
    </div>
    <div className={b('cell', { 'target-price': true })}>
      <TakeProfitInput
        label="Target price"
        variant="underlined"
        value={1}
        onChange={(value) => console.log(Number(value))}
        InputProps={{ endAdornment: QUOTE_CURRENCY }}
      />
    </div>
    <div className={b('cell', { 'amount': true })}>
      <TakeProfitInput
        label="Amount to buy"
        variant="underlined"
        value={2}
        onChange={(value) => console.log(Number(value))}
        InputProps={{ endAdornment: PERCENT }}
      />
    </div>
    <div className={b('cell', { 'close': true })}>
      <CloseButton className={b('close-button')} />
    </div>
  </div>;
};

export { TakeProfitRow as TakeProfitItem };
