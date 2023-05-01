import Link from "next/link";
import Button from "@/components/ui/Button";
import Image from "next/image";

import styles from "../../styles/layout/Header.module.css";

function Header(props) {
  return (
    <header className={styles.header}>
      <Link href="/">
        <Image
          className={styles.heroImage}
          src="/assets/images/queer-speed-dating-icon.png"
          width={70}
          height={70}
          alt="icon"
        />
      </Link>
      {props.home && (
        <nav>
          <ul>
            <li>
              <Button link="/event-registration">
                <span>Event Registration</span>
              </Button>
            </li>
            <li>
              <Button link="/participants">
                <span>Profile / Participants</span>
              </Button>
            </li>
            <li>
              <Button link="/auth">
                <span>Login</span>
              </Button>
            </li>
            <li>
              <Button>
                <span>Logout</span>
              </Button>
            </li>
          </ul>
        </nav>
      )}
      {props.participants && (
        <nav>
          <ul>
            <li>
              <Button link="/participants/all-matches">
                <span>all matches</span>
              </Button>
            </li>
            <li>
              <Button>
                <span>Logout</span>
              </Button>
            </li>
          </ul>
        </nav>
      )}
      {props.participant && (
        <nav>
          <ul>
            <li>
              <Button link="/participants">
                <span>Profile / Participants</span>
              </Button>
            </li>
            <li>
              <Button>
                <span>Logout</span>
              </Button>
            </li>
          </ul>
        </nav>
      )}
      {props.matches && (
        <nav>
          <ul>
            <li>
              <Button link="/participants">
                <span>Profile / Participants</span>
              </Button>
            </li>
            <li>
              <Button>
                <span>Logout</span>
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
