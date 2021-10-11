import React, { FC } from 'react';
import { Typography, TypographyProps } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import block from "bem-cn-lite";
import { NumberInput } from 'components';
import { TextInputProps } from 'components/TextInput/TextInput';

import './TakeProfitInput.scss'

const b = block('take-profit-input');

type Props = Omit<TextInputProps, "onChange" | "onBlur" | "value"> & {
    value: number | null;
    min?: number;
    max?: number;
    decimalScale?: number;
    onChange?(value: number | null): void;
    onBlur?(value: number | null): void;
};

const LableTitle: FC<TypographyProps> = ({ children }) => <Typography className={b('label-title')} variant="caption">{children}</Typography>

const TakeProfitInput: FC<Props> = ({ label, ...rest }) => {
    return (
        <InputLabel>
            <LableTitle variant="caption">{label}</LableTitle>
            <div className={b('input-wrapper')}>
                <NumberInput
                    {...rest}
                />
            </div>
        </InputLabel>
    );
}

export { TakeProfitInput }