import styles from "../../styles/layout/Footer.module.css";
import Link from "next/link";
import Button from "../ui/Button";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Button link="https://github.com/ElleFrankenberg/queer-speed-dating">
        <span>Project Code</span>
      </Button>
    </footer>
  );
};
export default Footer;
