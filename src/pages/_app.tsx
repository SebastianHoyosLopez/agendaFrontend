import { AuthProvider } from "@/components/Auth/AuthContext";
import Navbar from "@/components/Navbar";
import { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  )
}