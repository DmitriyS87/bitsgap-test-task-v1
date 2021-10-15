import React, { useState } from "react";
import block from "bem-cn-lite";

import "./Switch.scss";
import { useEffect } from "react";

const b = block("switch");

type Props = {
  checked: boolean;
  label?: string;
  disabled?: boolean;
  reversed?: boolean;
  fullWidth?: boolean;
  onChange?(value: boolean): void;
};

function Switch({
  checked,
  onChange,
  disabled = false,
  reversed,
  fullWidth,
  label
}: Props) {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    onChange && onChange(isChecked);
  }, [isChecked, onChange])

  return (
    <label role="checkbox" aria-checked={checked} tabIndex={0} className={b({ reversed, "full-width": fullWidth })} onKeyDown={handleKeyDown}>
      <input
        className={b("checkbox")}
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
      />
      <div className={b("switch")} />
      {label && <span className={b("label")}>{label}</span>}
    </label>
  );

  function handleChange() {
    setIsChecked(!isChecked);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLLabelElement>) {
    console.log(e.key)
    if (e.key === " ") {
      setIsChecked(!isChecked)
      return;
    }
  } 
}

export { Switch };
