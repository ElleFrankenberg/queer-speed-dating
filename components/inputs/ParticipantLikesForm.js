import styles from "../../styles/inputs/ParticipantLikesForm.module.css";
import Button from "../ui/Button";
const ParticipantLikesForm = (props) => {
  const { participants } = props;

  const submitLikesHandler = (event) => {
    event.preventDefault();
    console.log("submit");
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <p className={styles.love}>Love</p>
        <p className={styles.friend}>Friend</p>
      </div>
      <form className={styles.form} onSubmit={submitLikesHandler}>
        {participants.map((participant) => (
          <div className={styles.participantItem} key={participant.id}>
            <p>
              {participant.firstName.charAt(0).toUpperCase() +
                participant.firstName.slice(1)}{" "}
              {participant.lastName.charAt(0).toUpperCase() +
                participant.lastName.slice(1)}
            </p>
            <p className={styles.checkboxLove}>checkbox</p>
            <p className={styles.checkboxFriend}>checkbox</p>
          </div>
        ))}
        <div className={styles.btnContainer}>
          <Button>
            <span>Submit</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ParticipantLikesForm;
