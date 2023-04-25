import { useState, useEffect } from "react";
import MatchResultLayout from "../layout/MatchResultLayout";

const AllMatches = (props) => {
  const { participants } = props;

  const [showResults, setShowResults] = useState(false);

  console.log(participants);

  const friendMatches = [];
  const loveMatches = [];

  useEffect(() => {
    results();
  }, []);

  const results = () => {
    participants.forEach((participantOne, index1) => {
      if (participantOne.likesData !== null) {
        participantOne.likesData.forEach((participantOneLikesData, i) => {
          const participantOnelikeDataKey = Object.keys(
            participantOneLikesData
          )[0];
          console.log(
            "participant 1",
            participantOne.firstName,
            participantOnelikeDataKey
          );

          participants.forEach((participantTwo, index2) => {
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
                console.log(
                  "participant 2",
                  participantTwo.firstName,
                  participantTwolikeDataKey
                );
                const friendMatch = `${
                  participantOne.firstName.charAt(0).toUpperCase() +
                  participantOne.firstName.slice(1)
                } ${
                  participantOne.lastName.charAt(0).toUpperCase() +
                  participantOne.lastName.slice(1)
                } / ${
                  participantTwo.firstName.charAt(0).toUpperCase() +
                  participantTwo.firstName.slice(1)
                } ${
                  participantTwo.lastName.charAt(0).toUpperCase() +
                  participantTwo.lastName.slice(1)
                }`;
                friendMatches.push(friendMatch);
                // console.log(
                //   `${participantOne.firstName} ${participantOne.lastName} has a likeData key that matches ${participant2.firstName} ${participant2.lastName}'s id.`
                // );
              }
            });
          });
        });

        console.log(friendMatches);

        setShowResults(true);
      } else {
        console.log("one or more formes are not filled in");
        setShowResults(false);
      }
    });
  };

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
