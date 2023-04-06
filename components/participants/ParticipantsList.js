import Link from "next/link";

const ParticipantsList = (props) => {
  const { participants } = props;

  return (
    <ul>
      {participants.map((participant) => (
        <li key={participant.id}>
          <Link
            href={`/participants/${participant.firstName + participant.id}`}
          >
            <span>{`${
              participant.firstName.charAt(0).toUpperCase() +
              participant.firstName.slice(1)
            } ${
              participant.lastName.charAt(0).toUpperCase() +
              participant.lastName.slice(1)
            }`}</span>
            <span>{participant.email}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default ParticipantsList;
