import { useContext, useEffect } from "react";

import styles from "../../styles/ui/Notification.module.css";
import NotificationContext from "../../store/notificationContext";
import Button from "./Button";

function Notification(props) {
  const notificationCtx = useContext(NotificationContext);

  const {
    message,
    status,
    id,
    handleDeleteTrue,
    handleDeleteFalse,
    firstName,
    lastName,
  } = props;

  let statusClasses = "";

  if (status === "question") {
    statusClasses = styles.question;
  }

  if (status === "success") {
    statusClasses = styles.success;
  }

  if (status === "error") {
    statusClasses = styles.error;
  }

  if (status === "pending") {
    statusClasses = styles.pending;
  }

  const activeClasses = `${styles.notification} ${statusClasses}`;

  return (
    <div className={activeClasses}>
      {status !== "pending" && (
        <div className={styles.closeBtn}>
          <Button onClick={notificationCtx.hideNotification} color="white">
            <span>close</span>
          </Button>
        </div>
      )}
      <div className={styles.messageContainer}>
        <h2>{message}</h2>
      </div>
      {status === "question" && (
        <div className={styles.buttonContainer}>
          <div className={styles.yesBtn}>
            <Button
              onClick={() => handleDeleteTrue(id, firstName, lastName)}
              color="white"
            >
              <span>yes</span>
            </Button>
          </div>
          <Button onClick={handleDeleteFalse} color="white">
            <span>no</span>
          </Button>
        </div>
      )}
    </div>
  );
}

export default Notification;
