import MatchResultLayout from "../layout/MatchResultLayout";

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
    <MatchResultLayout
      loveMatches={loveMatches}
      friendMatches={friendMatches}
    />
  );
};

export default ParticipantMatchList;
