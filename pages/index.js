import Head from "next/head";
import Welcome from "@/components/home/Welcome";

export default function Home() {
  return (
    <>
      <Head>
        <title>Queer Speed Dating</title>
        <meta
          name="description"
          content="This website serves as a helpful tool to quickly and easily match participants in speed dating."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Welcome />
    </>
  );
}
