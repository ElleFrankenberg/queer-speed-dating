import styles from "../../styles/layout/Footer.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link href="https://github.com/ElleFrankenberg/queer-speed-dating">
        Project Code
      </Link>
      <p>Design: August Floren</p>
    </footer>
  );
};
export default Footer;
