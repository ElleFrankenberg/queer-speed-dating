import Link from "next/link";
import styles from "@/styles/ui/Button.module.css";

const Button = (props) => {
  const { link, text } = props;
  if (props.link) {
    return (
      <Link href={props.link}>
        <a className={styles.btn}>{props.children}</a>
      </Link>
    );
  }

  return (
    <button className={styles.btn} onClick={props.onClick}>
      {props.children}
    </button>
  );
};
export default Button;
