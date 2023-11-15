import { Reservation } from "@/interface";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Reservations: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Función para obtener las reservas
    const fetchReservations = async () => {
      try {
        // Obtén el token de las cookies
        const token = Cookies.get("token");

        // Verifica si hay un token
        if (token) {
          // Realiza la solicitud al backend para obtener las reservas
          const response = await fetch(
            "http://localhost:4000/apiAgenda/reservations/all",
            {
              headers: {
                agenda_token: token,
                "Content-Type": "application/json",
              },
            }
          );

          // Verifica el estado de la respuesta
          if (response.status === 401) {
            // El token ha expirado
            setLoggedIn(false);
            // Maneja el caso específico de token expirado aquí, por ejemplo, redirige a la página de inicio de sesión
            console.log(
              "El token ha expirado. Redirigiendo a la página de inicio de sesión."
            );
          } else {
            // El token es válido, obtén los datos de las reservas
            const data: Reservation[] = await response.json();
            setReservations(data);
            setLoggedIn(true);
          }
        } else {
          // No hay token, el usuario no ha iniciado sesión
          setLoggedIn(false);
        }
      } catch (error) {
        console.error("Error al obtener las reservas", error);
        setLoggedIn(false);
      }
    };

    // Llama a la función para obtener las reservas
    fetchReservations();
  }, []); // El segundo parámetro del useEffect indica que se ejecutará solo una vez al montar el componente

  console.log(reservations);

  return (
    <>
      {loggedIn ? (
        <>
          <h1>Reservations</h1>
          <table>
            <thead>
              <tr>
                <th>Place</th>
                <th>Date</th>
                <th>Description</th>
                <th>Hour</th>
                <th>Detalles</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td>{reservation.place}</td>
                  <td>{reservation.date}</td>
                  <td>{reservation.description}</td>
                  <td>{reservation.hour}</td>
                  <td>
                    <Link href={`/reservations/${reservation.id}`}>Detalles</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>Debes iniciar sesión para ver las reservas.</p>
      )}
    </>
  );
};

export default Reservations;
