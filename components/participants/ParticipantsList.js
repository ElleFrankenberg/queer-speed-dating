import { useState } from "react";
import Link from "next/link";
import Button from "../ui/Button";
import styles from "../../styles/participants/ParticipantsList.module.css";

const ParticipantsList = (props) => {
  const { participants } = props;
  const [showParticipantList, setShowParticipantList] = useState(true);

  const toggleDeletePopup = () => {
    setShowParticipantList(!showParticipantList);
  };

  const deleteAllParticipants = () => {
    console.log("delete");
  };

  return (
    <div className={styles.participants}>
      <div className={styles.participantListContainer}>
        {showParticipantList && (
          <>
            <h1>All Participants</h1>
            <ul className={styles.participantList}>
              {participants.map((participant) => (
                <li key={participant.id} className={styles.participantListItem}>
                  <Link
                    href={`/participants/${
                      participant.firstName + participant.id
                    }`}
                  >
                    <span>{`${
                      participant.firstName.charAt(0).toUpperCase() +
                      participant.firstName.slice(1)
                    } ${
                      participant.lastName.charAt(0).toUpperCase() +
                      participant.lastName.slice(1)
                    }`}</span>
                  </Link>
                  <Button>
                    <span>Delete</span>
                  </Button>
                </li>
              ))}
            </ul>
            <Button>
              <span onClick={toggleDeletePopup}>delete all participants</span>
            </Button>
          </>
        )}
        {!showParticipantList && (
          <div className={styles.deletePopup}>
            <h3>Delete all participants?</h3>
            <div className={styles.buttonContainer}>
              <Button onClick={deleteAllParticipants}>yes</Button>
              <Button onClick={toggleDeletePopup}>no</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ParticipantsList;
