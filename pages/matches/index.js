import { MongoClient } from "mongodb";
import AllMatches from "@/components/matches/AllMatches";

const matchesPage = (props) => {
  const { participants } = props;

  if (participants.length > 0) {
    return (
      <>
        <AllMatches participants={participants} />
      </>
    );
  }

  return (
    <div>
      <h1>there is no participants yet</h1>
    </div>
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

export default matchesPage;
