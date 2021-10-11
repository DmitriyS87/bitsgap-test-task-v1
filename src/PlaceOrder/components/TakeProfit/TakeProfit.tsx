import React from 'react';
import block from "bem-cn-lite";
import { TakeProfitHeader } from './components/TakeProfitHeader/TakeProfitHeader';
import { TakeProfitItem } from './components/TakeProfitItem/TakeProfitItem';

import './TakeProfit.scss';

const b = block('take-profit');

type Props = {
};

const TakeProfit = () => {
    return (
        <div className={b()}>
            <TakeProfitHeader isOpen={true} className={b('header')} />
            <TakeProfitItem className={b('item')} />
            <TakeProfitItem className={b('item')} />
            <TakeProfitItem className={b('item')} />
            <TakeProfitItem className={b('item')} />
            <TakeProfitItem className={b('item')} />
        </div>
    )
}

export { TakeProfit }