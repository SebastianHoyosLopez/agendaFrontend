import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import styles from "./detailsReservations.module.css";
import { getReservationApi } from "@/api/api";
import Details from "./Details";
import { FormEarringsCreate } from "../forms/formEarrings";

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
        <div className={styles.containerDetails}>
          <Details reservation={reservation} />
        </div>
      </div>
      <div className={`${styles.column} ${styles.column2}`}>
        <FormEarringsCreate />
      </div>
    </div>
  );
};

export default DetailsReservation;
