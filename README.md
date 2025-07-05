# Khoj - Lost Person Finder 👤🔍

**Khoj** is a full-stack web application that helps locate missing individuals. It enables authorized users to upload missing person profiles, report sightings, and automatically notifies the concerned parties via email. This project aims to bridge the gap between people who have lost someone and those who might have seen them.

---

## 🛠️ Tech Stack

- **Frontend**: React.js  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Email Notifications**: Nodemailer  

---

## 📌 Features

- 🔐 **Authorized Access**: Only verified users can upload and manage profiles of missing persons.  
- 📸 **Profile Upload**: Upload details such as name, photo, last seen location, and a brief description.  
- 👁️ **Sightings Reporting**: Anyone can report a sighting with optional location and remarks.  
- 📧 **Email Notifications**: Instant automated emails are sent to guardians or authorities when a sighting is reported.  

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Paniv45/khoj.git
cd khoj
```

2. Install Dependencies
Backend
```bash
cd backend
npm install
```

Frontend
```bash
cd ../frontend
npm install
```
3. Environment Setup
Create a .env file inside the backend folder and add:

```bash
MONGO_URI=your_mongodb_connection_string
PORT=5000
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password_or_app_password
```

4. Run the App
Start Backend

```bash
cd backend
npm start
```
Start Frontend

```bash
cd ../frontend
npm start
```
Now open your browser and go to:
🌐 http://localhost:3000

📬 Contact
For questions, suggestions, or collaborations:

📧 Email: kapoorpaniv45@gmail.com
🔗 LinkedIn:https://in.linkedin.com/in/paniv-kapoor-059807259
💻 GitHub: https://github.com/Paniv45
