import styles from "@/styles/ui/Input.module.css";

import { forwardRef } from "react";

const Input = forwardRef(function Input(props, ref) {
  const { id, type, text } = props;
  return (
    <>
      <label htmlFor={id} className={styles.label}>
        {text}
      </label>
      <input type={type} id={id} className={styles.input} ref={ref} required />
    </>
  );
});

export default Input;
