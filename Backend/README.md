````markdown
# Django Project Setup & Run Guide

This guide explains how to set up and run the Django development server locally.

---

## 🚀 Prerequisites

Make sure you have the following installed:

- [Python 3.10+](https://www.python.org/downloads/)
- [pip](https://pip.pypa.io/en/stable/installation/)
- [virtualenv](https://virtualenv.pypa.io/en/latest/) (optional but recommended)
- [Git](https://git-scm.com/)

---

## 📂 Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/AbdullahRagaab/TaskManager/
   cd TaskManager
````

2. **Create & Activate Virtual Environment**

   ```bash
   # Create virtual environment
   python -m venv venv

   # Activate it
   # On Windows:
   venv\Scripts\activate
   # On Mac/Linux:
   source venv/bin/activate
   ```

3. **Install Dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Apply Migrations**

   ```bash
   python manage.py migrate
   ```

5. **Create Superuser (Admin Account)**

   ```bash
   python manage.py createsuperuser
   ```

   Follow the prompts to set username, email, and password.

6. **Run the Development Server**

   ```bash
   python manage.py runserver
   ```

   Server will start at: [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

---

