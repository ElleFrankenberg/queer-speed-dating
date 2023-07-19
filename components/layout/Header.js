import Link from "next/link";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

import styles from "../../styles/layout/Header.module.css";

function Header(props) {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const logOutHandler = () => {
    signOut();
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/">
          <Image
            className={styles.heroImage}
            src="/assets/images/queer-speed-dating-icon.png"
            width={70}
            height={70}
            alt="icon"
          />
        </Link>
        <ul className={styles.navList}>
          {session && (props.home || props.participant || props.matches) && (
            <li>
              <Button link="/participants">
                <span>All Participants</span>
              </Button>
            </li>
          )}
          {session && (props.participants || props.participant) && (
            <li>
              <Button link="/participants/all-matches">
                <span>all matches</span>
              </Button>
            </li>
          )}
          {session && (
            <li>
              <Button onClick={logOutHandler}>
                <span>Logout</span>
              </Button>
            </li>
          )}
          {!session && !loading && (
            <li>
              <Button link="/auth">
                <span>Login</span>
              </Button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
