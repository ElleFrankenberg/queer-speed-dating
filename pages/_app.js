import "@/styles/globals.css";
import Head from "next/head";
import Layout from "@/components/layout/Layout";
import { NotificationContextProvider } from "@/store/notificationContext";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <NotificationContextProvider>
        <Layout>
          <Head>
            <title>Queer speed dation</title>
            <meta name="description" content="Queer speed dating" />
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
          </Head>
          <Component {...pageProps} />
        </Layout>
      </NotificationContextProvider>
    </SessionProvider>
  );
}
