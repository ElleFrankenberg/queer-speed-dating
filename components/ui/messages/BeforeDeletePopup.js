import Button from "../Button";
import styles from "../../../styles/ui/messages/BeforeDeletePopup.module.css";

const BeforeDeletePopup = (props) => {
  const { text, deletefunction, togglefunction } = props;
  return (
    <div className={styles.deletePopup}>
      <h3>{text}</h3>
      <div className={styles.buttonContainer}>
        <Button onClick={deletefunction}>yes</Button>
        <Button onClick={togglefunction}>no</Button>
      </div>
    </div>
  );
};

export default BeforeDeletePopup;
