import styles from "../../styles/layout/MatchResultLayout.module.css";

const MatchResultLayout = (props) => {
  const { loveMatches, friendMatches } = props;
  return (
    <section className={styles.matchListContainer}>
      <section className={styles.loveMatchList}>
        <h2 className={styles.love}>Love</h2>
        {loveMatches.map((loveMatch, i) => (
          <h3 className={styles.matchName} key={i}>
            {loveMatch}
          </h3>
        ))}
      </section>

      <section className={styles.friendMatchList}>
        <h2 className={styles.friends}>Friends</h2>
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
