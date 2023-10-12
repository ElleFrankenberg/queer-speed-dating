import styles from "../../styles/layout/MatchResultLayout.module.css";
import Image from "next/image";

const MatchResultLayout = (props) => {
  const { loveMatches, friendMatches } = props;
  return (
    <section className={styles.matchListContainer}>
      <section className={styles.loveMatchList}>
        <div className={styles.label}>
          <h2 className={styles.love}>Love</h2>
          <Image
            src="/assets/images/heart.png"
            width={30}
            height={30}
            alt="love"
            className={styles.icon}
          />
        </div>
        {loveMatches.map((loveMatch, i) => (
          <h3 className={styles.matchName} key={i}>
            {loveMatch}
          </h3>
        ))}
      </section>

      <section className={styles.friendMatchList}>
        <div className={styles.label}>
          <h2 className={styles.friends}>Friends</h2>
          <Image
            src="/assets/images/HighFive.png"
            width={30}
            height={30}
            alt="friends"
            className={styles.icon}
          />
        </div>
        {friendMatches.map((friendMatch, i) => (
          <h3 className={styles.matchName} key={i}>
            {friendMatch}
          </h3>
        ))}
      </section>
    </section>
  );
};

export default MatchResultLayout;
