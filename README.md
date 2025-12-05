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

## 7. Users & Tasks in MockAPI

* **Show Users**

```ts
const { data: users } = useGetUsers(); 
console.log(users);



---
<img width="1323" height="628" alt="Image" src="https://github.com/user-attachments/assets/2f2e66cb-2469-4f23-8194-ef201b3c7502" />
<img width="1335" height="629" alt="Image" src="https://github.com/user-attachments/assets/9a9d5e03-333d-45c7-a717-223588559fff" />
<img width="1333" height="631" alt="Image" src="https://github.com/user-attachments/assets/a9b8f940-66cf-4818-ad71-207c41b0218f" />
<img width="1360" height="642" alt="Image" src="https://github.com/user-attachments/assets/da30b522-cd0d-4307-b720-a9d139c29166" />
<img width="1361" height="647" alt="Image" src="https://github.com/user-attachments/assets/89364200-ffe8-4c8e-87fc-4c467ebaf823" />
<img width="1363" height="649" alt="Image" src="https://github.com/user-attachments/assets/b4f8b787-8155-44a8-a4fa-496da0f0ce14" />
<img width="1329" height="639" alt="Image" src="https://github.com/user-attachments/assets/e79fab96-f8d9-4012-857e-934ca5917722" />
<img width="1312" height="610" alt="Image" src="https://github.com/user-attachments/assets/71175080-2526-4a1e-8e02-100a6a3e9b26" />
<img width="1329" height="632" alt="Image" src="https://github.com/user-attachments/assets/73cada49-fecc-45f3-8362-018369de489b" />
