import styles from "../../styles/participant/ParticipantDetailsList.module.css";

const ParticipantDetailsList = (props) => {
  const { participantDetails } = props;
  return (
    <ul className={styles.participantDetailsList}>
      {participantDetails.map((participantDetail) => (
        <li key={participantDetail.id}>
          <h1>
            {participantDetail.firstName} {participantDetail.lastName}
          </h1>
          <p>{participantDetail.email}</p>
          <p>{participantDetail.number}</p>
        </li>
      ))}
    </ul>
  );
};

export default ParticipantDetailsList;
