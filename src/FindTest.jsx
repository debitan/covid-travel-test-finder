import React, { useMemo } from "react";
import styled from "styled-components";

import { useQuery } from "react-query";
import { useTable, useSortBy, useFilters, useGlobalFilter } from "react-table";

import Main from "@govuk-react/main";
import LoadingBox from "@govuk-react/loading-box";

const ErrorMain = styled(Main)`
  border: 0.5rem solid #d4351c;
  padding: 1rem;
  display: flex;
`;

function SelectColumnFilter({ column: { filterValue, setFilter } }) {
  const options = [
    "Nationwide (England)",
    "Greater London",
    "East of England",
    "South East",
    "East Midlands",
    "North West",
    "Yorkshire and the Humber",
    "South West",
    "West Midlands",
    "North East",
  ];

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

const FindTest = () => {
  const { data, isLoading, isError, isSuccess } = useQuery(
    "providersData",
    async () => {
      const response = await fetch("/data");
      const data = await response.json();
      return data[0];
    }
  );

  if (isLoading)
    return (
      <LoadingBox loading>
        <Main />
      </LoadingBox>
    );

  if (isError)
    return (
      <ErrorMain>
        Whoops. Something went wrong trying to get the data. Please try again.
        In case it still doesn't work, please get in touch with the author.
      </ErrorMain>
    );

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
        Filter: SelectColumnFilter,
        filter: "includes",
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

  const filterTypes = React.useMemo(
    () => ({
      // Or, override the default text filter to use
      // "startWith"
      includes: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue === "all"
            ? true
            : String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase()) ||
                String(rowValue)
                  .toLowerCase()
                  .startsWith(String("Nationwide (England)").toLowerCase());
        });
      },
    }),
    []
  );

  const tableInstance = useTable(
    { columns, data, filterTypes },
    useFilters,
    useGlobalFilter,
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
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
                  headerGroup.headers.map((column) =>
                    column.filter ? (
                      // Apply the header cell props
                      <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                        {/* Render the columns filter UI */}
                        <div>
                          {column.filter ? column.render("Filter") : null}
                        </div>
                      </th>
                    ) : (
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
                              ? " ????"
                              : " ????"
                            : " ????"}
                        </span>
                      </th>
                    )
                  )
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
  );
};

const Styles = styled.div`
  table {
    border-spacing: 0;
    border: 1px solid black;
    width: 100%;
    table-layout: fixed;

    select {
      max-width: 100%;
    }

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
