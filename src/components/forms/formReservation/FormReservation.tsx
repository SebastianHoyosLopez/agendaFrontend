import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import { NewReservation } from "@/interface";
import styles from "./formReservations.module.css";
import { reservationSubmitApi } from "@/api/api";

const ReservationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    place: "",
    date: null as Date | null,
    description: "",
    hour: null as string | null,
  });

  const { place, date, description, hour } = formData;

  const [dayOfWeek, setDayOfWeek] = useState<string | null>(null);

  const handleTimeChange = (newHour: string | null) => {
    setFormData((prevData) => ({ ...prevData, hour: newHour }));
  };

  const showDayOfWeek = (newDate: Date | null) => {
    if (newDate) {
      const dayOfWeekString = newDate.toLocaleDateString(undefined, { weekday: "long" });
      setDayOfWeek(dayOfWeekString);
    } else {
      setDayOfWeek(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date && hour) {
      const newReservation: NewReservation = {
        place,
        date: date.toISOString().split('T')[0],
        description,
        hour,
      };

      reservationSubmitApi(newReservation);

      setFormData({
        place: "",
        date: null,
        description: "",
        hour: null,
      });

      setDayOfWeek(null); // Limpiar el día de la semana después de enviar la reserva
    } else {
      console.error("Please select date and hour");
      // Puedes mostrar un mensaje al usuario o realizar otra acción apropiada.
    }
  };

  return (
    <div className={styles.form_container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="placeInput">
          Place:
          <input
            id="placeInput"
            className={styles.input}
            type="text"
            value={place}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                place: e.target.value,
              }))
            }
          />
        </label>
        <label className={styles.label} htmlFor="dateInput">
          Date:
          <DatePicker
            id="dateInput"
            className={styles.input}
            selected={date}
            onChange={(newDate: Date | null) => {
              setFormData((prevData) => ({ ...prevData, date: newDate }));
              showDayOfWeek(newDate);
            }}
            showTimeSelect={false}
            dateFormat="MMMM d, yyyy"
          />
          {dayOfWeek && <p>Day of week: {dayOfWeek}</p>}
        </label>
        <label className={styles.label} htmlFor="descriptionInput">
          Description:
          <input
            id="descriptionInput"
            className={styles.input}
            type="text"
            value={description}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                description: e.target.value,
              }))
            }
          />
        </label>
        <label className={styles.label} htmlFor="hourInput">
          Hour:
          <TimePicker
            id="hourInput"
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
