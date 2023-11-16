import React from 'react';
import Link from 'next/link';
import './table.css';

interface Column {
  label: string;
  key: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column[];
  detailsLink?: (item: T) => string;
}

const Table = <T extends Record<string, any>>({ data, columns, detailsLink }: TableProps<T>) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.label}</th>
          ))}
          {detailsLink && <th>Details</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((column) => (
              <td key={column.key}>{item[column.key]}</td>
            ))}
            {detailsLink && (
              <td>
                <Link href={detailsLink(item)}>
                  Details
                </Link>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
