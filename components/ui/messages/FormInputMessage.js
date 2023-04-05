import styles from "../../../styles/ui/messages/FormInputMessage.module.css";
const InvalidInputMessage = (props) => {
  const { text } = props;
  return <p className={styles.message}>{text}</p>;
};
export default InvalidInputMessage;
