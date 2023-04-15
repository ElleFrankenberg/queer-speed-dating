import Link from "next/link";
import styles from "@/styles/ui/Button.module.css";

const Button = (props) => {
  const { link, type, onClick } = props;
  if (props.link) {
    return (
      <Link href={link} className={styles.btn}>
        {props.children}
      </Link>
    );
  }

  return (
    <button type={type} className={styles.btn} onClick={onClick}>
      {props.children}
    </button>
  );
};
export default Button;
