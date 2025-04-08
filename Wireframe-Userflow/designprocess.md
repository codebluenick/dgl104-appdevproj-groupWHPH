# USER FLOW OVERVIEW

- The user logs in, creates tasks, manages tasks, and views task reports.

## 1.Authentication Flow

- **New User:**
  - Goes to SIGNUP
  - Creates an account
  - Redirected to HOME-DASHBOARD
- **Existing User:**
  - Goes to LOGIN
  - Enters credentials
  - Redirected to HOME-DASHBOARD
- **Entry Points:**
  - Login (if already registered)
  - Signup (if new)

## 2.Home Dashboard

- **Access:**
  - Once authenticated, Team Lead is taken to HOME-DASHBOARD
- **Main Actions:**
  - Create
  - Manage
  - View Reports

## 3.Create Tasks

- **From Dashboard:**
  - Team Lead clicks CREATE
  - Opens CREATE TASKS section
- **Process:**
  - Fill in task details (title, description, due date, priority, assignee, etc.)
  - Submit to store in the database

## 4.Manage Tasks

- **From Dashboard:**
  - Team Lead clicks MANAGE
  - Opens MANAGE TASKS / EDIT TASKS section
- **Actions:**
  - View list of tasks
  - Edit task details (status, deadlines, assignments, etc.)
  - Delete or update tasks

## 5.View Task Reports

- **From Dashboard:**
  - Team Lead clicks VIEW REPORTS
  - Opens TASK REPORTS section
- **Features:**
  - View task completion stats
  - Filter by user, status, priority, or deadline
  - Export or print reports
```
