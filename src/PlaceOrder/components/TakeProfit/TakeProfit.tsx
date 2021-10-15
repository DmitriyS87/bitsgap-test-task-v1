import React from 'react';
import block from "bem-cn-lite";
import { observer } from "mobx-react";
import CancelIcon from '@material-ui/icons/Cancel';
import { useStore } from "../../context";

import './TakeProfit.scss';
import { TextButton } from 'components';
import { QUOTE_CURRENCY } from 'PlaceOrder/constants';
import { TakeProfitAmount, TakeProfitHeader, TakeProfitList } from './components';

const PLACE_ORDER_MAX_TAKE_PROFIT = 5;

const b = block('take-profit');

const TakeProfit = observer(() => {
    const {
        isTakeProfitOn,
        projectedProfit,
        takeProfitCount,
        toggleTakeProfit,
        addTakeProfit,
    } = useStore();

    const handleAddTakeProfitClick = () => addTakeProfit();

    return (
        <div className={b()}>
            <TakeProfitHeader isOpen={isTakeProfitOn} onChange={toggleTakeProfit} className={b('header')} />
            {isTakeProfitOn && <>
                <TakeProfitList />
                {takeProfitCount < 5 && <TextButton className={b('add-button')} onClick={handleAddTakeProfitClick}>
                    <CancelIcon style={{ transform: "rotate(45deg)", marginRight: "0.3rem", fontSize: "1rem" }} />
                    <span style={{ fontSize: "0.875rem" }}>Add profit target {takeProfitCount} / {PLACE_ORDER_MAX_TAKE_PROFIT} </span>
                </TextButton>}
                <TakeProfitAmount className={b('result-amount')} amount={projectedProfit} currency={QUOTE_CURRENCY} />
            </>}
        </div>
    )
})

export { TakeProfit }