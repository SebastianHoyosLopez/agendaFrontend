import { Reservation } from "@/interface";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Table from "@/components/table/Table";
import Reserve from "@/components/form/formReservation/Reserve";
import styles from "./reservations.module.css";
import { useRouter } from "next/router";

const columns = [
  { label: "Place", key: "place" },
  { label: "Date", key: "date" },
  { label: "Description", key: "description" },
  { label: "Hour", key: "hour" },
];

const Reservations: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const token = Cookies.get("token");
  const router = useRouter();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        if (!token) {
          router.push("/login");
          return;
        }
        const response = await fetch(
          "http://localhost:4000/apiAgenda/reservations/all",
          {
            headers: {
              agenda_token: token,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 401) {
          console.log(
            "El token ha expirado. Redirigiendo a la página de inicio de sesión."
          );
          return;
        }

        if (response.status === 400) {
          console.log("no hay reservas");
          return;
        }

        const data: Reservation[] | undefined = await response.json();
        setReservations(data ?? []);
      } catch (error) {
        console.error("Error al obtener las reservas", error);
      }
    };

    fetchReservations();

    // Limpia la suscripción al desmontar el componente
    return () => {
      setReservations([]);
    };
  }, [token, router]);

  const headers = new Headers();
  headers.append("agenda_token", token!);

  const handleDelete = (reservationId: string, relationId: string) => {
    // Lógica para llamar a la API y eliminar la reserva
    fetch(
      `http://localhost:4000/apiAgenda/reservations/delete/${reservationId}/${relationId}`,
      {
        method: "DELETE",
        headers: headers,
      }
    )
      .then((response) => {
        if (response.ok) {
          console.log(response, "Reserva eliminada con éxito");
        } else {
          console.error("Error al eliminar la reserva");
        }
      })
      .catch((error) => {
        console.error("Error de red:", error);
      });
  };

  const reservationsDetailsLink = (reservation: Reservation) =>
    `/reservations/${reservation.id}`;

  // const deleteItem = (reservation: Reservation) => reservation.id;

  return (
    <>
      <>
        <div className={styles.container}>
          <div className={styles.form_container}>
            <h1>Reserve a Spot</h1>
            <Reserve />
          </div>
          <div className={styles.table_container}>
            <h1>Reservaciones</h1>
            {reservations.length > 0 ? (
              <Table<Reservation>
                data={reservations}
                columns={columns}
                detailsLink={reservationsDetailsLink}
                onDelete={handleDelete}
              />
            ) : (
              <p>no hay reservas</p>
            )}
          </div>
        </div>
      </>
    </>
  );
};

export default Reservations;
