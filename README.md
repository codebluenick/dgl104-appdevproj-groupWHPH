# Smart Task Management System (STMS)

Group project repo for DGL-104 Web App Development Project.

Repo URL: [https://github.com/codebluenick/dgl104-appdevproj-groupWHPH.git](https://github.com/codebluenick/dgl104-appdevproj-groupWHPH.git)

---

## 👥 Group Name: WPHP

### 👤 Members
- **Hardik Vaghasiya**
- **Varunkanth Arani Pannerselvam**
- **Nikhil Chhetri**

---

## 🔧 Individual Contributions

### 🔹 Hardik Vaghasiya
- Team Lead & Team Member dashboards
- Implemented Google Login & role-based redirection
- Full backend implementation for task CRUD operations
- Features: Assign Task, Update Status, Comments, Email Notifications
- Applied Design Patterns: Strategy (Task Priority), Decorator (Task Enhancement), Command (Update Task)
- Integrated frontend with backend
- Created all frontend task management flows

### 🔹 Varunkanth Arani Pannerselvam
- Research, flowchart, and wireframes
- Created the README file
- UI planning and design decisions
- Contributed to frontend layouts and flow structure

### 🔹 Nikhil Chhetri
- Created the Admin panel UI and backend
- Developed user management & task reassignment APIs
- Helped setup MongoDB and backend routing
- Performed testing with Jest
- Implemented MVC architecture and core Express routes
- Applied Observer & Factory Design Patterns

---

## ✨ Core Features

### ✅ User Roles & Permissions
- **Admin**: Manage users, reassign tasks
- **Team Lead**: Create & assign tasks
- **Team Member**: View and update assigned tasks, add comments

### ✅ Task Features
- Create, Assign, and Update tasks
- Task Status: To Do, In Progress, Completed
- Priority: High, Medium, Low
- Add Comments to Tasks
- Email Notifications on task assignment

### ✅ Dashboards
- **Team Lead Dashboard**:
  - Task creation, filtering, Kanban board, pie chart reports
- **Team Member Dashboard**:
  - View and update assigned tasks, add comments
- **Admin Dashboard**:
  - Manage users, reassign tasks

### ✅ Visual Reports
- Kanban View by Status
- Pie Chart showing task distribution

---

## 🧠 Design Patterns Implemented
- **Strategy**: Priority logic based on due date, manual, or AI
- **Decorator**: Add extra fields (labels/tags) to tasks
- **Command**: Execute updates as command objects
- **Observer**: Notify members when status/comments are updated
- **Factory**: Create task notification objects based on type

---

## 🛠️ Tech Stack

### 🔙 Backend
- Node.js + Express.js
- MongoDB (with Mongoose)

### 🔝 Frontend
- React.js
- Tailwind CSS
- Recharts (Pie Chart)

### 🔐 Authentication
- Google OAuth Login
- Role-based Access (Admin, Team Lead, Team Member)

### 📬 Notifications
- Nodemailer (email notifications)

---

## 🚀 Running Locally

1. Clone the repo
```bash
git clone https://github.com/codebluenick/dgl104-appdevproj-groupWHPH.git
```

2. Setup Backend
```bash
cd server
npm install
node server.js
```

3. Setup Frontend
```bash
cd client
npm install
npm start
```

---

## ✅ Testing
- Backend testing with **Jest + Supertest**
- Mocks MongoDB for isolated testing
- Covered API tests: task creation, status update, user access

---

## 📌 Notes
- Designed for clarity, role-based dashboards
- Clean and functional UI
- Bonus marks: integrated Strategy, Decorator, Command, Observer, Factory patterns

