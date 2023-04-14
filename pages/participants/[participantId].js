import { MongoClient } from "mongodb";
import ParticipantDetails from "@/components/participant/ParticipantDetails";

const participantPage = (props) => {
  const { participant, participants } = props;

  return (
    <>
      <ParticipantDetails />
    </>
  );
};

export async function getStaticProps(context) {
  const participantId = context.params.participantId;
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
        participant: "",
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
