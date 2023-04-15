import React, { useState } from "react";
import Checkbox from "../ui/Checkbox";
import Button from "../ui/Button";
import styles from "../../styles/inputs/ParticipantLikesForm.module.css";

const ParticipantLikesForm = ({ participants }) => {
  const [checkboxes, setCheckboxes] = useState({});

  // Initialize the state for the checkboxes with the participants data
  useState(() => {
    const checkboxesData = participants.reduce((result, participant) => {
      result[participant.id] = {
        love: false,
        friends: false,
      };
      return result;
    }, {});
    setCheckboxes(checkboxesData);
  }, [participants]);

  const handleCheckboxChange = (participantId, name) => {
    setCheckboxes({
      ...checkboxes,
      [participantId]: {
        ...checkboxes[participantId],
        [name]: !checkboxes[participantId][name],
      },
    });
  };

  const handleSubmitLikes = (event) => {
    event.preventDefault();
    const likesData = participants.map((participant) => ({
      [participant.id]: checkboxes[participant.id],
    }));
    console.log(likesData);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <p className={styles.love}>Love</p>
        <p className={styles.friends}>Friends</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmitLikes}>
        {participants.map((participant) => (
          <div className={styles.participantItem} key={participant.id}>
            <h2 className={styles.participantName}>
              {participant.firstName.charAt(0).toUpperCase() +
                participant.firstName.slice(1)}{" "}
              {participant.lastName.charAt(0).toUpperCase() +
                participant.lastName.slice(1)}
            </h2>
            <div className={styles.checkboxLove}>
              <Checkbox
                id={`love-${participant.id}`}
                checked={checkboxes[participant.id]?.love}
                onChange={() => handleCheckboxChange(participant.id, "love")}
              />
            </div>
            <div className={styles.checkboxFriends}>
              <Checkbox
                id={`friends-${participant.id}`}
                checked={checkboxes[participant.id]?.friends}
                onChange={() => handleCheckboxChange(participant.id, "friends")}
              />
            </div>
          </div>
        ))}
        <div className={styles.btnContainer}>
          <Button type="submit">
            <span>Submit</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ParticipantLikesForm;
