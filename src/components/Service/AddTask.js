const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const handleAddTask = async (newTask, onSuccess, onError) => {
  const taskId = getRandomInt(1, 100000);

  const newTaskData = {
    task_id: taskId,
    task_name: newTask,
    is_completed: 0,
  };

  try {
    const response = await fetch("http://localhost:8080/api/task/savetask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTaskData),
    });

    if (response.ok) {
      onSuccess();
    } else {
      onError();
    }
  } catch (error) {
    onError();
  }
};

export default handleAddTask;
