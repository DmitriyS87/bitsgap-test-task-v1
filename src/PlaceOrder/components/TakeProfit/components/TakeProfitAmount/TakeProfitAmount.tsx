import React, { FC } from 'react';
import block from "bem-cn-lite"

import './TakeProfitAmount.scss';

const b = block('result-amount');

type Props = {
    amount: number;
    currency: string;
    className?: string;
}

const TakeProfitAmount: FC<Props> = ({ amount, currency, className }) => {
    return (
        <div className={b(null, className)}>
            <div className={b('title')}>Projected profit</div>
            <div className={b('amount')}>
                <span className={b('amount-value')}>{amount}</span>
                <span className={b('amount-currency')}>{currency}</span>
            </div>
        </div>)
}

export { TakeProfitAmount }