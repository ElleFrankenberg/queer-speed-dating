import styles from "../../styles/layout/ContentHeader.module.css";

const ContentHeader = ({ headline }) => {
  return (
    <div className={styles.contentHeader}>
      <h1>{headline}</h1>
    </div>
  );
};

export default ContentHeader;
