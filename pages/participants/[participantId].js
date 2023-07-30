import { MongoClient } from "mongodb";
import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/components/layout/Header";
import ParticipantDetailsList from "@/components/participant/ParticipantDetailsList";
import ParticipantLikesForm from "@/components/inputs/ParticipantLikesForm";
import ParticipantMatchList from "@/components/participant/ParticipantMatchList";

const ParticipantPage = (props) => {
  // Redirect away if NOT auth
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.replace("/auth");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  const { participant, participants } = props;

  console.log(participants);

  if (isLoading || !participant) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Header participant={true} />
      <ParticipantDetailsList participantDetails={participant} />
      {participants.lenght < 0 ? (
        <>
          <ParticipantLikesForm
            participants={participants}
            participant={participant}
          />
          <ParticipantMatchList
            participants={participants}
            participant={participant}
          />
        </>
      ) : (
        <div className="center">
          <p>Sorry, there is no other participants found.</p>
        </div>
      )}
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
          likesData: participant.likesData ? participant.likesData : null,
        };
      });

    const filteredParticipants = documents
      .filter((document) => document._id.toString() !== participantId)
      .map((participant) => {
        return {
          id: participant._id.toString(),
          firstName: participant.firstName,
          lastName: participant.lastName,
          email: participant.email,
          number: participant.number,
          likesData: participant.likesData ? participant.likesData : null,
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

export default ParticipantPage;
