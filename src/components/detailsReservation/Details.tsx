import React from "react";
import styles from "./detailsReservations.module.css";
import { Earring, Reservation } from "@/interface";

interface DetailsProps {
  reservation: Reservation;
}

const Details: React.FC<DetailsProps> = ({ reservation }) => {
  console.log(reservation);

  const earrings: Earring[] = reservation.earrings;
  return (
    <div className={styles.container}>
      <div className={styles.column1}>
        <h2>Reserva </h2>
        <hr />
        <div className={styles.event_details}>
          <div>
            <h4>{reservation.place}</h4>
            <div>{reservation.description}</div>
            <div>{reservation.hour}</div>
          </div>
        </div>
      </div>
      <div className={styles.column2}>
        <h2>Pendientes</h2>
        <ul>
          {/* {earrings.map((earring) => (
            <li key={earring.id}>
              <strong>Nombre:</strong> {earring.earringName}
              <br />
              <strong>Descripción:</strong> {earring.earringDescription}
              <br />
              <strong>Responsable:</strong> {earring.responsibleName}
              <br />
              <strong>Estado:</strong> {earring.status}
              <br />
              {/* Agrega más información según la estructura del Earring */}
              <hr />
            {/* </li>} */}
          {/* ))} */}
        </ul>
      </div>
    </div>
  );
};

export default Details;
