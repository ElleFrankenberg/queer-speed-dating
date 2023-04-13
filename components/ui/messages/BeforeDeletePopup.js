import Button from "../Button";
import styles from "../../../styles/ui/messages/BeforeDeletePopup.module.css";

const BeforeDeletePopup = (props) => {
  const { message, handleDeleteTrue, handleDeleteFalse } = props;
  return (
    <div className={styles.deletePopup}>
      <h3>{message}</h3>
      <div className={styles.buttonContainer}>
        <Button onClick={handleDeleteTrue}>yes</Button>
        <Button onClick={handleDeleteFalse}>no</Button>
      </div>
    </div>
  );
};

export default BeforeDeletePopup;
