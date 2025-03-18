# Smart Task Management System (STMS)
Group project repo for DGL-104 web app project (Smart Task Management System [STMS]).

Repo url : https://github.com/codebluenick/dgl104-appdevproj-groupWHPH.git

## Group name - WPHP
### Members - 
- Hardik Vaghasiya
- Varunkanth Arani Pannerselvam
- Nikhil Chhetri

---

# Core Features
### 1. User Roles & Permissions

- __*Admin :*__
  - Can create user accounts (Team Lead, Team Member).
  - Can view all tasks and reassign if needed.

- __*Team Lead :*__
  - Can create tasks and assign them to any member.
  - Can update priority, deadlines, and status of all tasks in the project.

- __*Team Member :*__
  - Can only view and update tasks assigned to them.
  - Can comment on tasks but not assign tasks to others.

---

### 2. Task Creation & Assignment
- __*Create New Task :*__ Title, description, due date, priority.
- __*Assign Task :*__ A dropdown of users (Team Members).
- __*Edit Task :*__ A Team Lead or Admin can edit task details (title, description, priority, etc.).

---

### 3. Task Status Tracking (3-Step)
- __*To Do*__, __*In Progress*__, __*Completed*__.
- Users can update their own tasks by changing the status (e.g., via a dropdown).
- Admin/Team Lead can also change the status (e.g., marking tasks as completed).

---

### 4. Collaboration & Basic Notifications
- __*Comments*__ on each task to centralize discussions.
- __*Notifications*__: 
  - Could be email or simple in-app alerts.
  - Triggered when a user is assigned a task or when new comments are added.

---

### 5. Priority Levels & Deadlines
- Three levels: __*High*__, __*Medium*__, __*Low*__.
- Tasks displayed in priority order on the dashboard (e.g., highlight high-priority tasks).

---

### 6. Dashboard & Reports
- __*Kanban Board*__: Columns for **To Do**, **In Progress**, and **Completed**.
- __*Pie Chart (Optional)*__: Shows the total tasks by status using a simple Chart.js component.

---

### 7. CI/CD Pipeline 
- __*GitHub Actions :*__ Runs basic unit tests or lint checks on every Pull Request.
- __*Deployment :*__ Deploy to free hosting (Heroku, Netlify, or Vercel) if tests pass.


## Technology Stack
### Backend
- **Node.js + Express**  
  
- __*Database :*__  **MongoDB** or **MySQL**  

---

### Frontend
- **React** 
  
- __*UI Library :*__  **Bootstrap** or **Tailwind**

---

### Authentication
- **JWT (JSON Web Tokens)**

---

### Notifications
- **In-App Notifications**  
  - Store notifications in the database and display them in the UI (e.g., a bell icon or notification feed).
- **Email Notifications**  
  - Can be added later using a service like **Nodemailer** to send emails upon task assignment or status updates.
