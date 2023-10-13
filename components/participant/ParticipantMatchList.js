import MatchResultLayout from "../layout/MatchResultLayout";
import ContentHeader from "../layout/ContentHeader";

const ParticipantMatchList = (props) => {
  const { participant, participants } = props;

  const friendMatches = [];
  const loveMatches = [];

  participant.forEach((currentParticipant) => {
    if (currentParticipant.likesData !== null) {
      currentParticipant.likesData.forEach((currentParticipantLikeData) => {
        const currentParticipantlikeDataKey = Object.keys(
          currentParticipantLikeData
        )[0];
        participants.forEach((potentialMatch) => {
          if (potentialMatch.likesData !== null) {
            potentialMatch.likesData.forEach((potentialMatchLikeData) => {
              const potentialMatchLikeDataKey = Object.keys(
                potentialMatchLikeData
              )[0];
              if (
                currentParticipantlikeDataKey === potentialMatch.id &&
                potentialMatchLikeDataKey === currentParticipant.id &&
                currentParticipantLikeData[currentParticipantlikeDataKey]
                  .friends &&
                potentialMatchLikeData[potentialMatchLikeDataKey].friends
              ) {
                const friendMatch = `${potentialMatch.firstName} ${potentialMatch.lastName}`;
                friendMatches.push(friendMatch);
              }

              if (
                currentParticipantlikeDataKey === potentialMatch.id &&
                potentialMatchLikeDataKey === currentParticipant.id &&
                currentParticipantLikeData[currentParticipantlikeDataKey]
                  .love &&
                potentialMatchLikeData[potentialMatchLikeDataKey].love
              ) {
                const loveMatch = `${potentialMatch.firstName} ${potentialMatch.lastName}`;

                loveMatches.push(loveMatch);
              }
            });
          }
        });
      });
    }
  });

  return (
    <>
      <ContentHeader
        headline={
          loveMatches.length > 0 || friendMatches.length > 0
            ? "Matches"
            : "No matches yet"
        }
      />
      {loveMatches.length > 0 || friendMatches.length > 0 ? (
        <MatchResultLayout
          loveMatches={loveMatches}
          friendMatches={friendMatches}
        />
      ) : null}
    </>
  );
};

export default ParticipantMatchList;
