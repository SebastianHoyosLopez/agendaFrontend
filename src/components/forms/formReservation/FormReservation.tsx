import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import { NewReservation } from "@/interface";
import styles from "./formReservations.module.css";

interface ReservationFormProps {
  onReservationSubmit: (reservation: NewReservation) => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({
  onReservationSubmit,
}) => {
  const [place, setPlace] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [description, setDescription] = useState("");
  const [hour, setHour] = useState<string | null>(null);

  const handleTimeChange = (newHour: string | null) => {
    setHour(newHour);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date && hour) {
      const newReservation: NewReservation = {
        place,
        date: date.toISOString(), // Convert Date to string
        description,
        hour,
      };

      onReservationSubmit(newReservation);

      setPlace("");
      setDate(null);
      setDescription("");
      setHour(null);
    } else {
      // Handle the case when date or hour is not selected
      console.error("Please select date and hour");
    }
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
          <DatePicker
            className={styles.input}
            selected={date}
            onChange={(newDate: Date | null) => setDate(newDate)}
            showTimeSelect
            // timeFormat="HH:mm"
            // timeIntervals={15}
            // timeCaption="Time"
            dateFormat="MMMM d, yyyy h:mm aa"
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
          <TimePicker
            className={styles.input}
            value={hour}
            onChange={handleTimeChange}
          />
        </label>
        <button className={styles.button} type="submit">
          Reserve
        </button>
      </form>
    </div>
  );
};

export default ReservationForm;
