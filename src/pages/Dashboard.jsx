import { useState, useEffect } from "react";

function Dashboard() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [title, setTitle] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!title.trim()) {
      alert("Please enter a task");
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      status: "Todo",
    };

    setTasks((prev) => [...prev, newTask]);
    setTitle("");
  };

  const moveTask = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, status: newStatus }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) =>
      prev.filter((task) => task.id !== id)
    );
  };

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="dashboard">
      <h1 className="title"> Task Manager Dashboard</h1>

      <div style={{ textAlign: "center" }}>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="task-input">
        <input
          type="text"
          id="task"
          name="task"
          placeholder="Enter task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={addTask}>
          Add Task
        </button>
      </div>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h3>Total Tasks: {tasks.length}</h3>
      </div>

      <div className="board">
        {["Todo", "In Progress", "Done"].map((status) => (
          <div key={status} className="column">
            <h2>{status}</h2>

            {tasks
              .filter((task) => task.status === status)
              .map((task) => (
                <div key={task.id} className="card">
                  <p>{task.title}</p>

                  {status === "Todo" && (
                    <button
                      className="start-btn"
                      onClick={() =>
                        moveTask(task.id, "In Progress")
                      }
                    >
                      Start
                    </button>
                  )}

                  {status === "In Progress" && (
                    <button
                      className="complete-btn"
                      onClick={() =>
                        moveTask(task.id, "Done")
                      }
                    >
                      Complete
                    </button>
                  )}

                  <button
                    className="delete-btn"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;