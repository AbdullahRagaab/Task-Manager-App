# 📌 Task Manager Project (React + MockAPI)

**A modern, responsive task management system built with React, Tailwind CSS, and MockAPI.  
Supports user authentication, role-based access, CRUD operations for tasks, and team analytics.**

## 1. 🔐 Authentication & Authorization

* **JWT-based Authentication (Mocked)**
  * Issue **Access** & **Refresh Tokens** via MockAPI.
  * Refresh tokens used for silent re-authentication with React Query.
* **Protected Routes**
  * Only authenticated users can access Dashboard, Teams, and Task Management.
* **Role & Permissions**
  * Standard users: only access own account & assigned tasks.
  * Admins/Managers: full team access.
* **Frontend Handling**
  * Zustand for global auth state.
  * Redirect to login if user is unauthenticated.

---

## 2. ✅ Task Management

* **CRUD Operations via MockAPI**
  * `GET /tasks`, `POST /tasks`, `PUT /tasks/:id`, `DELETE /tasks/:id`.
* **Task Attributes**
  * `title`, `description`, `status` (`pending`, `in-progress`, `completed`), `priority` (`low`, `medium`, `high`, `urgent`), `dueDate`, `assignee`.
* **Filtering & Search**
  * Filter by status, priority, and due date range.
* **Pagination**
  * Client-side or MockAPI `_page` & `_limit`.
* **Task Progress Tracking**
  * Visual progress bars per task & team.

---

## 3. 👥 Teams & Users

* **Team Features**
  * Users belong to teams (`teamId` field).
  * View team-level task progress.
* **Object-Level Permissions**
  * Users can edit only their profile.
  * Users can manage only assigned tasks.
* **Profile Management**
  * Profile image upload (mock URL).
  * Editable fields: `full_name`, `email`, `username`.
* **Team Insights**
  * Task completion stats per team.
  * Workload distribution charts.

---

## 4. 📊 Analytics & Reporting

* **Dashboard Analytics**
  * Pending vs Completed vs In Progress tasks.
  * Priority breakdown charts.
* **Team Analytics**
  * Completion rate per team.
  * Individual contribution insights.
* **Visualizations**
  * React + Recharts (Bar, Pie, Line charts).
  * Filterable by team, user, or date range.

---

## 5. 🖥️ Frontend UX/UI

* **Modern Responsive Design**
  * React + Tailwind CSS.
  * Mobile & desktop friendly.
* **Protected Navigation**
  * React Router v6 with ProtectedRoute component.
  * Redirect unauthorized users to login.
* **Optimized Workflow**
  * Quick task creation & assignment.
  * Status & progress clearly indicated.
* **Interactive Components**
  * AutoComplete for user assignment.
  * Dynamic Selects for status & priority.
  * Modals for task & user forms.

---

## 6. ⚙️ Technical Stack

* **Frontend**: React + TypeScript
  * **State Management**: Zustand
  * **API Handling**: React Query
  * **Forms & Validation**: React Hook Form + Zod
* **Mock Backend**: MockAPI.io
  * Resources: `/users`, `/tasks`
  * Supports CRUD & pagination
* **Styling**: Tailwind CSS
* **Charts**: Recharts

---



<img width="1335" height="629" alt="Image" src="https://github.com/user-attachments/assets/e4395ef0-ce51-43b2-bc26-d4cffa394e53" />
<img width="1323" height="628" alt="Image" src="https://github.com/user-attachments/assets/c4d1e375-78bd-4b41-b283-c812c9867ab0" />
<img width="1329" height="639" alt="Image" src="https://github.com/user-attachments/assets/b69a8440-5d04-4464-ac00-ff819be32bf8" />
<img width="1360" height="642" alt="Image" src="https://github.com/user-attachments/assets/fc820117-5633-451e-bbea-eb9e12c6c3eb" />

<img width="1361" height="647" alt="Image" src="https://github.com/user-attachments/assets/ec1b20b1-07ca-4635-9ffb-233d34048397" />

<img width="1363" height="649" alt="Image" src="https://github.com/user-attachments/assets/83782d51-1358-4c67-b105-96fdd3c46186" />

<img width="1333" height="631" alt="Image" src="https://github.com/user-attachments/assets/b2ce0ecf-931a-45f3-bfff-bcda6134f01c" />

<img width="1329" height="632" alt="Image" src="https://github.com/user-attachments/assets/0c92c287-84a4-419a-9d48-3c0bb7833d2e" />

<img width="1312" height="610" alt="Image" src="https://github.com/user-attachments/assets/bd24196e-3aa8-4731-9819-8f061dcb4f6d" />
