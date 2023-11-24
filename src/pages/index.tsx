import { useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import "./home.css";
import { useRouter } from "next/router";

export default function Home() {
  const token = Cookies.get("token");
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  return (
    <>
      {token ? (
        <>
          <h1>css3 carousel</h1>

          <div className="carousel">
            <div className="holder">
              <p>montar cancion </p>
              <p>montar cancion </p>
              <p>montar cancion </p>
              <p>montar cancion </p>
              <p>montar cancion </p>
              <p>montar cancion </p>
              <p>montar cancion </p>
              <p>montar cancion </p>
              <p>montar cancion </p>
              <p>montar cancion </p>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
