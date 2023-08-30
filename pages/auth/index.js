import Head from "next/head";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

import AuthForm from "@/components/inputs/AuthForm";

function AuthPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <p className="center">Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>Authentication</title>
        <meta
          name="description"
          content="Loggin in or signing up as the administrator of the Queer Speed Dating App."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthForm />
    </>
  );
}

export default AuthPage;
