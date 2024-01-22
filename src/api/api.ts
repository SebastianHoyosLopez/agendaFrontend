// api.ts
import { LoginResponse, NewReservation, Reservation } from "@/interface";
import Cookies from "js-cookie";

const API_BASE_URL = "http://localhost:4000/apiAgenda";

interface RequestOptions {
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit;
}

const fetchWithToken = async (url: string, options: RequestOptions = {}) => {
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

export const validateToken = async (): Promise<boolean> => {
  const token = Cookies.get("token");

  if (!token) {
    console.error("Token no encontrado en las cookies");
    return false;
  }

  try {
    const response = await fetchWithToken("/auth/validate-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.isValid;
    } else {
      console.error("Error al verificar el token:", response.statusText);
      return false;
    }
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    return false;
  }
};

export const getReservationHistoryApi = async (
  token: string | undefined
): Promise<Reservation[] | string | undefined> => {
  try {
    const headers = new Headers();
    headers.append("agenda_token", token ?? "");

    const response = await fetchWithToken("/reservations/history", {
      headers: headers,
    });

    if (response.status === 401) {
      console.log("El token ha expirado");
      return "El token ha expirado";
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


export const getReservationsApi = async (): Promise<Reservation[] | string | undefined> => {
  try {
    const response = await fetch(`${API_BASE_URL}/reservations/all`);

    if (response.status === 401) {
      console.log("El token ha expirado");
      return "El token ha expirado";
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
// export const getReservationsApi = async (
//   // token: string | undefined
// ): Promise<Reservation[] | string | undefined> => {
//   try {
//     const headers = new Headers();
//     // headers.append("agenda_token", token ?? "");

//     const response = await fetchWithToken("/reservations/all");

//     if (response.status === 401) {
//       console.log("El token ha expirado");
//       return "El token ha expirado";
//     }

//     if (response.status === 400) {
//       console.log("No hay reservas");
//       return undefined;
//     }

//     const data: Reservation[] | undefined = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error al obtener las reservas", error);
//     return undefined;
//   }
// };

export const getReservationApi = async (
  reservationId: string | undefined,
  token: string | undefined
) => {
  try {
    const headers = new Headers();
    headers.append("agenda_token", token ?? "");

    const response = await fetchWithToken(`/reservations/${reservationId}`, {
      headers: headers,
    });

    if (response.status === 401) {
      console.log("El token ha expirado");
      return undefined;
    }

    const data: Reservation[] | undefined = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener las reservas", error);
    return undefined;
  }
};

export const deleteReservationApi = async (
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

export const reservationSubmitApi = async (reservation: NewReservation) => {
  const userId = Cookies.get("userId");
  const token = Cookies.get("token");

  if (!userId || !token) {
    console.error("Error: No se pudo obtener userId o token de las cookies.");
    return;
  }

  try {
    const response = await fetchWithToken(
      `/reservations/create/userOwner/${userId}`,
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
      window.location.reload();
      // Puedes realizar acciones adicionales si es necesario
    } else {
      // Manejar errores de la creación de la reserva
      console.error("Error al crear la reserva");
    }
  } catch (error) {
    console.error("Error al enviar la reserva al servidor", error);
  }
};
