import { MongoClient } from "mongodb";
import ParticipantsList from "@/components/participants/participantsList";

const participantsPage = (props) => {
  const { participants } = props;
  return (
    <>
      <ParticipantsList participants={participants} />
    </>
  );
};

export async function getStaticProps() {
  try {
    const client = await MongoClient.connect(process.env.DB_URL);

    const db = client.db();
    const documents = await db.collection("participants").find().toArray();

    const allParticipants = documents.map((document) => {
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
        participants: allParticipants,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        participants: [],
      },
      revalidate: 60,
    };
  }
}

export default participantsPage;
