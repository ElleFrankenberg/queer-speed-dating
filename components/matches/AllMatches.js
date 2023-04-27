import { useState, useEffect } from "react";
import MatchResultLayout from "../layout/MatchResultLayout";

const AllMatches = (props) => {
  const { participants } = props;

  const [showResults, setShowResults] = useState(true);

  const [friendMatches, setFriendMatches] = useState([]);
  const [loveMatches, setLoveMatches] = useState([]);

  useEffect(() => {
    results();
  }, [friendMatches, loveMatches]);

  const results = () => {
    participants.forEach((participantOne, index1) => {
      if (participantOne.likesData !== null) {
        participantOne.likesData.forEach((participantOneLikesData) => {
          const participantOnelikeDataKey = Object.keys(
            participantOneLikesData
          )[0];

          participants.forEach((participantTwo, index2) => {
            if (participantTwo.likesData !== null) {
              participantTwo.likesData.forEach((participantTwoLikesData) => {
                const participantTwolikeDataKey = Object.keys(
                  participantTwoLikesData
                )[0];

                if (
                  index1 !== index2 &&
                  participantOnelikeDataKey === participantTwo.id &&
                  participantTwolikeDataKey === participantOne.id &&
                  participantOneLikesData[participantOnelikeDataKey].friends &&
                  participantTwoLikesData[participantTwolikeDataKey].friends
                ) {
                  const matchOne = `${participantOne.firstName} ${participantOne.lastName}`;
                  const matchTwo = `${participantTwo.firstName} ${participantTwo.lastName}`;
                  const match = [matchOne, matchTwo].sort().join(" / ");

                  // Check if the match already exists in the array
                  const existingIndex = friendMatches.findIndex(
                    (friendMatch) => friendMatch === match
                  );
                  if (existingIndex === -1) {
                    setFriendMatches([...friendMatches, match]);
                  }
                }

                if (
                  index1 !== index2 &&
                  participantOnelikeDataKey === participantTwo.id &&
                  participantTwolikeDataKey === participantOne.id &&
                  participantOneLikesData[participantOnelikeDataKey].love &&
                  participantTwoLikesData[participantTwolikeDataKey].love
                ) {
                  const matchOne = `${participantOne.firstName} ${participantOne.lastName}`;
                  const matchTwo = `${participantTwo.firstName} ${participantTwo.lastName}`;
                  const match = [matchOne, matchTwo].sort().join(" / ");

                  // Check if the match already exists in the array
                  const existingIndex = loveMatches.findIndex(
                    (loveMatch) => loveMatch === match
                  );
                  if (existingIndex === -1) {
                    setLoveMatches([...loveMatches, match]);
                  }
                }
              });
            } else {
              console.log("one or more forms are not filled in");
            }
          });
        });
      } else {
        console.log("one or more forms are not filled in");
      }
    });
  };
  console.log("Friend Matches:", friendMatches);
  console.log("Love Matches:", loveMatches);

  return (
    <>
      {showResults ? (
        <MatchResultLayout
          loveMatches={loveMatches}
          friendMatches={friendMatches}
        />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default AllMatches;
