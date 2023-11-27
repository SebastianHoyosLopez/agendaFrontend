import DetailsReservation from "@/components/detailsReservation";
import { useRouter } from "next/router";

function DynamicPage() {
  const router = useRouter();
  const id = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id;

  return (
    <>
      <DetailsReservation id={id} />
    </>
  );
}

export default DynamicPage;
