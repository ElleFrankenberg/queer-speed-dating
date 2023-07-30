import Image from "next/image";
import ParticipantForm from "../inputs/ParticipantForm";

import styles from "../../styles/home/Welcome.module.css";

const Welcome = () => {
  return (
    <section className={styles.welcome}>
      <ParticipantForm />
    </section>
  );
};

export default Welcome;
