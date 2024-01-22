import { AuthProvider } from "@/components/Auth/AuthContext";
import Navbar from "@/components/NavbarMenu/index";
import { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <AuthProvider>
        <Navbar />
        {/* <Authenticator> */}
          <Component {...pageProps} />
        {/* </Authenticator> */}
      </AuthProvider>
    </>
  );
}
