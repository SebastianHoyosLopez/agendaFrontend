import React from "react";
import styles from "./detailsReservations.module.css";
import { Reservation } from "@/interface";


const Details: React.FC = () => {

  return (
    <div className={styles.container}>
      <div className={styles.column1}>
        <h2>Reserva </h2>
        <hr />
        <div className={styles.event_details}>
          <div>
            <h4>marinilla</h4>
            <div>cerca al pueblo</div>
            <div>12pm</div>
          </div>
        </div>
      </div>
      <div className={styles.column2}>
        <h2>Pendientes</h2>
        <ul>
          <li>Elemento A</li>
          <li>Elemento B</li>
          <li>Elemento C</li>
        </ul>
      </div>
    </div>
  );
};

export default Details;
