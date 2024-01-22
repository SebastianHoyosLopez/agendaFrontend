import React, { useState } from "react";
import Link from "next/link";
import "./table.css";
import { Reservation, User } from "@/interface";
import { ModalCuston } from "../modal/Modal";

interface Column {
  label: string;
  key: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column[];
  detailsLink?: (item: T) => string;
  onDelete?: (reservationId: string, relationId: string) => void;
  itemsPerPage?: number;
  renderAdditionalColumn?: (item: T) => React.ReactNode;
  isValid: boolean | undefined;
}

const Table = <T extends Record<string, any>>({
  data,
  columns,
  detailsLink,
  onDelete,
  itemsPerPage = 10,
  renderAdditionalColumn,
  isValid,
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = (reservationId: string, relationId: string) => {
    if (onDelete) {
      onDelete(reservationId, relationId);
      window.location.reload();
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
            {renderAdditionalColumn && <th>Encargado</th>}
            {isValid && <>{detailsLink && <th>Details</th>}</>}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              {columns.map((column) => (
                <td key={column.key}>{item[column.key]}</td>
              ))}
              {renderAdditionalColumn && (
                <td>{renderAdditionalColumn(item)}</td>
              )}

              {isValid && (
                <div className="container-details">
                  {detailsLink && (
                    <>
                      <Link href={detailsLink(item)}>
                        <span className="material-icons">display_settings</span>
                      </Link>
                      {onDelete && (
                        <div style={{ cursor: "pointer" }}
                          onClick={() =>
                            handleDelete(item.id, item.usersIncludes[0].id)
                          }
                        >
                          <span className="material-icons">delete_forever</span>
                        </div>
                      )}
                    </>
                  )}
                  <ModalCuston />
                </div>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>{`Página ${currentPage}`}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastItem >= data.length}
        >
          Siguiente
        </button>
      </div>
    </>
  );
};

const getEncargadoName = (reservation: Reservation): string => {
  const user = reservation.usersIncludes[0]?.user as User | undefined;
  return user ? `${user.firstName} ${user.lastName}` : "Sin encargado";
};

export default Table;
