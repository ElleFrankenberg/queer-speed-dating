import { useState, useEffect } from "react";
import MatchResultLayout from "../layout/MatchResultLayout";

import styles from "../../styles/matches/AllMatches.module.css";
import ContentHeader from "../layout/ContentHeader";

const AllMatches = (props) => {
  const { participants } = props;

  const [friendMatches, setFriendMatches] = useState([]);
  const [loveMatches, setLoveMatches] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [allFormsFilledIn, setAllFormsFilledIn] = useState({
    status: false,
    message: "",
  });

  console.log(allFormsFilledIn);

  useEffect(() => {
    const fetchData = async () => {
      const matches = await calculateMatches();
      if (!matches) return;
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
              return setAllFormsFilledIn({
                status: false,
                message: "One or more forms are not filled in yet.",
              });
            }
          }
        }
      } else {
        return setAllFormsFilledIn({
          status: false,
          message: "One or more forms are not filled in yet.",
        });
      }
    }

    setAllFormsFilledIn({
      status: true,
      message: "All Matches",
    });

    return {
      friendMatches: Array.from(newFriendMatches),
      loveMatches: Array.from(newLoveMatches),
    };
  };

  return (
    <section className={styles.allMatches}>
      <ContentHeader
        headline={
          participants.length > 0
            ? allFormsFilledIn.message
            : "No participants yet"
        }
      />
      {showResults && (
        <MatchResultLayout
          loveMatches={loveMatches}
          friendMatches={friendMatches}
        />
      )}
    </section>
  );
};

export default AllMatches;
