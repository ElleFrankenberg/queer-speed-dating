import { MongoClient } from "mongodb";
import { getSession } from "next-auth/react";
import AllMatches from "@/components/matches/AllMatches";
import Header from "@/components/layout/Header";

const matchesPage = (props) => {
  const { participants } = props;

  if (participants.length > 0) {
    return (
      <>
        <Header matches={true} />
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

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

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
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        participants: [],
      },
    };
  }
}

export default matchesPage;
