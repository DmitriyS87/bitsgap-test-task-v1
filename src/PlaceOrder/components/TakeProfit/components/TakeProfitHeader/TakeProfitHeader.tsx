import { Switch } from "components";
import React from "react";
import block from "bem-cn-lite";
import { ReactComponent as Question } from 'static/img/question.svg';

import "./TakeProfitHeader.scss";
import { Typography } from "@material-ui/core";

const b = block('take-profit-header');

type Props = {
  isOpen: boolean;
  className?: string;
  onToggle: () => void;
};

const TakeProfitHeader = ({ isOpen, className, onToggle }: Props) => {
  return <div className={b(null, className)}>
    <div className={b('title-wrapper')}>
      <Typography className={b('title')}>Take Profit</Typography>
      <Question className={b('question')} />
    </div>
    <div>
      <Switch checked={isOpen} onChange={onToggle} />
    </div>
  </div>;
};

export { TakeProfitHeader };
