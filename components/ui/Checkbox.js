import styles from "../../styles/ui/Checkbox.module.css";

const Checkbox = (props) => {
  const { id, checked, onChange } = props;

  return (
    <>
      <label htmlFor={id} className={styles.container}>
        <input id={id} type="checkbox" checked={checked} onChange={onChange} />
        <span className={styles.checkmark}></span>
      </label>
    </>
  );
};

export default Checkbox;
