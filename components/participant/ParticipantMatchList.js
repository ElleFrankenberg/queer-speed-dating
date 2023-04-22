import { useEffect } from "react";
import styles from "../../styles/participant/ParticipantMatchList.module.css";

const ParticipantMatchList = (props) => {
  const { participant, participants } = props;

  const friendMatches = [];
  const loveMatches = [];

  participant.forEach((currentParticipant) => {
    if (currentParticipant.likesData !== null) {
      currentParticipant.likesData.forEach((currentParticipantLikeData) => {
        const currentParticipantlikeDataKey = Object.keys(
          currentParticipantLikeData
        )[0];
        participants.forEach((potentialMatch) => {
          if (potentialMatch.likesData !== null) {
            potentialMatch.likesData.forEach((potentialMatchLikeData) => {
              const potentialMatchLikeDataKey = Object.keys(
                potentialMatchLikeData
              )[0];

              console.log(
                currentParticipantLikeData[currentParticipantlikeDataKey]
                  .friends,
                "first",
                potentialMatchLikeData[potentialMatchLikeDataKey].friends,
                "second"
              );
              if (
                currentParticipantlikeDataKey === potentialMatch.id &&
                potentialMatchLikeDataKey === currentParticipant.id &&
                currentParticipantLikeData[currentParticipantlikeDataKey]
                  .friends &&
                potentialMatchLikeData[potentialMatchLikeDataKey].friends
              ) {
                const friendMatch = `${
                  potentialMatch.firstName.charAt(0).toUpperCase() +
                  potentialMatch.firstName.slice(1)
                } ${
                  potentialMatch.lastName.charAt(0).toUpperCase() +
                  potentialMatch.lastName.slice(1)
                }`;
                friendMatches.push(friendMatch);
              } else {
                console.log("no match");
              }
              if (
                currentParticipantlikeDataKey === potentialMatch.id &&
                potentialMatchLikeDataKey === currentParticipant.id &&
                currentParticipantLikeData[currentParticipantlikeDataKey]
                  .love &&
                potentialMatchLikeData[potentialMatchLikeDataKey].love
              ) {
                const loveMatch = `${
                  potentialMatch.firstName.charAt(0).toUpperCase() +
                  potentialMatch.firstName.slice(1)
                } ${
                  potentialMatch.lastName.charAt(0).toUpperCase() +
                  potentialMatch.lastName.slice(1)
                }`;

                loveMatches.push(loveMatch);
              } else {
                console.log("no match");
              }
            });
          }
        });
      });
    }
  });
  console.log(friendMatches, "friend matches");

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

export default ParticipantMatchList;
