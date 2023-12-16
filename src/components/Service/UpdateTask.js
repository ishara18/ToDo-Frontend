const DeleteTask = async (
  selectedTaskId,
  updateTaskDetails,
  onUpdateTask,
    onError
  ) => {
    try {
      const response = await fetch("http://localhost:8080/api/task/updatetask", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task_id: selectedTaskId,
          task_name: updateTaskDetails,
          is_completed: 0,
        }),
      });
  
      if (response.ok) {
        onUpdateTask();
      } else {
        onError();
      }
    } catch (error) {
      onError();
    }
  };
  
  export default DeleteTask;
  