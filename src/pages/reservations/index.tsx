import { Reservation } from "@/interface";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Reservations: React.FC = () => {

  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    // Función para obtener las reservas
    const fetchReservations = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/apiAgenda/reservations/all"
        );
        const data: Reservation[] = await response.json();
        setReservations(data);
      } catch (error) {
        console.error("Error al obtener las reservas", error);
      }
    };

    // Llama a la función para obtener las reservas
    fetchReservations();
  }, []); // El segundo parámetro del useEffect indica que se ejecutará solo una vez al montar el componente

  console.log(reservations);

  return (
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
  );
};

export default Reservations;
