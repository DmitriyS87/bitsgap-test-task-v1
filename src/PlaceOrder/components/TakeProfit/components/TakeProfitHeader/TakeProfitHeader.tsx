import { Switch } from "components";
import React from "react";
import block from "bem-cn-lite";
import HelpIcon from '@material-ui/icons/Help';

import "./TakeProfitHeader.scss";
import { Typography } from "@material-ui/core";

const b = block('take-profit-header');

type Props = {
  isOpen: boolean;
  className?: string;
};

const TakeProfitHeader = ({ isOpen, className }: Props) => {
  return <div className={b(null, className)}>
    <div className={b('title-wrapper')}>
      <Typography className={b('title')}>Take Profit</Typography>
      <HelpIcon className={b('question')} fontSize="small" />
    </div>
    <div>
      <Switch checked={isOpen} />
    </div>
  </div>;
};

export { TakeProfitHeader };
