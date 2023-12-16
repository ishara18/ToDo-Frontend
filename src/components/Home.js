import {
  Button,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Swal from "sweetalert2";
import AddTask from "./Service/AddTask";
import DeleteTask from "./Service/DeleteTask";
import CompletedTask from "./Service/CompletedTask";
import UpdateTask from "./Service/UpdateTask";

export default function Home() {
  // ----------Start Auto Date--------------------------------
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  // ----------End Auto Date-----------------------------------

  // ----------Get Tasks-------------------------------------
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/task/gettasks");
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        } else {
          console.error("Failed to fetch tasks");
        }
      } catch (error) {
        console.error("Error while fetching tasks", error);
      }
    };

    fetchTasks();
  }, []);

  const completedTasks = tasks.filter((task) => task.is_completed);
  const nonCompletedTasks = tasks.filter((task) => !task.is_completed);

  //----------End Get Task-----------------------------------

  // ----------Start Add Task----------------------------------
  const [newTask, setNewTask] = useState("");

  const onSuccess = () => {
    Swal.fire({
      title: "Success!!",
      text: "Task Added Successfully!",
      icon: "success",
    }).then(() => {
      window.location.reload();
    });
  };
  const onError = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    }).then(() => {
      window.location.reload();
    });
  };
  const handleAddTaskClick = () => {
    AddTask(newTask, onSuccess, onError);
  };
  // ----------End Add Task----------------------------------

  // ----------Delete Task ----------------------------------
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteTask = (taskId, taskName, isCompleted) => {
    DeleteTask(taskId, taskName, isCompleted, onDeleteSuccess, onError);
  };

  const onDeleteSuccess = () => {
    Swal.fire({
      title: "Success!!",
      text: "Task Deleted Successfully!",
      icon: "success",
    }).then(() => {
      window.location.reload();
    });
  };

  // ---------- End Delete Task -------------------------------

  // ---------- Completed Task --------------------------------
  const updateCompletedTask = (taskId, taskName) => {
    CompletedTask(taskId, taskName, onTaskCompltedUpdate, onError);
  };

  const onTaskCompltedUpdate = () => {
    Swal.fire({
      title: "Success!!",
      text: "Task is Done!",
      icon: "success",
    }).then(() => {
      window.location.reload();
    });
  };
  // ---------- End Completed Task -----------------------------

  // ---------- Update Task ------------------------------------
  const [updateTaskDetails, setUpdateTaskDetails] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const updateTask = (selectedTaskId, updateTaskDetails) => {
    UpdateTask(selectedTaskId, updateTaskDetails, onUpdateTask, onError);
  };

  const onUpdateTask = () => {
    Swal.fire({
      title: "Success!!",
      text: "Task Update Successfully!",
      icon: "success",
    }).then(() => {
      window.location.reload();
    });
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={0} sm={0} md={2} lg={2} xl={2}></Grid>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
          <Typography variant="h6">Hello User,</Typography>
          <Typography variant="h3">
            {currentDateTime.toLocaleString()}
          </Typography>
          <Divider></Divider>
          <Typography
            sx={{
              textAlign: "center",
              paddingTop: 2,
              fontWeight: "bold",
              fontSize: 30,
              fontFamily: "Times New Roman",
            }}
          >
            Add, Update your Daily Tasks
          </Typography>
          {/* ------------------------------------------------BR-------------------------------- */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <TextField
              fullWidth
              placeholder="Add New Task........................."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddTaskClick}
              style={{ marginLeft: "8px" }}
            >
              Add
            </Button>
          </div>
          {/* ------------------------------------------------BR-------------------------------- */}
          <Divider sx={{ paddingTop: 2 }}></Divider>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow></TableRow>
              </TableHead>
              <TableBody>
                {nonCompletedTasks.map((task) => (
                  <TableRow key={task.task_id}>
                    <TableCell sx={{backgroundColor: "#DDFFDD"}}>{task.task_name}</TableCell>
                    <TableCell
                      sx={{
                        position: "relative",
                        right: "0",
                        textAlign: "right",
                      }}
                    >
                      <CheckIcon
                        sx={{
                          color: "blue",
                          fontSize: "30px",
                          "&:hover": {
                            cursor: "pointer",
                          },
                        }}
                        onClick={() =>
                          updateCompletedTask(task.task_id, task.task_name)
                        }
                      ></CheckIcon>
                      <EditIcon
                        sx={{
                          color: "green",
                          fontSize: "30px",
                          "&:hover": {
                            cursor: "pointer",
                          },
                        }}
                        onClick={() => {
                          setSelectedTaskId(task.task_id);
                          handleClickOpen();
                        }}
                      ></EditIcon>
                      <DeleteIcon
                        sx={{
                          color: "red",
                          fontSize: "30px",
                          "&:hover": {
                            cursor: "pointer",
                          },
                        }}
                        onClick={() =>
                          handleDeleteTask(
                            task.task_id,
                            task.task_name,
                            task.is_completed
                          )
                        }
                      ></DeleteIcon>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Divider sx={{ paddingTop: 2 }}></Divider>

          <Table>
            <TableHead>
              <TableRow></TableRow>
            </TableHead>
            <TableBody>
              {completedTasks.map((task) => (
                <TableRow
                  key={task.task_id}
                  sx={{
                    transition: "background-color 0.3s, transform 0.3s",
                    "&:hover": {
                      backgroundColor: "#BBDEFB",
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <TableCell>
                    <AssignmentTurnedInIcon></AssignmentTurnedInIcon>
                  </TableCell>
                  <TableCell>{task.task_name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Update Task</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                type="email"
                fullWidth
                variant="standard"
                value={updateTaskDetails}
                onChange={(e) => setUpdateTaskDetails(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  updateTask(selectedTaskId, updateTaskDetails);
                  handleClose();
                }}
                variant="outlined"
              >
                Update Task
              </Button>
              <Button onClick={handleClose} variant="contained">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>

        <Grid item xs={0} sm={0} md={2} lg={2} xl={2}></Grid>
      </Grid>
    </div>
  );
}
