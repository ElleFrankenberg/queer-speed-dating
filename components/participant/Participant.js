import { useState, useEffect, useContext } from "react";
import ParticipantDetailsList from "@/components/participant/ParticipantDetailsList";
import ParticipantLikesForm from "@/components/inputs/ParticipantLikesForm";
import ParticipantMatchList from "@/components/participant/ParticipantMatchList";
import NotificationContext from "@/store/notificationContext";

import styles from "@/styles/participant/Participant.module.css";

const Participant = ({ participant, participants }) => {
  const [showParticipant, setShowParticipant] = useState(true);
  const notificationCxt = useContext(NotificationContext);

  useEffect(() => {
    if (!notificationCxt.notification) {
      setShowParticipant(true);
    }
  }, [notificationCxt.notification]);

  return (
    <section className={styles.participant}>
      {showParticipant && !notificationCxt.notification && (
        <>
          <ParticipantDetailsList participantDetails={participant} />
          {participants.length > 0 ? (
            <ParticipantLikesForm
              participants={participants}
              participant={participant}
            />
          ) : (
            <div className="center">
              <p>Sorry, there is no other participants found.</p>
            </div>
          )}
          <ParticipantMatchList
            participants={participants}
            participant={participant}
          />
        </>
      )}
    </section>
  );
};
export default Participant;
