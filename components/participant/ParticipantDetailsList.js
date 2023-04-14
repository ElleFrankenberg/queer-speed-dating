import styles from "../../styles/participant/ParticipantDetailsList.module.css";

const ParticipantDetailsList = (props) => {
  const { participantDetails } = props;
  console.log(participantDetails);
  return (
    <ul className={styles.ParticipantDetailsList}>
      {participantDetails.map((participantDetail) => (
        <li key={participantDetail.id}>
          <h1>
            {participantDetail.firstName.charAt(0).toUpperCase() +
              participantDetail.firstName.slice(1)}{" "}
            {participantDetail.lastName.charAt(0).toUpperCase() +
              participantDetail.lastName.slice(1)}
          </h1>
          <p>{participantDetail.email}</p>
          <p>{participantDetail.number}</p>
        </li>
      ))}
    </ul>
  );
};

export default ParticipantDetailsList;
