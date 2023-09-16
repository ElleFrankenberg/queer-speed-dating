import { useState, useEffect, useContext } from "react";

import NotificationContext from "@/store/notificationContext";
import Image from "next/image";
import ParticipantForm from "../inputs/ParticipantForm";

import styles from "../../styles/home/Welcome.module.css";

const Welcome = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const notificationCxt = useContext(NotificationContext);

  useEffect(() => {
    if (!notificationCxt.notification) {
      setShowWelcome(true);
    }
  }, [notificationCxt.notification]);

  return (
    <section className={styles.welcome}>
      {showWelcome && !notificationCxt.notification && (
        <>
          <figure className={styles.avatarImageContainer}>
            <Image
              src="/assets/images/characters_left.png"
              width={300}
              height={300}
              alt="characters"
              className={styles.avatarImage}
            />
          </figure>

          <ParticipantForm />

          <figure className={styles.avatarImageContainer}>
            <Image
              src="/assets/images/characters_right.png"
              width={300}
              height={300}
              alt="characters"
              className={styles.avatarImage}
            />
          </figure>
        </>
      )}
    </section>
  );
};

export default Welcome;
