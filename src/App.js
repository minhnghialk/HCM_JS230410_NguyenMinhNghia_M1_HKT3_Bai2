import React, { useState, useEffect } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Choose");
  const [username, setUsername] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const handleSubmit = () => {
    if (
      inputValue === "" ||
      dueDate === "" ||
      status === "" ||
      username === ""
    ) {
      alert("Please fill all fields");
    } else {
      const newTask = {
        id: tasks.length + 1,
        content: inputValue,
        dueDate: dueDate,
        status: status,
        assignedTo: username,
      };
      let idItem = localStorage.getItem("keyId");
      let listData = JSON.parse(localStorage.getItem("tasks"));
      if (idItem) {
        for (let i = 0; i < listData.length; i++) {
          if (listData[i].id == idItem) {
            listData.splice(i, 1, newTask);
            localStorage.setItem("tasks", JSON.stringify(listData));
            localStorage.removeItem("keyId");
            setTasks(listData);
            setInputValue("");
            setDueDate("");
            setStatus("Choose");
            setUsername("");
            return;
          }
        }
      }
      let a = [...tasks, newTask];
      setTasks(a);

      setInputValue("");
      setDueDate("");
      setStatus("Choose");
      setUsername("");
      localStorage.setItem("tasks", JSON.stringify(a));
    }
  };

  const handleUpdate = (id) => {
    // TODO: Implement update logic
    console.log("Update task with ID:", id);
    const taskUpdate = tasks.find((task) => task.id === id);
    if (taskUpdate) {
      setInputValue(taskUpdate.content);
      setDueDate(taskUpdate.dueDate);
      setStatus(taskUpdate.status);
      setUsername(taskUpdate.assignedTo);
      console.log(taskUpdate);
      localStorage.setItem("keyId", id);
    }
  };

  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <>
      <div className="div1">
        <input
          type="text"
          placeholder="Course"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>Choose</option>
          <option>Pending</option>
          <option>Fulfill</option>
          <option>Reject</option>
        </select>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button onClick={handleSubmit}>Submit</button>
      </div>

      <div className="div2">
        <table border="1px" cellpadding="5px" cellspacing="5px">
          <tr>
            <th>#</th>
            <th>Content</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Assigned to</th>
            <th>Action</th>
          </tr>

          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.content}</td>
              <td>{task.dueDate}</td>
              <td>{task.status}</td>
              <td>{task.assignedTo}</td>
              <td>
                <button onClick={() => handleUpdate(task.id)}>Update</button>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </>
  );
}

export default App;
