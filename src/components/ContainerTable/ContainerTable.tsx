import React from "react";
import Table from "../table/Table";
import { Reservation, User } from "@/interface";

interface Column {
  label: string;
  key: string;
}

interface ContainerTableProps {
  loading: boolean;
  error: string | null;
  reservations: Reservation[];
  handleDelete?: (reservationId: string, relationId: string) => void;
  columns: Column[];
}

const ContainerTable: React.FC<ContainerTableProps> = ({
  loading,
  error,
  reservations,
  handleDelete,
  columns,
}) => {
  const reservationsDetailsLink = (reservation: Reservation) =>
    `/reservations/${reservation.id}`;


  console.log(reservations)
  return (
    <>
      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <Table<Reservation>
          data={reservations}
          detailsLink={reservationsDetailsLink}
          onDelete={handleDelete}
          columns={[
            ...columns,
          ]}
          renderAdditionalColumn={(reservation: Reservation) => (
            getEncargadoName(reservation)
          )}
        />
      )}
    </>
  );
};

const getEncargadoName = (reservation: Reservation): string => {
  const user = reservation.usersIncludes[0]?.user as User | undefined;
  return user ? `${user.firstName} ${user.lastName}` : "Sin encargado";
};

export default ContainerTable;
