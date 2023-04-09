import { useContext, useEffect } from "react";

import styles from "../../styles/ui/Notification.module.css";
import NotificationContext from "../../store/notificationContext";

function Notification(props) {
  const notificationCtx = useContext(NotificationContext);

  useEffect(() => {
    if (notificationCtx.notification) {
      const timer = setTimeout(() => {
        notificationCtx.hideNotification();
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [notificationCtx.notification]);

  const { title, message, status } = props;

  let statusClasses = "";

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
    <div className={activeClasses} onClick={notificationCtx.hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
