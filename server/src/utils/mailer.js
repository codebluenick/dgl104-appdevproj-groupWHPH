const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // your Gmail address
    pass: process.env.EMAIL_PASS, // your App Password
  },
});

/**
 * Send task assignment email
 * @param {string} to - User's email address
 * @param {string} taskTitle - Title of the task
 * @param {string|Date} dueDate - Task due date
 * @param {string} taskId - MongoDB ObjectId of the task
 */
const sendAssignmentEmail = async (to, taskTitle, dueDate, taskId) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: '📝 New Task Assigned to You',
    html: `
      <p>Hello,</p>
      <p>You’ve been assigned a new task: <strong>${taskTitle}</strong></p>
      <p><strong>Due Date:</strong> ${new Date(dueDate).toLocaleDateString()}</p>
      <p><strong>Task ID:</strong> <code>${taskId}</code></p>
      <p>Please use this Task ID when updating your task status.</p>
      <hr/>
      <p>Smart Task Management System</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendAssignmentEmail;
