import Button from "../Button";
import styles from "../../../styles/ui/messages/BeforeDeletePopup.module.css";

const BeforeDeletePopup = (props) => {
  const { text, handleDelete, handleToggle } = props;
  return (
    <div className={styles.deletePopup}>
      <h3>{text}</h3>
      <div className={styles.buttonContainer}>
        <Button onClick={handleDelete}>yes</Button>
        <Button onClick={handleToggle}>no</Button>
      </div>
    </div>
  );
};

export default BeforeDeletePopup;
