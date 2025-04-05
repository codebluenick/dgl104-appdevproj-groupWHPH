import React from 'react';
import '../styles/CreateTask.css';

function CreateTask({ onCancel }) {
  return (
    <div className="create-task-wrapper">
      <h2>Create New Task</h2>
      <form className="create-task-form">
        <input type="text" placeholder="Title" />
        <textarea placeholder="Description" rows={4}></textarea>
        <input type="date" />
        <select>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <input type="text" placeholder="Assign to (email/name)" />

        <div className="form-buttons">
          <button type="submit" className="submit-btn">Create Task</button>
          <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default CreateTask;
