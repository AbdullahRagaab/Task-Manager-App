# 📌 Project Specification

## 1. 🔐 Authentication & Authorization

* **JWT-based Authentication**

  * Issue **Access** & **Refresh Tokens**.
  * Refresh tokens used for silent re-authentication.
* **Protected Routes**

  * Only authenticated users can access:

    * Dashboard
    * Teams
    * Task Management
* **Role & Permissions**

  * Standard users can only access their own account & assigned tasks.
  * Admins/Managers can view and manage team-wide data.

---

## 2. ✅ Task Management

* **CRUD Operations**

  * Create, Read, Update, Delete tasks.
* **Task Attributes**

  * `title`, `description`, `status`, `priority`, `dueDate`, `assignee`.
* **Filtering & Search**

  * Filter tasks by:

    * Status (`pending`, `in_progress`, `completed`).
    * Priority (`low`, `medium`, `high`).
    * Due date range.
* **Pagination**

  * Server-side pagination for scalable performance.
* **Task Progress Tracking**

  * Visual indicators of task completion percentage.

---

## 3. 👥 Teams & Users

* **Team Features**

  * Each user belongs to a team.
  * Users can see **team-level progress** (aggregate task stats).
* **Object-Level Permissions**

  * Users can **only edit their own profile/account**.
  * Users can **only manage their assigned tasks**.
* **Profile Management**

  * Profile image upload.
  * Editable profile fields (name, email, etc.).
* **Team Insights**

  * Display team task completion & workload distribution.

---

## 4. 📊 Analytics & Reporting

* **Dashboard Analytics**

  * Overview of tasks:

    * Pending vs Completed vs In Progress.
    * Breakdown by priority.
* **Team Analytics**

  * Task completion rate per team.
  * Individual contribution insights.
* **Visualizations**

  * Progress charts (pie, bar, line).
  * Filterable by team, user, or timeframe.

---

## 5. 🖥️ Frontend UX/UI

* **Modern Responsive Design**

  * Built with React + Tailwind.
  * Mobile & desktop friendly.
* **Protected Navigation**

  * Login redirects to Dashboard.
  * Unauthorized users redirected to Login page.
* **Optimized Workflow**

  * Simple, intuitive task creation & assignment.
  * Clear status indicators and progress tracking.

---

## 6. ⚙️ Technical Stack

* **Backend**: Django + DRF
* **Authentication**: JWT (Access + Refresh)
* **Frontend**: React (Zustand for state, React Query for API)
* **Database**: PostgreSQL (or MySQL)
---

✨ With this structure:

* Each **model/feature** is clearly defined.
* Stakeholders (devs, PMs, even clients) can understand the scope.
* It’s easy to expand later (e.g., adding notifications, comments, or Kanban view).

---


## 7. Users in Database

* **Show Users in Database**

  * do python..... first and from..... :

    * python manage.py shell .
    * from django.contrib.auth import get_user_model
User = get_user_model()

for user in User.objects.all():
    print(f"Username: {user.username}, Email: {user.email}, Full Name: {user.full_name}") .

* **Add User in Database**

  * python manage.py createsuperuser .


* **Delete User from Database**

  * User.objects.filter(username="body").delete() .


---

<img width="1339" height="630" alt="Image" src="https://github.com/user-attachments/assets/5184a84e-6637-4ccd-a417-4c9b3e6be3b1" />
<img width="1333" height="631" alt="Image" src="https://github.com/user-attachments/assets/a9b8f940-66cf-4818-ad71-207c41b0218f" />
<img width="1360" height="642" alt="Image" src="https://github.com/user-attachments/assets/da30b522-cd0d-4307-b720-a9d139c29166" />
<img width="1361" height="647" alt="Image" src="https://github.com/user-attachments/assets/89364200-ffe8-4c8e-87fc-4c467ebaf823" />
<img width="1363" height="649" alt="Image" src="https://github.com/user-attachments/assets/b4f8b787-8155-44a8-a4fa-496da0f0ce14" />
<img width="1329" height="639" alt="Image" src="https://github.com/user-attachments/assets/e79fab96-f8d9-4012-857e-934ca5917722" />
<img width="1312" height="610" alt="Image" src="https://github.com/user-attachments/assets/71175080-2526-4a1e-8e02-100a6a3e9b26" />
<img width="1329" height="632" alt="Image" src="https://github.com/user-attachments/assets/73cada49-fecc-45f3-8362-018369de489b" />
<img width="1334" height="620" alt="Image" src="https://github.com/user-attachments/assets/a417a2e5-0aa2-4152-a85f-e3a3ab8a677a" />