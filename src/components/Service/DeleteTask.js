const DeleteTask = async (
  taskId,
  taskName,
  isCompleted,
  onDeleteSuccess,
  onError
) => {
  try {
    const response = await fetch("http://localhost:8080/api/task/deletetask", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task_id: taskId,
        task_name: taskName,
        is_completed: isCompleted,
      }),
    });

    if (response.ok) {
      onDeleteSuccess();
    } else {
      onError();
    }
  } catch (error) {
    onError();
  }
};

export default DeleteTask;
