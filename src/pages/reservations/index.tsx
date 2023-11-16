import { Reservation } from "@/interface";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Table from "@/components/table/Table";
import Reserve from "@/components/form/formReservation/Reserve";
import styles from './styles.module.css'; // Ajusta la ruta según tu estructura de archivos

const columns = [
  { label: "Place", key: "place" },
  { label: "Date", key: "date" },
  { label: "Description", key: "description" },
  { label: "Hour", key: "hour" },
];

const Reservations: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = Cookies.get("token");

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
  }, []);

  const reservationsDetailsLink = (reservation: Reservation) =>
    `/reservations/${reservation.id}`;

  return (
    <>
      {loggedIn ? (
        <>
          <div className={styles.container}>
            <div className={styles.form_container}>
              <h1 style={{ textAlign: "center" }}>Reserve a Spot</h1>
              <Reserve />
            </div>
            <div className={styles.table_container}>
              <h1 style={{ textAlign: "center" }}>Reservaciones</h1>
              <Table<Reservation>
                data={reservations}
                columns={columns}
                detailsLink={reservationsDetailsLink}
              />
            </div>
          </div>
        </>
      ) : (
        <p>Debes iniciar sesión para ver las reservas.</p>
      )}
    </>
  );
};

export default Reservations;
