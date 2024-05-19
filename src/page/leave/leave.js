import React, { useEffect, useState } from "react";
import styles from "./leave.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const getData = () => {
  const data = JSON.parse(window.localStorage.getItem("task"));
  if (data) {
    return data;
  } else {
    return [];
  }
};

const resetValue = {
  startDate: null,
  endDate: null,
  reason: "",
};

export default function Leave({ item, state, open, isMobile }) {
  const [task, setTask] = useState(getData());
  const [formData, setFormData] = useState(resetValue);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [dateRange, setDateRange] = useState([null, null]);

  useEffect(() => {
    window.localStorage.setItem("task", JSON.stringify(task));
  }, [task]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (newValue) => {
    console.log("onChangeValue");
    setDateRange(newValue);
  };

  const submit = (event) => {
    event.preventDefault();
    const existingUser = task.find((element) => element.email === item.email);
    if (!dateRange[0] || !dateRange[1] || !formData.reason) {
      alert("please inter the value");
    } else if (
      dateRange[0] &&
      dateRange[1] &&
      formData.reason &&
      existingUser
    ) {
      setTask(
        task?.map((element) => {
          if (element.email == item.email) {
            let newArray = [...element.leave];
            let newObj = {
              startDate: dateRange[0].format("YYYY-MM-DD"),
              endDate: dateRange[1].format("YYYY-MM-DD"),
              reason: formData.reason,
            };
            newArray.push(newObj);

            return {
              ...element,
              leave: newArray,
            };
          }
          return element;
        })
      );
      setFormData({
        ...formData,
        startDate: "",
        endDate: "",
        reason: "Select",
      });
      setSnackbarMessage("Leave added successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } else {
      let arry = [];
      let newObj = {
        startDate: dateRange[0].format("YYYY-MM-DD"),
        endDate: dateRange[1].format("YYYY-MM-DD"),
        reason: formData.reason,
      };
      arry.push(newObj);

      const newObject = {
        ...item,
        leave: arry,
        task: [],
      };
      setTask([...task, newObject]);
      setFormData({
        ...formData,
        startDate: "",
        endDate: "",
        reason: "Select",
      });
      setSnackbarMessage("Leave added successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    }
  };
  console.log("date value===>", formData, dateRange);
  return (
    <div className={styles.container}>
      <h3 className={styles.manheader}>Add Your Leave</h3>
      <div className={open ? styles.contentopen : styles.content}>
        <div className={open ? styles.contentboxopen : styles.contentbox}>
          <h2 className={styles.header}>Add Leave</h2>
          <form style={{ width: "100%" }} onSubmit={submit}>
            <div className={styles.inputbox}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateRangePicker
                  startText="Start Date"
                  endText="End Date"
                  value={dateRange}
                  onChange={handleDateChange}
                  renderInput={(startProps, endProps) => (
                    <>
                      <TextField
                        {...startProps}
                        className={styles.inputfield}
                        sx={{
                          width: isMobile ? "100%" : "40%",
                        }}
                        label="Start Date"
                        id="leaveDatefield"
                      />
                      <TextField
                        {...endProps}
                        className={styles.inputfield}
                        sx={{ width: isMobile ? "100%" : "40%" }}
                        label="End Date"
                        type="date"
                      />
                    </>
                  )}
                />
              </LocalizationProvider>

              <TextField
                type="text"
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                className={styles.reasontext}
                sx={{
                  width: isMobile ? "100%" : "100%",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
                label="Reason for Leave"
              />
            </div>

            <div className={styles.buttonbox}>
              <Button
                sx={{
                  width: isMobile ? "30%" : "20%",
                  border: "none",
                  borderRadius: "5px",
                  backgroundColor: "#3498db",
                  color: "white",
                  fontSize: "18",
                  marginBottom: "20px",
                }}
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
