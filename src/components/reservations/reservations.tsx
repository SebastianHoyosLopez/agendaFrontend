import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import Table from "@/components/table/Table";
import styles from "./reservations.module.css";
import { Reservation } from "@/interface";
import { deleteReservationApi, getReservationsApi } from "@/api/api";
import ReservationForm from "../forms/formReservation/FormReservation";

const columns = [
  { label: "Place", key: "place" },
  { label: "Date", key: "date" },
  { label: "Description", key: "description" },
  { label: "Hour", key: "hour" },
];

const Reservations: React.FC = () => {
  const token = Cookies.get("token");

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getReservationsApi(token);

        data?.length && setReservations(data);
      } catch (error) {
        console.error("Error al obtener las reservas", error);
        setError("Error al obtener las reservas");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchReservations();
    }

    // Limpia la suscripción al desmontar el componente
    return () => {
      setReservations([]);
    };
  }, [token]);

  const handleDelete = async (reservationId: string, relationId: string) => {
    try {
      setLoading(true);
      setError(null);

      const result = await deleteReservationApi(reservationId, relationId, token);

      if (result?.success) {
        console.log("Reserva eliminada correctamente");
      } else {
        setError(result?.message || "Error al eliminar la reserva");
      }
    } finally {
      setLoading(false);
    }
  };

  const reservationsDetailsLink = (reservation: Reservation) =>
    `/reservations/${reservation.id}`;

  return (
    <>
      {token ? (
        <div className={styles.container}>
          <div className={styles.form_container}>
            <h1>Reserve a Spot</h1>
            <ReservationForm />
          </div>
          <div className={styles.table_container}>
            <h1>Reservaciones</h1>
            {loading && <p>Cargando...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && (
              <Table<Reservation>
                data={reservations}
                columns={columns}
                detailsLink={reservationsDetailsLink}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Reservations;