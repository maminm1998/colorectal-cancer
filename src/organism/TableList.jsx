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

export default function TableList({ data, questionType }) {
  const convertData = (customer) => {
    return [
      { q: "نام", a: customer["نام"] },
      { q: "نام خانوادگی", a: customer["نام خانوادگی"] },
    ];
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
            <TableHead>
              <TableRow>
                {convertData(data[0]).map((item, i) => (
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
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((customer, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {convertData(customer).map((item, i) => (
                    <TableCell
                      key={i}
                      className={index % 2 ? "bg-blue-100" : ""}
                      style={{ whiteSpace: "nowrap", textAlign: "center" }}
                    >
                      {isObject(item.a)
                        ? Object.values(item.a).join(" ")
                        : item.a}
                    </TableCell>
                  ))}
                  <TableCell className={index % 2 ? "bg-blue-100" : ""}>
                    {index + 1}
                  </TableCell>
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
