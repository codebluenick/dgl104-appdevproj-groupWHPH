import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/KanbanBoard.css'; // 👈 Create this CSS

function KanbanBoard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.error('Error fetching tasks:', err));
  }, []);

  const columns = ['To Do', 'In Progress', 'Completed'];

  return (
    <div className="kanban-container">
      <h2>Kanban Board</h2>
      <div className="kanban-columns">
        {columns.map(status => (
          <div key={status} className="kanban-column">
            <h3>{status}</h3>
            {tasks
              .filter(task => task.status === status)
              .map(task => (
                <div key={task._id} className="kanban-card">
                  <h4>{task.title}</h4>
                  <p>{task.description}</p>
                  <p><strong>Priority:</strong> {task.priority}</p>
                  <p><strong>Due:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
                  <p><strong>Assigned:</strong> {task.assignedTo?.name}</p>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;
