// api.ts
import { LoginResponse, Reservation } from "@/interface";
import Cookies from "js-cookie";

const API_BASE_URL = "http://localhost:4000/apiAgenda";

interface RequestOptions {
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit;
}

export const fetchWithToken = async (
  url: string,
  options: RequestOptions = {}
) => {
  const token = Cookies.get("token");
  const headers = new Headers({
    ...(options.headers || {}),
    agenda_token: token || "",
  });

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });
  return response;
};

// api.ts

export const getReservations = async (
  token: string | undefined
): Promise<Reservation[] | undefined> => {
  try {
    const headers = new Headers();
    headers.append("agenda_token", token ?? "");

    const response = await fetchWithToken("/reservations/all", {
      headers: headers,
    });

    if (response.status === 401) {
      console.log("El token ha expirado");
      return undefined;
    }

    if (response.status === 400) {
      console.log("No hay reservas");
      return undefined;
    }

    const data: Reservation[] | undefined = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener las reservas", error);
    return undefined;
  }
};

export const deleteReservation = async (
  reservationId: string,
  relationId: string,
  token: string | undefined
): Promise<{ success: boolean; message?: string }> => {
  try {
    const headers = new Headers();
    headers.append("agenda_token", token ?? "");

    const response = await fetchWithToken(
      `/reservations/delete/${reservationId}/${relationId}`,
      {
        method: "DELETE",
        headers: headers,
      }
    );

    if (response.ok) {
      console.log("Reserva eliminada con éxito");
      return { success: true };
    } else {
      console.error("Error al eliminar la reserva");
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || "Error al eliminar la reserva",
      };
    }
  } catch (error) {
    console.error("Error de red:", error);
    return { success: false, message: "Error de red al eliminar la reserva" };
  }
};

export const login = async (
    username: string,
    password: string
  ): Promise<LoginResponse | undefined> => {
    try {
      const response = await fetchWithToken(`/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const data: LoginResponse = await response.json();
        const token = data.accessToken;
  
        const userId = data.user.id;
  
        Cookies.set("userId", userId);
        Cookies.set("token", token);
  
        return data;
      } else {
        console.error("Inicio de sesión fallido");
        return undefined;
      }
    } catch (error) {
      console.error("Error al realizar la solicitud", error);
      return undefined;
    }
  };