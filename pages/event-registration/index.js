import ParticipantForm from "@/components/inputs/ParticipantForm";
import Header from "@/components/layout/Header";

const eventRegistrationPage = () => {
  return (
    <>
      <Header participantForm={true} />
      <ParticipantForm />
    </>
  );
};

export default eventRegistrationPage;
