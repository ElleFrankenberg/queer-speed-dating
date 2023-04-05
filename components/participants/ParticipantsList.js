import { useState, useEffect } from "react";

const ParticipantsList = () => {
  const [participants, setParticipants] = useState();

  useEffect(() => {
    fetch(`/api/participants`)
      .then((response) => response.json())
      .then((data) => {
        console.log("participants data", data.participants);
        setParticipants(data.participants);
      });
  }, []);

  // console.log("hej", participants);

  return (
    <ul>
      <li>participant</li>
      {/* {participants.map((participant) => (
        <li key={participant._id}>{participant.firstName}</li>
      ))} */}
    </ul>
  );
};
export default ParticipantsList;
