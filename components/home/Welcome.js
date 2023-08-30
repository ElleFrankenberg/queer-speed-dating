import Image from "next/image";
import ParticipantForm from "../inputs/ParticipantForm";

import styles from "../../styles/home/Welcome.module.css";

const Welcome = () => {
  return (
    <section className={styles.welcome}>
      <div>
        <Image
          src="/assets/images/characters_left.png"
          width={300}
          height={300}
          alt="characters"
        />
      </div>
      <div>
        <Image
          src="/assets/images/Clipboard.png"
          width={300}
          height={300}
          alt="characters"
        />
      </div>
      <div>
        <Image
          src="/assets/images/characters_right.png"
          width={300}
          height={300}
          alt="characters"
        />
      </div>
    </section>
  );
};

export default Welcome;
