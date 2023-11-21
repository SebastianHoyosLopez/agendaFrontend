import DetailsReservation from "@/components/detailsReservation/DetailsReservation";
import { useRouter } from "next/router";

function DynamicPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <p>ID: {id}</p>
      <DetailsReservation />
    </div>
  );
}

export default DynamicPage;
