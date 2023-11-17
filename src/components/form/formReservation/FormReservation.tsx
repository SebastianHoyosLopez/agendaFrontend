import React, { useState } from "react";
import { NewReservation } from "@/interface";
import styles from "./formReservations.module.css"; 

interface ReservationFormProps {
  onReservationSubmit: (reservation: NewReservation) => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({
  onReservationSubmit,
}) => {
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [hour, setHour] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReservation: NewReservation = {
      place,
      date,
      description,
      hour,
    };

    onReservationSubmit(newReservation);

    setPlace("");
    setDate("");
    setDescription("");
    setHour("");
  };

  return (
    <div className={styles.form_container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Place:
          <input
            className={styles.input}
            type="text"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />
        </label>
        <label className={styles.label}>
          Date:
          <input
            className={styles.input}
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label className={styles.label}>
          Description:
          <input
            className={styles.input}
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label className={styles.label}>
          Hour:
          <input
            className={styles.input}
            type="text"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
          />
        </label>
        <button className={styles.button} type="submit">Reserve</button>
      </form>
    </div>
  );
};

export default ReservationForm;
