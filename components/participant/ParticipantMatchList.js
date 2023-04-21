import { useEffect } from "react";
import styles from "../../styles/participant/ParticipantMatchList.module.css";

const ParticipantMatchList = (props) => {
  const { participant, participants } = props;

  const potentialFriends = [];
  participant.forEach((participantData) => {
    participantData.likesData.forEach((likeData) => {
      const likeDataKey = Object.keys(likeData)[0];
      participants.forEach((participantItem) => {
        if (
          participantItem.id === likeDataKey &&
          likeData[likeDataKey].friends
        ) {
          const friendPair = [
            participantData.firstName,
            participantItem.firstName,
          ];
          potentialFriends.push(friendPair);
        }
      });
    });
  });
  console.log(potentialFriends); // Output: [["ylva", "eva"], ["elle", "ylva"]]

  // participant.forEach((participantData) => {
  //   participantData.likesData.forEach((likeData) => {
  //     const likeDataKey = Object.keys(likeData)[0];
  //     participants.forEach((participantItem) => {
  //       if (participantItem.id === likeDataKey) {
  //         console.log(participantData);
  //         console.log(
  //           `${participantData.firstName} likes ${participantItem.firstName}`
  //         );
  //         // Do something else with the matching data here
  //       }
  //     });
  //   });
  // });

  return (
    <div className={styles.matchListContainer}>
      <div className={styles.matchListHeader}>
        <h2 className={styles.headline}>Participants</h2>
        <h2 className={styles.love}>Love</h2>
        <h2 className={styles.friends}>Friends</h2>
      </div>
      <div className={styles.list}>
        {participants.map((participant) => (
          <div className={styles.participantItem} key={participant.id}>
            <h3 className={styles.participantName}>
              {participant.firstName.charAt(0).toUpperCase() +
                participant.firstName.slice(1)}{" "}
              {participant.lastName.charAt(0).toUpperCase() +
                participant.lastName.slice(1)}
            </h3>
            <div className={styles.checkboxLove}>name</div>
            <div className={styles.checkboxFriends}>name</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipantMatchList;
