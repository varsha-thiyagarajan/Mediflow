# 🏥 MediFlow — Intelligent Hospital Workflow System

MediFlow is a **role-based hospital management workflow system** designed to simulate real hospital operations.

The system allows Reception, Doctors, Lab, Medical, and Admin to manage patients through different stages with live workflow tracking.

---

## 🚀 Features

### 🔐 Role-Based Login

* Separate login for:

  * Reception
  * Doctor
  * Lab
  * Medical
  * Admin
* Admin can access all modules
* Secure page-level protection

---

### 🏥 Reception Module

* Register new patients
* Assign doctor
* Set priority level
* Patients automatically move to Doctor workflow

---

### 👨‍⚕️ Doctor Module

* View only assigned patients
* Add doctor notes
* Add prescriptions
* Request lab tests
* Verify & send patient to:

  * Lab OR
  * Medical

---

### 🔬 Lab Module

* View only lab-required patients
* Enter lab results
* Automatically move patient to Medical

---

### 💊 Medical Module

* View prescription patients
* Add final medication
* Add billing
* Mark patient as completed

---

### 📡 Tracking Module (Admin Dashboard)

* Live workflow board (Kanban style)
* Patient status tracking
* Doctor notes
* Lab reports
* Prescription details
* Billing summary

---

## 🔄 Workflow Architecture

Reception
→ Doctor
→ Lab (optional)
→ Medical
→ Tracking Dashboard

---

## 🛠 Tech Stack

### Frontend

* HTML5
* CSS3
* Vanilla JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

---

## 📂 Project Structure

```
MediFlow/
│
├── frontend/
│   ├── login.html
│   ├── reception.html
│   ├── doctor.html
│   ├── lab.html
│   ├── medical.html
│   ├── tracking.html
│   ├── script.js
│   ├── doctor.js
│   ├── lab.js
│   ├── medical.js
│   └── tracking.js
│
├── backend/
│   ├── models/
│   │   ├── Patient.js
│   │   └── User.js
│   ├── routes/
│   │   ├── patientRoutes.js
│   │   └── authRoutes.js
│   ├── controllers/
│   │   ├── patientController.js
│   │   └── authController.js
│   └── server.js
│
└── README.md
```

---

## ⚙️ Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/varsha-thiyagarajan/Mediflow.git
cd mediflow
```

### 2️⃣ Install Backend Dependencies

```bash
npm install
```

### 3️⃣ Start Server

```bash
npm start
```

Server runs at:

```
http://localhost:5000
```

---

## 🗄 MongoDB Setup

Make sure MongoDB is running locally:

```bash
mongod
```

Insert sample users:

```js
db.users.insertMany([
  { username:"admin", password:"123", role:"admin" },
  { username:"doctor1", password:"123", role:"doctor", doctorName:"Dr. Sharma" },
  { username:"lab1", password:"123", role:"lab" },
  { username:"medical1", password:"123", role:"medical" },
  { username:"reception1", password:"123", role:"reception" }
])
```

---

## 🔑 Sample Login Credentials

| Role      | Username   | Password |
| --------- | ---------- | -------- |
| Admin     | admin      | 123      |
| Doctor    | doctor1    | 123      |
| Lab       | lab1       | 123      |
| Medical   | medical1   | 123      |
| Reception | reception1 | 123      |

---

## 🎯 Project Highlights

* Real hospital workflow simulation
* Role-based access control
* Automated patient movement between departments
* Clean UI dashboard
* Live tracking board

---

## 📌 Future Improvements

* JWT authentication
* Real-time updates using Socket.io
* PDF bill generation
* Analytics dashboard
* AI-based patient triage

---

## 👩‍💻 Author

**Varsha**
B.Tech AIML Student
Passionate about Full Stack Development & AI Systems.

---
