import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import '../styles/KanbanBoard.css';

const COLORS = ['#a855f7', '#8b5cf6', '#6d28d9'];

// 🎨 Decorator-like function to add display metadata
const decorateChartData = (taskCounts) => {
  return [
    {
      name: 'To Do',
      value: taskCounts.ToDo,
      label: `📝 To Do (${taskCounts.ToDo})`
    },
    {
      name: 'In Progress',
      value: taskCounts.InProgress,
      label: `🔧 In Progress (${taskCounts.InProgress})`
    },
    {
      name: 'Completed',
      value: taskCounts.Completed,
      label: `✅ Completed (${taskCounts.Completed})`
    }
  ];
};

function TaskPieChart() {
  const [pieData, setPieData] = useState([]);
  const chartRef = useRef();

  useEffect(() => {
    axios.get('http://localhost:3001/api/tasks/all')
      .then(res => {
        const count = { ToDo: 0, InProgress: 0, Completed: 0 };
        res.data.forEach(task => {
          if (task.status === 'To Do') count.ToDo++;
          else if (task.status === 'In Progress') count.InProgress++;
          else if (task.status === 'Completed') count.Completed++;
        });
        setPieData(decorateChartData(count));
      })
      .catch(err => console.error('Error fetching tasks:', err));
  }, []);

  const handleExportPDF = () => {
    html2canvas(chartRef.current).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 100);
      pdf.save('task-distribution-report.pdf');
    });
  };

  return (
    <div className="kanban-container" ref={chartRef}>
      <h2 style={{ textAlign: 'center' }}>📊 Task Distribution</h2>

      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={130}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              labelLine={false}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [`${value} tasks`, name]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <button className="export-btn" onClick={handleExportPDF}>📄 Export as PDF</button>
      </div>
    </div>
  );
}

export default TaskPieChart;
