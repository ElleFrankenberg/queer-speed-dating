import Link from "next/link";
import styles from "@/styles/ui/Button.module.css";

const Button = (props) => {
  const { link, type, onClick, color } = props;

  let btnColor;

  if (color === "pink") {
    btnColor = styles.pink;
  }
  if (color === "green") {
    btnColor = styles.green;
  }

  if (props.link) {
    return (
      <Link href={link} className={`${styles.btn} ${btnColor}`}>
        <span>{props.children}</span>
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={`${styles.btn} ${btnColor}`}
      onClick={onClick}
    >
      <span>{props.children}</span>
    </button>
  );
};
export default Button;
