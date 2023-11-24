import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import styles from "./detailsReservations.module.css";
import { getReservationApi } from "@/api/api";
import { Reservation } from "@/interface";

interface PropsData {
  id: string | undefined;
}

const DetailsReservation: React.FC<PropsData> = ({ id }) => {
  const token = Cookies.get("token");

  const [reservation, setReservation] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getReservationApi(id, token);

        if (data) {
          setReservation(data);
        } else {
          setError("No se encontró la reserva");
        }
      } catch (error) {
        console.error("Error al obtener la reserva", error);
        setError("Error al obtener la reserva");
      } finally {
        setLoading(false);
      }
    };

    if (token && id) {
      fetchReservation();
    }

    return () => {
      setReservation(undefined);
    };

  }, [id, token]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!reservation) {
    return <p>No se encontró la reserva</p>;
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.column} ${styles.column1}`}>
        <h1 className={styles.title}>Página dinámica</h1>
        <p>ID: {reservation.id}</p>
        <div className={styles.containerDetails}>
          <h2>{}</h2>
          <hr />
          <div className={styles.event_details}>
            <div>
              <h4>{reservation.place}</h4>
              <div>{reservation.description}</div>
              <div>{reservation.hour}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.column} ${styles.column2}`}>
        <form>
          <label>
            Nombre del pendiente:
            <input
              type="text"
              name="earringName"
              // value={formulario.earringName}
              // onChange={handleInputChange}
            />
          </label>

          <label>
            Descripción del pendiente:
            <textarea
              name="earringDescription"
              // value={formulario.earringDescription}
              // onChange={handleInputChange}
            />
          </label>

          <label>
            Nombre del responsable:
            <input
              type="text"
              name="responsibleName"
              // value={formulario.responsibleName}
              // onChange={handleInputChange}
            />
          </label>

          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default DetailsReservation;
