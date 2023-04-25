import styles from "../../styles/layout/MatchResultLayout.module.css";

const MatchResultLayout = (props) => {
  const { loveMatches, friendMatches } = props;
  return (
    <div className={styles.matchListContainer}>
      <div className={styles.matchListHeader}>
        <h2 className={styles.love}>Love</h2>
        <h2 className={styles.friends}>Friends</h2>
      </div>
      <div className={styles.list}>
        <div className={styles.loveMatchList}>
          {loveMatches.map((loveMatch, i) => (
            <h3 className={styles.matchName} key={i}>
              {loveMatch}
            </h3>
          ))}
        </div>
        <div className={styles.friendMatchList}>
          {friendMatches.map((friendMatch, i) => (
            <h3 className={styles.matchName} key={i}>
              {friendMatch}
            </h3>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchResultLayout;
