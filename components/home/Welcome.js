import Image from "next/image";
import ParticipantForm from "../inputs/ParticipantForm";

import styles from "../../styles/home/Welcome.module.css";

const Welcome = () => {
  return (
    <section className={styles.welcome}>
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
    </section>
  );
};

export default Welcome;
