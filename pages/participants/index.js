const participantsPage = () => {
  return <h1>participants</h1>;
};

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}

export default participantsPage;
