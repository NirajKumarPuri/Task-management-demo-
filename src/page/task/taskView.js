import React, { useEffect, useState } from "react";
import styles from "./taskView.module.css";
import { Avatar } from "@mui/material";
import { CheckCircleOutline, Schedule, DoneAll } from "@mui/icons-material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
const getData = () => {
  const data = JSON.parse(window.localStorage.getItem("task"));
  if (data) {
    return data;
  } else {
    return [];
  }
};
export default function TaskView({ item, state, open, isMobile }) {
  const [task, setTask] = useState(getData());
  const [data, setData] = useState([{ id: 0, component: [] }]);

  const [existingUserTask, setExistingUserTask] = useState([]);

  useEffect(() => {
    setTask(getData());
  }, []);

  useEffect(() => {
    const newexistingUserData = task?.find((element) => element.id == item.id);
    console.log("newUser data====>", newexistingUserData);
    if (newexistingUserData?.task?.length > 0) {
      setExistingUserTask([...newexistingUserData.task]);
      setData([{ id: 0, component: newexistingUserData.task }]);
    }
  }, [task]);
  const status = ["Pending", "In-progress", "Completed"];
  const StatusLength = (status) => {
    switch (status) {
      case "Completed":
        return existingUserTask?.filter(
          (element) => element.status == "Completed"
        )?.length;
      case "In-progress":
        return existingUserTask?.filter(
          (element) => element.status == "In-progress"
        )?.length;
      case "Pending":
        return existingUserTask?.filter(
          (element) => element.status == "Pending"
        )?.length;
      default:
        return 0;
    }
  };
  const renderStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return (
          <Avatar
            style={{
              backgroundColor: "green",
              width: isMobile ? "30px" : "",
              height: isMobile ? "30px" : "",
            }}
          >
            <DoneAll />
          </Avatar>
        );
      case "In-progress":
        return (
          <Avatar
            style={{
              backgroundColor: "orange",
              width: isMobile ? "30px" : "",
              height: isMobile ? "30px" : "",
            }}
          >
            <Schedule />
          </Avatar>
        );
      case "Pending":
        return (
          <Avatar
            style={{
              backgroundColor: "red",
              width: isMobile ? "30px" : "",
              height: isMobile ? "30px" : "",
            }}
          >
            <CheckCircleOutline />
          </Avatar>
        );
      default:
        return null;
    }
  };
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(existingUserTask);
    const [reorderedItem] = items.splice(result.source.index, 1);
    console.log("recod===>", reorderedItem);
    items.splice(result.destination.index, 0, reorderedItem);
    setExistingUserTask(items);
    setData([{ id: 0, component: items }]);
  };
  // console.log("current User===>", existingUserTask, task);
  console.log("Item=====>", data);

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Task Report</h2>
      <p className={styles.headertext}>Home / Task View</p>
      <div className={open ? styles.contentopen : styles.content}>
        {status.map((item, index) => {
          return (
            <div
              key={index}
              className={open ? styles.statusboxopen : styles.statusbox}
            >
              <span className={styles.statustext}> {item}</span>
              <div className={styles.statusbar}>
                {renderStatusIcon(item)}{" "}
                <span className={styles.statuslength}>
                  {StatusLength(item)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className={open ? styles.tablecontentopen : styles.tablecontent}>
        {existingUserTask.length > 0 ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead sx={{ backgroundColor: "#464775" }}>
                  <TableRow>
                    <TableCell sx={{ color: "white" }}>TaskId</TableCell>
                    <TableCell sx={{ color: "white" }}>CompanyName</TableCell>
                    <TableCell sx={{ color: "white" }}>TaskName</TableCell>
                    <TableCell sx={{ color: "white" }}>Status</TableCell>
                  </TableRow>
                </TableHead>

                {data?.map((item, index) => (
                  <Droppable key={item.id} droppableId={`products${item.id}`}>
                    {(provided) => (
                      <TableBody
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {item?.component?.map((product, index) => (
                          <Draggable
                            key={product.id}
                            draggableId={`products${product.id}`}
                            index={index}
                          >
                            {(provided) => (
                              <TableRow
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                sx={{
                                  backgroundColor:
                                    index % 2 === 0 ? "#d5d5d5" : "#48494b",
                                  color: index % 2 === 0 ? "black" : "white",
                                  border: "1px solid white",
                                }}
                                key={product.id}
                              >
                                <TableCell
                                  sx={{
                                    color: index % 2 === 0 ? "black" : "white",
                                  }}
                                >
                                  {`Task${product.taskId}`}
                                </TableCell>

                                <TableCell
                                  sx={{
                                    color: index % 2 === 0 ? "black" : "white",
                                    border: "1px solid white",
                                  }}
                                >
                                  {product.companyName}
                                </TableCell>
                                <TableCell
                                  sx={{
                                    color: index % 2 === 0 ? "black" : "white",
                                    border: "1px solid white",
                                  }}
                                >
                                  {product.taskName}
                                </TableCell>
                                <TableCell
                                  sx={{
                                    color: index % 2 === 0 ? "black" : "white",
                                    border: "1px solid white",
                                  }}
                                >
                                  {product.status}
                                </TableCell>
                              </TableRow>
                            )}
                          </Draggable>
                        ))}

                        {provided.placeholder}
                      </TableBody>
                    )}
                  </Droppable>
                ))}
              </Table>
            </TableContainer>
          </DragDropContext>
        ) : (
          <p className={styles.taskerror}>No tasks available.</p>
        )}
      </div>
    </div>
  );
}
