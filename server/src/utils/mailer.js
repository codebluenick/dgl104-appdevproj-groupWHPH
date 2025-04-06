const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,     // your Gmail address
    pass: process.env.EMAIL_PASS,     // app password from Gmail settings
  },
});

const sendAssignmentEmail = async (to, taskTitle) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: `New Task Assigned: ${taskTitle}`,
    html: `<p>You have been assigned a new task: <strong>${taskTitle}</strong></p>`
  });
};

module.exports = sendAssignmentEmail;
