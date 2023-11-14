import Head from "next/head";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";

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
    return (
      <section className="progress-container">
        <CircularProgress />
      </section>
    );
  }

  return (
    <>
      <Head>
        <title>Authentication</title>
        <meta
          name="description"
          content="Loggin in or signing up as the administrator of the Queer Speed Dating App."
        />
        <link rel="icon" href="/assets/images/logo.png" />
      </Head>
      <AuthForm />
    </>
  );
}

export default AuthPage;
