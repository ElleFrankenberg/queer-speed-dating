import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "@/components/layout/Header";
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
      <Header auth={true} />
      <AuthForm />
    </>
  );
}

export default AuthPage;
