import { useEffect } from "react"
import { useRouter } from "next/router";
import Cookies from "js-cookie";


export default function AboutUs() {
  const token = Cookies.get("token");
  const router = useRouter();

  useEffect(() => {
    if(!token) {
      router.push('/login')
    }
  }, [router, token])
  
  return (
    <h1>acerca de nosotros</h1>
  )
}
