import React from "react";
import Cookies from "js-cookie";
import FormReservation from "./FormReservation";
import { NewReservation, Reservation } from "@/interface";

const Reserve: React.FC = () => {
  const handleReservationSubmit = async (reservation: NewReservation) => {
    const userId = Cookies.get("userId");
    const token = Cookies.get("token");

    console.log(userId);

    if (!userId || !token) {
      console.error("Error: No se pudo obtener userId o token de las cookies.");
      return;
    }

    try {
      // Lógica para enviar la reserva al endpoint
      const response = await fetch(
        `http://localhost:4000/apiAgenda/reservations/create/userOwner/${userId}`,
        {
          method: "POST",
          headers: {
            agenda_token: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reservation),
        }
      );

      if (response.ok) {
        // Reserva creada con éxito
        const createdReservation: Reservation = await response.json();
        console.log("Reserva creada con éxito:", createdReservation);
        // Puedes realizar acciones adicionales si es necesario
      } else {
        // Manejar errores de la creación de la reserva
        console.error("Error al crear la reserva");
      }
    } catch (error) {
      console.error("Error al enviar la reserva al servidor", error);
    }
  };

  return <FormReservation onReservationSubmit={handleReservationSubmit} />;
};

export default Reserve;
