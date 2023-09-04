import styles from "../../styles/layout/Footer.module.css";
import Button from "../ui/Button";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Button
        link="https://github.com/ElleFrankenberg/queer-speed-dating"
        color="white"
      >
        <span>Project Code</span>
      </Button>
    </footer>
  );
};
export default Footer;
