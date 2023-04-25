import { useContext } from "react";
import Notification from "../ui/Notification";
import NotificationContext from "../../store/notificationContext";

function Layout(props) {
  const notificationCtx = useContext(NotificationContext);

  const activeNotification = notificationCtx.notification;

  return (
    <>
      <main onClick={activeNotification && notificationCtx.hideNotification}>
        {props.children}
      </main>
      {activeNotification && (
        <Notification
          message={activeNotification.message}
          status={activeNotification.status}
          id={activeNotification.id}
          firstName={activeNotification.firstName}
          lastName={activeNotification.lastName}
          handleDeleteTrue={activeNotification.handleDeleteTrue}
          handleDeleteFalse={activeNotification.handleDeleteFalse}
        />
      )}
    </>
  );
}

export default Layout;
