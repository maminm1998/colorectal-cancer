import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const isObject = (value) => {
  return typeof value === "object" && value !== null;
};

export default function BasicTable({ data }) {
  const convertData = (customer) => {
    const result = [];
    for (let key in customer) {
      if (customer.hasOwnProperty(key)) {
        result.push({ q: key, a: customer[key] });
      }
    }
    return result;
  };
  return (
    <>
      {data.length ? (
        <TableContainer
          component={Paper}
          style={{
            width: "95%",
            margin: "auto",
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            {data.map((customer, index) => (
              <TableHead key={`head-${index}`}>
                {index < 1 ? (
                  <TableRow key={`row-${index}`}>
                    {convertData(customer).map((item, i) => (
                      <TableCell
                        style={{
                          whiteSpace: "nowrap",
                          textAlign: "center",
                        }}
                        key={`cell-${i}`}
                      >
                        {item.q}
                      </TableCell>
                    ))}
                  </TableRow>
                ) : (
                  <></>
                )}
              </TableHead>
            ))}
            <TableBody>
              {data.map((customer, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {convertData(customer).map((item, i) => (
                    <TableCell
                      key={i}
                      style={{ whiteSpace: "nowrap", textAlign: "center" }}
                    >
                      {isObject(item.a)
                        ? Object.values(item.a).join(" ")
                        : item.a}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <></>
      )}
    </>
  );
}
