import React, { FC } from 'react';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';

export const RemoveButton: FC<IconButtonProps> = ({ className, ...props }) =>
    <IconButton {...props} className={className} >
        <CancelIcon fontSize="small" />
    </IconButton>
