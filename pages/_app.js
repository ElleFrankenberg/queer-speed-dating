import "@/styles/globals.css";
import Head from "next/head";
import Layout from "@/components/layout/Layout";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { NotificationContextProvider } from "@/store/notificationContext";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();

  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <NotificationContextProvider>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Header page={router.pathname} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Footer />
      </NotificationContextProvider>
    </SessionProvider>
  );
}
