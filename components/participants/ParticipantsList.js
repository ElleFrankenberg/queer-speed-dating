import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import Button from "../ui/Button";
import styles from "../../styles/participants/ParticipantsList.module.css";
import NotificationContext from "@/store/notificationContext";

const ParticipantsList = (props) => {
  const { participants } = props;
  const [showParticipantList, setShowParticipantList] = useState(true);

  const notificationCxt = useContext(NotificationContext);

  useEffect(() => {
    if (!notificationCxt.notification) {
      setShowParticipantList(true);
    }
  }, [notificationCxt.notification]);

  const handleDelete = (id, message, firstName, lastName) => {
    setShowParticipantList(false);

    notificationCxt.showNotification({
      message: message,
      status: "question",
      id: id,
      firstName: firstName,
      lastName: lastName,
      handleDeleteTrue: handleDeleteTrue,
      handleDeleteFalse: handleDeleteFalse,
    });
  };

  const handleDeleteFalse = () => {
    setShowParticipantList(true);
    notificationCxt.hideNotification();
  };

  const handleDeleteTrue = (id, firstName, lastName) => {
    notificationCxt.showNotification({
      message: "Deleting",
      status: "pending",
    });

    const bodyData = {
      participantId: id ? id : null,
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
          message: id
            ? `${firstName} ${lastName} is deleted`
            : "All participants are deleted",
          status: "success",
        });
        setShowParticipantList(!showParticipantList);
      })
      .catch((error) => {
        notificationCxt.showNotification({
          message: error.message || "something went wrong",
          status: "error",
        });
      });
  };

  return (
    <div className={styles.participants}>
      <div className={styles.participantListContainer}>
        {showParticipantList && !notificationCxt.notification && (
          <>
            {participants.length > 0 ? (
              <h1>All Participants</h1>
            ) : (
              <h1>No Participants yet</h1>
            )}

            <ul className={styles.participantList}>
              {participants.map((participant) => (
                <li key={participant.id} className={styles.participantListItem}>
                  <Link href={`/participants/${participant.id}`}>
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
                        handleDelete(
                          participant.id,
                          `Delete ${
                            participant.firstName.charAt(0).toUpperCase() +
                            participant.firstName.slice(1)
                          } ${
                            participant.lastName.charAt(0).toUpperCase() +
                            participant.lastName.slice(1)
                          }?`,
                          participant.firstName.charAt(0).toUpperCase() +
                            participant.firstName.slice(1),
                          participant.lastName.charAt(0).toUpperCase() +
                            participant.lastName.slice(1)
                        )
                      }
                    >
                      Delete
                    </span>
                  </Button>
                </li>
              ))}
            </ul>
            {participants.length > 0 && (
              <Button>
                <span
                  onClick={() => handleDelete("", "Delete all participants?")}
                >
                  delete all participants
                </span>
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default ParticipantsList;
