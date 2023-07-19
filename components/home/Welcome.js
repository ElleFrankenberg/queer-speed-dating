import Image from "next/image";
import ParticipantForm from "../inputs/ParticipantForm";

import styles from "../../styles/home/Welcome.module.css";

const Welcome = () => {
  return (
    <section className={styles.welcome}>
      <Image
        className={styles.heroImage}
        src="/assets/images/pride_flags.jpg"
        width={1200}
        height={1200}
        alt="pride flag"
      />
      <ParticipantForm />
    </section>
  );
};

export default Welcome;
