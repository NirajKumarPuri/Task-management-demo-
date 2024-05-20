import React, { useEffect, useState } from "react";
import styles from "./taskCreate.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Select, MenuItem, InputLabel } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const getData = () => {
  const data = JSON.parse(window.localStorage.getItem("task"));
  if (data) {
    return data;
  } else {
    return [];
  }
};

const resetValue = {
  companyName: "",
  taskName: "",
  status: "Select",
};
export default function TaskCreate({ item, state, open, isMobile }) {
  const [task, setTask] = useState(getData());
  const [formData, setFormData] = useState(resetValue);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    setTask(getData);
  }, []);
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

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setFormData({
      ...formData,
      status: value,
    });
  };

  const submit = (event) => {
    event.preventDefault();

    const existingUser = task.find((element) => element.id === item.id);
    if (!formData.companyName || !formData.taskName || !formData.status) {
      alert("please inter the value");
    } else if (
      formData.companyName &&
      formData.taskName &&
      formData.status &&
      existingUser
    ) {
      setTask(
        task?.map((element) => {
          if (element.id == item.id) {
            let newArray = [...element.task];
            let newObj = {
              id: new Date().getTime().toString(),
              taskId: element.task[element.task.length - 1]?.taskId
                ? element.task[element.task.length - 1]?.taskId + 1
                : 1,

              companyName: formData.companyName,
              taskName: formData.taskName,
              status: formData.status,
            };
            newArray.push(newObj);

            return {
              ...element,
              task: newArray,
            };
          }
          return element;
        })
      );
      setFormData({
        ...formData,
        companyName: "",
        taskName: "",
        status: "Select",
      });
      setSnackbarMessage("Task added successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } else {
      let arry = [];
      let newObj = {
        id: new Date().getTime().toString(),
        taskId: 1,

        companyName: formData.companyName,
        taskName: formData.taskName,
        status: formData.status,
      };
      arry.push(newObj);
      const newObject = {
        ...item,

        task: arry,
      };
      setTask([...task, newObject]);
      setFormData({
        ...formData,
        companyName: "",
        taskName: "",
        status: "Select",
      });
      setSnackbarMessage("Task added successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    }
  };
  const status = [
    { value: "Select", text: "Select" },
    { value: "Pending", text: "Pending" },
    { value: "In-progress", text: "In-progress" },
    { value: "Completed", text: "Completed" },
  ];

  return (
    <div className={styles.container}>
      <h3 className={styles.manheader}>Add Your Task</h3>
      <div className={open ? styles.contentopen : styles.content}>
        <div className={open ? styles.contentboxopen : styles.contentbox}>
          <h2 className={styles.header}>Add Task</h2>
          <form style={{ width: "100%" }} onSubmit={submit}>
            <div className={styles.inputbox}>
              <TextField
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className={styles.inputfield}
                label="Company Name"
                sx={{
                  width: isMobile ? "100%" : "40%",
                  marginBottom: isMobile ? "10px" : "",
                }}
              />
              <TextField
                type="text"
                name="taskName"
                value={formData.taskName}
                onChange={handleInputChange}
                className={styles.inputfield}
                sx={{ width: isMobile ? "100%" : "40%" }}
                label="Task Name"
              />
            </div>
            <div className={styles.Selectbox}>
              <div className={styles.labelbox}>
                <InputLabel id="select-label">Status</InputLabel>
              </div>

              <Select
                labelId="select-label"
                id="simple-select"
                value={formData.status}
                onChange={handleSelectChange}
                className={styles.Select}
              >
                {status?.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.text}
                  </MenuItem>
                ))}
              </Select>
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
                  marginBottom: "5px",
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
