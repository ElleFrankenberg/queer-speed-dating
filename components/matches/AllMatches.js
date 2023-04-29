import { useState, useEffect } from "react";
import MatchResultLayout from "../layout/MatchResultLayout";

const AllMatches = (props) => {
  const { participants } = props;

  const [friendMatches, setFriendMatches] = useState([]);
  const [loveMatches, setLoveMatches] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const matches = await calculateMatches();
      setFriendMatches(matches.friendMatches);
      setLoveMatches(matches.loveMatches);
      setShowResults(true);
    };
    fetchData();
  }, [participants]);

  const calculateMatches = async () => {
    let newFriendMatches = new Set();
    let newLoveMatches = new Set();

    for (let i = 0; i < participants.length; i++) {
      const participantOne = participants[i];
      if (participantOne.likesData !== null) {
        for (let j = 0; j < participantOne.likesData.length; j++) {
          const participantOneLikesData = participantOne.likesData[j];
          const participantOnelikeDataKey = Object.keys(
            participantOneLikesData
          )[0];

          for (let k = 0; k < participants.length; k++) {
            const participantTwo = participants[k];
            if (participantTwo.likesData !== null) {
              for (let l = 0; l < participantTwo.likesData.length; l++) {
                const participantTwoLikesData = participantTwo.likesData[l];
                const participantTwolikeDataKey = Object.keys(
                  participantTwoLikesData
                )[0];

                if (
                  i !== k &&
                  participantOnelikeDataKey === participantTwo.id &&
                  participantTwolikeDataKey === participantOne.id &&
                  participantOneLikesData[participantOnelikeDataKey].friends &&
                  participantTwoLikesData[participantTwolikeDataKey].friends
                ) {
                  const matchOne = `${participantOne.firstName} ${participantOne.lastName}`;
                  const matchTwo = `${participantTwo.firstName} ${participantTwo.lastName}`;
                  const match = [matchOne, matchTwo].sort().join(" / ");

                  // Check if the match already exists in the set
                  if (!newFriendMatches.has(match)) {
                    newFriendMatches.add(match);
                  }
                }

                if (
                  i !== k &&
                  participantOnelikeDataKey === participantTwo.id &&
                  participantTwolikeDataKey === participantOne.id &&
                  participantOneLikesData[participantOnelikeDataKey].love &&
                  participantTwoLikesData[participantTwolikeDataKey].love
                ) {
                  const matchOne = `${participantOne.firstName} ${participantOne.lastName}`;
                  const matchTwo = `${participantTwo.firstName} ${participantTwo.lastName}`;
                  const match = [matchOne, matchTwo].sort().join(" / ");

                  // Check if the match already exists in the set
                  if (!newLoveMatches.has(match)) {
                    newLoveMatches.add(match);
                  }
                }
              }
            } else {
              console.log("one or more forms are not filled in");
            }
          }
        }
      } else {
        console.log("one or more forms are not filled in");
      }
    }

    return {
      friendMatches: Array.from(newFriendMatches),
      loveMatches: Array.from(newLoveMatches),
    };
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
