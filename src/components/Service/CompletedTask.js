const DeleteTask = async (
    taskId,
    taskName,
    onTaskCompltedUpdate,
    onError
  ) => {
    try {
      const response = await fetch("http://localhost:8080/api/task/updatetask", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task_id: taskId,
          task_name: taskName,
          is_completed: 1,
        }),
      });
  
      if (response.ok) {
        onTaskCompltedUpdate();
      } else {
        onError();
      }
    } catch (error) {
      onError();
    }
  };
  
  export default DeleteTask;
  