import { Reservation } from "@/interface";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Table from "@/components/table/Table";
import Reserve from "@/components/form/formReservation/Reserve";
import styles from "./reservations.module.css";
import Link from "next/link";

const columns = [
  { label: "Place", key: "place" },
  { label: "Date", key: "date" },
  { label: "Description", key: "description" },
  { label: "Hour", key: "hour" },
];

const Reservations: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        if (!token) {
          setLoggedIn(false);
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
          setLoggedIn(false);
          console.log(
            "El token ha expirado. Redirigiendo a la página de inicio de sesión."
          );
          // Puedes redirigir o manejar el token expirado según tus necesidades
          return;
        }

        const data: Reservation[] | undefined = await response.json();
        setReservations(data ?? []);
        setLoggedIn(true);
      } catch (error) {
        console.error("Error al obtener las reservas", error);
        setLoggedIn(false);
      }
    };

    fetchReservations();

    // Limpia la suscripción al desmontar el componente
    return () => {
      setReservations([]);
      setLoggedIn(false);
    };
  }, [token]);

  const headers = new Headers();
  headers.append("agenda_token", token!);

  const handleDelete = (reservationId: string, relationId: string) => {
    // Lógica para llamar a la API y eliminar la reserva
    fetch(
      `http://localhost:4000/apiAgenda/reservations/delete/${reservationId}/${relationId}`,
      {
        method: "DELETE",
        headers: headers
      }
    ).then((response) => {
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
      {loggedIn ? (
        <>
          <div className={styles.container}>
            <div className={styles.form_container}>
              <h1>Reserve a Spot</h1>
              <Reserve />
            </div>
            <div className={styles.table_container}>
              <h1>Reservaciones</h1>
              <Table<Reservation>
                data={reservations}
                columns={columns}
                detailsLink={reservationsDetailsLink}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </>
      ) : (
        <p>Debes iniciar sesión para ver las reservas.<Link href={'login'}>IR A INICIAR SESIÓN</Link></p>
      )}
    </>
  );
};

export default Reservations;
