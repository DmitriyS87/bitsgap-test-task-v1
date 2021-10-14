import { observer } from 'mobx-react';
import React, { FC } from 'react';
import { TakeProfitRow } from '../TakeProfitItem/TakeProfitItem';
import block from "bem-cn-lite";
import { useStore } from 'PlaceOrder/context';

const b = block('take-profit');

const TakeProfitList: FC = observer(() => {
    const {
        activeOrderSide,
        takeProfits,
        removeTakeProfit,
    } = useStore();

    return (
        <>
            {takeProfits.map(({ store, getFormValue,
                setProfit,
                setPrice,
                setAmount,
                updateAmount,
                updateProfit,
                updateTargetPrice,
                ...props }) => (
                <TakeProfitRow
                    {...props}
                    key={props.id}
                    isProfitBySell={activeOrderSide === "buy"}
                    onDelete={removeTakeProfit}
                    className={b('item')}
                    setProfit={setProfit}
                    setPrice={setPrice}
                    setAmount={setAmount}
                    updateAmount={updateAmount}
                    updateProfit={updateProfit}
                    updateTargetPrice={updateTargetPrice}
                />
            ))}
        </>
    );
})

export { TakeProfitList }