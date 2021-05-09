import React, { useMemo } from "react";

import { useQuery } from "react-query";
import { useTable, useSortBy } from "react-table";

import styled from "styled-components";

import Main from "@govuk-react/main";
import { Spinner } from "@govuk-react/icons";

const FindTest = () => {
  const { data, isLoading, isSuccess } = useQuery("providersData", async () => {
    const response = await fetch("/data");
    const data = await response.json();
    return data[0];
  });

  if (isLoading) return <Spinner />;

  if (isSuccess) return <TableInstance tableData={data} />;
};

const TableInstance = ({ tableData }) => {
  const data = useMemo(() => tableData, []);
  const columns = useMemo(
    () => [
      {
        Header: "Name of provider",
        accessor: "Name of provider",
      },
      {
        Header: "Region",
        accessor: "Region",
      },
      {
        Header: "Price",
        accessor: "Price",
      },
      {
        Header: "Contact telephone",
        accessor: "Contact telephone",
      },
      {
        Header: "Email address",
        accessor: "Email address",
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data }, useSortBy);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <Main>
      <Styles>
        <table {...getTableProps()}>
          <thead>
            {
              // Loop over the header rows
              headerGroups.map((headerGroup) => (
                // Apply the header row props
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    // Loop over the headers in each row
                    headerGroup.headers.map((column) => (
                      // Apply the header cell props
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        {column.render("Header")}
                        {/* Add a sort direction indicator */}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? " 🔽"
                              : " 🔼"
                            : " 🔀"}
                        </span>
                      </th>
                    ))
                  }
                </tr>
              ))
            }
          </thead>
          {/* Apply the table body props */}
          <tbody {...getTableBodyProps()}>
            {
              // Loop over the table rows
              rows.map((row) => {
                // Prepare the row for display
                prepareRow(row);
                return (
                  // Apply the row props
                  <tr {...row.getRowProps()}>
                    {
                      // Loop over the rows cells
                      row.cells.map((cell) => {
                        // Apply the cell props
                        return (
                          <td {...cell.getCellProps()}>
                            {
                              // Render the cell contents
                              cell.render("Cell")
                            }
                          </td>
                        );
                      })
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </Styles>
    </Main>
  );
};

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;
    width: 100%;
    table-layout: fixed;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      word-wrap: break-word;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

export { FindTest };
