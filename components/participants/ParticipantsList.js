import { useState, useContext } from "react";
import Link from "next/link";
import Button from "../ui/Button";
import BeforeDeletePopup from "../ui/messages/BeforeDeletePopup";
import styles from "../../styles/participants/ParticipantsList.module.css";
import NotificationContext from "@/store/notificationContext";

const ParticipantsList = (props) => {
  const { participants } = props;
  const [showParticipantList, setShowParticipantList] = useState(true);
  const [popup, setPopup] = useState({
    show: false,
    id: null,
    message: "",
  });

  const notificationCxt = useContext(NotificationContext);

  const handleDelete = (id, message) => {
    setPopup({
      show: true,
      id: id !== "" ? id : null,
      message,
    });
  };

  const handleDeleteFalse = () => {
    setPopup({
      show: false,
      id: null,
    });
  };

  const handleDeleteTrue = () => {
    notificationCxt.showNotification({
      title: "sending",
      message: "deleting",
      status: "pending",
    });

    const bodyData = {
      participantId: popup.show && popup.id ? popup.id : null,
    };

    fetch("/api/participants", {
      method: "DELETE",
      body: JSON.stringify(bodyData),
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
          message: popup.id
            ? "The participant is deleted"
            : "All participants are",
          status: "success",
        });
        setPopup({
          show: false,
          id: null,
        });
      })
      .catch((error) => {
        notificationCxt.showNotification({
          title: "error!",
          message: error.message || "something went wrong",
          status: "error",
        });
      });
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
                    <span
                      onClick={() =>
                        handleDelete(participant.id, "Delete this participant?")
                      }
                    >
                      Delete
                    </span>
                  </Button>
                </li>
              ))}
            </ul>
            <Button>
              <span
                onClick={() => handleDelete("", "Delete all participants?")}
              >
                delete all participants
              </span>
            </Button>
          </>
        )}
        {popup.show && (
          <BeforeDeletePopup
            handleDeleteTrue={handleDeleteTrue}
            handleDeleteFalse={handleDeleteFalse}
            message={popup.message}
          />
        )}
      </div>
    </div>
  );
};
export default ParticipantsList;
