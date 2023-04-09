import "@/styles/globals.css";
import Head from "next/head";
import Layout from "@/components/layout/Layout";
import { NotificationContextProvider } from "@/store/notificationContext";

export default function App({ Component, pageProps }) {
  return (
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
  );
}
