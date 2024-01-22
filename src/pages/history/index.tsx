import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { Reservation } from "@/interface";
import { getReservationHistoryApi } from "@/api/api";
import styles from "../../components/ContainerTable/reservations.module.css";
import ContainerTable from "@/components/ContainerTable/ContainerTable";

const columns = [
  { label: "Place", key: "place" },
  { label: "Date", key: "date" },
  { label: "Description", key: "description" },
  { label: "Hour", key: "hour" },
];

export default function History() {
  const token = Cookies.get("token");
  const [reservationsHistory, setReservationsHistory] = useState<Reservation[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchReservationsHistory = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getReservationHistoryApi(token);

        if (typeof data === "string") {
          // Aquí puedes manejar el mensaje de expiración
          console.log(data);
        } else if (data) {
          // Aquí puedes manejar los datos de reservas
          data?.length && setReservationsHistory(data);
        } else {
          // Aquí puedes manejar el caso en que no hay reservas
          console.log("No hay reservas");
        }
      } catch (error) {
        console.error("Error al obtener las reservas", error);
        setError("Error al obtener las reservas");
      } finally {
        setLoading(false);
      }
    };
    if (!token) {
      router.push("/login");
    } else {
      fetchReservationsHistory();
    }

    // Limpia la suscripción al desmontar el componente
    return () => {
      setReservationsHistory([]);
    };
  }, [router, token]);

  return (
    <div >
      <h1 className={styles.h1}>Historial de reservas</h1>
      <ContainerTable
        loading={loading}
        error={error}
        reservations={reservationsHistory}
        columns={columns}
      />
    </div>
  );
}
