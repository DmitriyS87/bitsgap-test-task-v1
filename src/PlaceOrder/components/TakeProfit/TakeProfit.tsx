import React from 'react';
import block from "bem-cn-lite";
import { observer } from "mobx-react";
import CancelIcon from '@material-ui/icons/Cancel';
import { TakeProfitHeader } from './components/TakeProfitHeader/TakeProfitHeader';
import { TakeProfitItem } from './components/TakeProfitItem/TakeProfitItem';
import { useStore } from "../../context";

import './TakeProfit.scss';
import { TextButton } from 'components';
import { QUOTE_CURRENCY } from 'PlaceOrder/constants';
import { TakeProfitAmount } from './components/TakeProfitAmount/TakeProfitAmount';

const b = block('take-profit');

type Props = {
};


const TakeProfit = observer(() => {
    const {
        isTakeProfitOn,
        toggleTakeProfit
    } = useStore();

    return (
        <div className={b()}>
            <TakeProfitHeader isOpen={isTakeProfitOn} onToggle={toggleTakeProfit} className={b('header')} />
            <TakeProfitItem className={b('item')} />
            <TextButton className={b('add-button')} >
                <CancelIcon style={{ transform: "rotate(45deg)", marginRight: "0.3rem", fontSize: "1rem" }} />
                <span style={{ fontSize: "0.875rem" }}>Add profit target 3 / 5</span>
            </TextButton>
            <TakeProfitAmount className={b('result-amount')} amount={0} currency={QUOTE_CURRENCY} />
        </div>
    )
})

export { TakeProfit }