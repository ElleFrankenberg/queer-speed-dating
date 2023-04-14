import { MongoClient } from "mongodb";
import ParticipantDetailsList from "@/components/participant/ParticipantDetailsList";
import ParticipantLikesForm from "@/components/inputs/ParticipantLikesForm";

const participantPage = (props) => {
  const { participant, participants } = props;

  if (!participant) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <ParticipantDetailsList participantDetails={participant} />
      <ParticipantLikesForm participants={participants} />
    </>
  );
};

export async function getStaticProps(context) {
  const participantId = context.params.participantId;
  try {
    const client = await MongoClient.connect(process.env.DB_URL);
    const db = client.db();
    const documents = await db.collection("participants").find().toArray();
    const participant = documents
      .filter((document) => document._id.toString() === participantId)
      .map((participant) => {
        return {
          id: participant._id.toString(),
          firstName: participant.firstName,
          lastName: participant.lastName,
          email: participant.email,
          number: participant.number,
        };
      });

    const filteredParticipants = documents
      .filter((document) => document._id.toString() !== participantId)
      .map((document) => {
        return {
          id: document._id.toString(),
          firstName: document.firstName,
          lastName: document.lastName,
          email: document.email,
          number: document.number,
        };
      });

    client.close();
    return {
      props: {
        participant: participant,
        participants: filteredParticipants,
      },
      revalidate: 30,
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        participants: [],
      },
      revalidate: 30,
    };
  }
}

export async function getStaticPaths() {
  try {
    const client = await MongoClient.connect(process.env.DB_URL);
    const db = client.db();
    const documents = await db.collection("participants").find().toArray();

    const paths = documents.map((document) => ({
      params: { participantId: document._id.toString() },
    }));
    client.close();

    return {
      paths: paths,
      fallback: "blocking",
    };
  } catch (error) {
    console.log(error);
  }
}

export default participantPage;
