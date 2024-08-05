import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import axios from "axios";

const isObject = (value) => {
  return typeof value === "object" && value !== null;
};

export default function TableList({ data, editable, editURL }) {
  const [open, setOpen] = React.useState(false);
  const [currentCustomer, setCurrentCustomer] = React.useState(null);
  const [editedData, setEditedData] = React.useState({});

  const handleClickOpen = (customer) => {
    setCurrentCustomer(customer);
    setEditedData(customer);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      await axios.put(
        ` https://ffqbackend.liara.run/${editURL}/${currentCustomer.id}`,
        editedData
      );
      setOpen(false);
      // Refresh or update the data in the table if necessary
    } catch (error) {
      console.error("Error updating customer data", error);
    }
  };
  const handleChange = (field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: value,
    }));
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
                <TableCell
                  style={{
                    whiteSpace: "nowrap",
                    textAlign: "center",
                  }}
                >
                  ردیف
                </TableCell>
                <TableCell
                  style={{
                    whiteSpace: "nowrap",
                    textAlign: "center",
                  }}
                >
                  نام
                </TableCell>
                <TableCell
                  style={{
                    whiteSpace: "nowrap",
                    textAlign: "center",
                  }}
                >
                  نام خانوادگی
                </TableCell>
                <TableCell
                  style={{
                    whiteSpace: "nowrap",
                    textAlign: "center",
                  }}
                >
                  تاریخ و زمان ثبت اطلاعات
                </TableCell>
                <TableCell
                  style={{
                    whiteSpace: "nowrap",
                    textAlign: "center",
                  }}
                >
                  زمان تکمیل پرسشنامه
                </TableCell>
                <TableCell
                  style={{
                    whiteSpace: "nowrap",
                    textAlign: "center",
                  }}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((customer, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    className={index % 2 ? "bg-blue-100" : ""}
                    style={{ whiteSpace: "nowrap", textAlign: "center" }}
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell
                    className={index % 2 ? "bg-blue-100" : ""}
                    style={{ whiteSpace: "nowrap", textAlign: "center" }}
                  >
                    {customer["نام"]}
                  </TableCell>
                  <TableCell
                    className={index % 2 ? "bg-blue-100" : ""}
                    style={{ whiteSpace: "nowrap", textAlign: "center" }}
                  >
                    {customer["نام خانوادگی"]}
                  </TableCell>
                  <TableCell
                    className={index % 2 ? "bg-blue-100" : ""}
                    style={{ whiteSpace: "nowrap", textAlign: "center" }}
                  >
                    {customer["submissionDateTime"]}
                  </TableCell>
                  <TableCell
                    className={index % 2 ? "bg-blue-100" : ""}
                    style={{ whiteSpace: "nowrap", textAlign: "center" }}
                  >
                    {customer["timeSpent"]}
                  </TableCell>
                  <TableCell
                    className={index % 2 ? "bg-blue-100" : ""}
                    style={{ whiteSpace: "nowrap", textAlign: "center" }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleClickOpen(customer)}
                      disabled={!editable}
                    >
                      ویرایش
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <></>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>ویرایش اطلاعات</DialogTitle>
        <DialogContent>
          {currentCustomer &&
            Object.keys(currentCustomer).map((field) => (
              <>
                {field !== "submissionDateTime" &&
                field !== "id" &&
                field !== "timeSpent" ? (
                  <TextField
                    key={field}
                    margin="dense"
                    label={field}
                    type="text"
                    fullWidth
                    value={editedData[field] || ""}
                    onChange={(e) => handleChange(field, e.target.value)}
                  />
                ) : (
                  <></>
                )}
              </>
            ))}
        </DialogContent>
        <DialogActions className="w-full">
          <Button
            onClick={handleSave}
            className="bg-blue-500 w-[70%] m-2 text-white"
          >
            ذخیره
          </Button>
          <Button
            onClick={handleClose}
            className="bg-red-500 w-[30%] m-2 text-white"
          >
            انصراف
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
