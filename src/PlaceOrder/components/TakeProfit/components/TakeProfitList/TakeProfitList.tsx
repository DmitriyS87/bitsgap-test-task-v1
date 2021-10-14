import { observer } from 'mobx-react';
import { TakeProfit } from 'PlaceOrder/store/TakeProfit';
import React, { FC } from 'react';
import { TakeProfitItem } from '../TakeProfitItem/TakeProfitItem';
import block from "bem-cn-lite";

type Props = {
    isProfitBySell: boolean;
    takeProfits: TakeProfit[];
    onRemove: (id: string) => void;
}

const b = block('take-profit');

const TakeProfitList: FC<Props> = observer(({ isProfitBySell, takeProfits, onRemove }) => {
    return (
        <>
            {takeProfits.map(({ id, error, showError, setAmount, setPrice, setProfit, updateProfit, updateTargetPrice, updateAmount, ...props }) => (
                <TakeProfitItem
                    isProfitBySell={isProfitBySell}
                    className={b('item')}
                    error={error}
                    showError={showError}
                    id={id}
                    key={id}
                    onChangeProfit={setProfit}
                    onChangeTragetPrice={setPrice}
                    onChangeAmount={setAmount}
                    onDelete={onRemove}
                    updateProfit={updateProfit}
                    updateTargetPrice={updateTargetPrice}
                    updateAmount={updateAmount}
                    {...props}
                />
            ))}
        </>
    );
})

export { TakeProfitList }