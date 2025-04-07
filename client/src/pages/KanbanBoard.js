import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/KanbanBoard.css'; // You can reuse this CSS for now

const COLORS = ['#a855f7', '#8b5cf6', '#6d28d9']; // Purple-themed colors

function TaskPieChart() {
  const [taskData, setTaskData] = useState({ ToDo: 0, InProgress: 0, Completed: 0 });

  useEffect(() => {
    axios.get('http://localhost:3001/api/tasks')
      .then(res => {
        const tasks = res.data;
        const count = { ToDo: 0, InProgress: 0, Completed: 0 };
        tasks.forEach(task => {
          if (task.status === 'To Do') count.ToDo++;
          else if (task.status === 'In Progress') count.InProgress++;
          else if (task.status === 'Completed') count.Completed++;
        });
        setTaskData(count);
      })
      .catch(err => console.error('Error fetching tasks:', err));
  }, []);

  const pieData = [
    { name: 'To Do', value: taskData.ToDo },
    { name: 'In Progress', value: taskData.InProgress },
    { name: 'Completed', value: taskData.Completed }
  ];

  return (
    <div className="kanban-container">
      <h2>Task Distribution (Pie Chart)</h2>
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={130}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            >
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TaskPieChart;
