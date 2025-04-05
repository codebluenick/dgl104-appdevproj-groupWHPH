import React from 'react';
import '../../styles/TaskCard.css';

function TaskCard({ title, description, onClick }) {
  return (
    <div className="task-card" onClick={onClick}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default TaskCard;
