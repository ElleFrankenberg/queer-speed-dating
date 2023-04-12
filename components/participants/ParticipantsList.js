import { useState, useContext } from "react";
import Link from "next/link";
import Button from "../ui/Button";
import BeforeDeletePopup from "../ui/messages/BeforeDeletePopup";
import styles from "../../styles/participants/ParticipantsList.module.css";
import NotificationContext from "@/store/notificationContext";

const ParticipantsList = (props) => {
  const { participants } = props;
  const [showParticipantList, setShowParticipantList] = useState(true);
  const [showDeleteAllPopup, setShowDeleteAllPopup] = useState(false);
  const [showDeleteOnePopup, setShowDeleteOnePopup] = useState(false);

  const notificationCxt = useContext(NotificationContext);

  const toggleDeleteAllPopup = () => {
    setShowParticipantList(!showParticipantList);
    setShowDeleteAllPopup(!showDeleteAllPopup);
  };
  const toggleDeleteOnePopup = () => {
    setShowParticipantList(!showParticipantList);
    setShowDeleteOnePopup(!showDeleteOnePopup);
  };

  const deleteAllParticipants = () => {
    notificationCxt.showNotification({
      title: "sending",
      message: "deleting",
      status: "pending",
    });

    fetch("/api/participants", {
      method: "DELETE",
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
          title: "success!",
          message: "All participants are deleted",
          status: "success",
        });
        setShowParticipantList(!showParticipantList);
        setShowDeleteAllPopup(!showDeleteAllPopup);
      })
      .catch((error) => {
        notificationCxt.showNotification({
          title: "error!",
          message: error.message || "something went wrong",
          status: "error",
        });
      });
  };

  const deleteOneParticipants = () => {
    console.log("delete one");
  };

  return (
    <div className={styles.participants}>
      <div className={styles.participantListContainer}>
        {showParticipantList && (
          <>
            {participants.length > 0 ? (
              <h1>All Participants</h1>
            ) : (
              <h1>No Participants yet</h1>
            )}

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
                    <span onClick={toggleDeleteOnePopup}>Delete</span>
                  </Button>
                </li>
              ))}
            </ul>
            <Button>
              <span onClick={toggleDeleteAllPopup}>
                delete all participants
              </span>
            </Button>
          </>
        )}
        {!showParticipantList && showDeleteAllPopup && (
          <BeforeDeletePopup
            text="delete all?"
            handleDelete={deleteAllParticipants}
            handleToggle={toggleDeleteAllPopup}
          />
        )}
        {!showParticipantList && showDeleteOnePopup && (
          <BeforeDeletePopup
            text="delete one?"
            handleDelete={deleteOneParticipants}
            handleToggle={toggleDeleteOnePopup}
          />
        )}
      </div>
    </div>
  );
};
export default ParticipantsList;
