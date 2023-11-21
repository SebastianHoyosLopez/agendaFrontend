import { AuthProvider } from "@/components/Auth/AuthContext";
import Navbar from "@/components/Navbar";
import { AppProps } from "next/app";
import Head from "next/head";
import Authenticator from "@/components/Auth/Authenticator";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <Head><link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        /> </Head>
        <Authenticator>
          <Navbar />
          <Component {...pageProps} />
        </Authenticator>
      </AuthProvider>
    </>
  )
}