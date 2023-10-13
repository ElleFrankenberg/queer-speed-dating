import styles from "../../styles/layout/MatchResultLayout.module.css";
import Image from "next/image";

const MatchResultLayout = (props) => {
  const { loveMatches, friendMatches } = props;
  return (
    <section className={styles.matchListContainer}>
      <ul className={styles.loveMatchList}>
        <li className={styles.label}>
          <h2 className={styles.love}>Love</h2>
          <Image
            src="/assets/images/heart.png"
            width={30}
            height={30}
            alt="love"
            className={styles.icon}
          />
        </li>
        {loveMatches.map((loveMatch, i) => (
          <li className={styles.matchName} key={i}>
            <h3>{loveMatch}</h3>
          </li>
        ))}
      </ul>

      <ul className={styles.friendMatchList}>
        <li className={styles.label}>
          <h2 className={styles.friends}>Friends</h2>
          <Image
            src="/assets/images/HighFive.png"
            width={30}
            height={30}
            alt="friends"
            className={styles.icon}
          />
        </li>
        {friendMatches.map((friendMatch, i) => (
          <li className={styles.matchName} key={i}>
            <h3>{friendMatch}</h3>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MatchResultLayout;
