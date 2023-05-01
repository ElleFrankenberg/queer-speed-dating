import { MongoClient } from "mongodb";
import ParticipantsList from "../../components/participants/ParticipantsList";
import Header from "@/components/layout/Header";

const participantsPage = (props) => {
  const { participants } = props;
  return (
    <>
      <Header participants={true} />
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
        likesData: document.likesData ? document.likesData : null,
      };
    });
    client.close();

    return {
      props: {
        participants: allParticipants,
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

export default participantsPage;
