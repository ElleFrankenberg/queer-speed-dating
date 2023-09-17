import { useState, useContext, useEffect } from "react";
import Checkbox from "../ui/Checkbox";
import Button from "../ui/Button";
import NotificationContext from "@/store/notificationContext";
import styles from "../../styles/inputs/ParticipantLikesForm.module.css";

const ParticipantLikesForm = (props) => {
  const { participants, participant } = props;
  const [checkboxes, setCheckboxes] = useState({});
  const [showForm, setShowForm] = useState(true);
  const notificationCxt = useContext(NotificationContext);

  const participantId = participant[0].id;

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

  useEffect(() => {
    const likesData = participant[0].likesData ?? [];
    if (likesData.length > 0) {
      setShowForm(false);
    }
  }, [participant]);

  const handleCheckboxChange = (participantId, checkbox) => {
    setCheckboxes({
      ...checkboxes,
      [participantId]: {
        ...checkboxes[participantId],
        [checkbox]: !checkboxes[participantId][checkbox],
      },
    });
  };

  const handleUpdateLikes = () => {
    setShowForm(true);
  };

  const handleSubmitLikes = (event) => {
    event.preventDefault();

    const likesData = participants.map((participant) => ({
      [participant.id]: checkboxes[participant.id],
    }));

    const participantLikesFormData = {
      participantId,
      likesData,
    };

    setShowForm(false);

    notificationCxt.showNotification({
      message: "Sending likes",
      status: "pending",
    });

    fetch("/api/participants", {
      method: "PATCH",
      body: JSON.stringify(participantLikesFormData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data) => {
          throw new Error(data.message || "something went wrong");
        });
      })
      .then((data) => {
        notificationCxt.showNotification({
          message: "Likes are sent!",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCxt.showNotification({
          message: error.message || "Sorry... Something went wrong",
          status: "error",
        });
      });
  };

  if (!showForm && !notificationCxt.notification) {
    return (
      <div className={styles.formIsFilledIn}>
        <div className={styles.btnContainer}>
          <Button type="button" onClick={handleUpdateLikes} color="green">
            <span>Update Likes</span>
          </Button>
        </div>
      </div>
    );
  }

  if (showForm && !notificationCxt.notification) {
    return (
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <h2 className={styles.participants}>Participants</h2>
          <h2 className={styles.love}>Love</h2>
          <h2 className={styles.friends}>Friends</h2>
        </div>

        <form className={styles.form} onSubmit={handleSubmitLikes}>
          <ul>
            {participants.map((participant) => (
              <li className={styles.participantItem} key={participant.id}>
                <h3 className={styles.participantName}>
                  {participant.firstName.charAt(0).toUpperCase() +
                    participant.firstName.slice(1)}{" "}
                  {participant.lastName.charAt(0).toUpperCase() +
                    participant.lastName.slice(1)}
                </h3>
                <div className={styles.checkboxLove}>
                  <Checkbox
                    id={`love-${participant.id}`}
                    checked={checkboxes[participant.id]?.love}
                    onChange={() =>
                      handleCheckboxChange(participant.id, "love")
                    }
                  />
                </div>
                <div className={styles.checkboxFriends}>
                  <Checkbox
                    id={`friends-${participant.id}`}
                    checked={checkboxes[participant.id]?.friends}
                    onChange={() =>
                      handleCheckboxChange(participant.id, "friends")
                    }
                  />
                </div>
              </li>
            ))}
            <li className={styles.btnContainer}>
              <Button type="submit" color="green">
                <span>Submit</span>
              </Button>
            </li>
          </ul>
        </form>
      </div>
    );
  }
};

export default ParticipantLikesForm;
