import Head from "next/head";
import { MongoClient } from "mongodb";
import { getSession } from "next-auth/react";
import ParticipantsList from "../../components/participants/ParticipantsList";

const ParticipantsPage = (props) => {
  const { participants } = props;
  return (
    <>
      <Head>
        <title>All Participants</title>
        <meta
          name="description"
          content="This page shows all participants in the database."
        />
        <link rel="icon" href="/assets/images/logo.png" />
      </Head>
      <ParticipantsList participants={participants} />
    </>
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
        email: document.email,
        number: document.number,
        likesData: document.likesData ? document.likesData : null,
      };
    });
    client.close();

    return {
      props: {
        participants: allParticipants,
        session: session,
      },
    };
  } catch (error) {
    return {
      props: {
        participants: [],
      },
    };
  }
}

export default ParticipantsPage;
