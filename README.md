# 🍽️ FlavourFleet - Food Delivery App (MERN Stack)

FlavourFleet is a complete food delivery web application developed using the **MERN Stack** – MongoDB, Express.js, React.js, and Node.js. It includes **user authentication**, **admin dashboard**, **cart and order management**, **payment integration**, and **email notifications**.

---

## 🚀 Features

### ✅ User Features:
- User registration and login with JWT
- View menu items and categories
- Add/remove items from cart
- Place orders and make payments
- View order history and track status
- Email confirmation on successful order

### 🔐 Admin Features:
- Admin authentication
- Add/update/delete food items
- Manage users and orders
- View order analytics (optional)
- Email alerts to users

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- Context API
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for Authentication
- Bcrypt for password hashing
- Stripe for payments
- Nodemailer for emails

---

## 🧑‍💻 Local Development Setup

### Prerequisites:
- Node.js & npm installed
- MongoDB (local or cloud)
- Stripe account for test keys

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/flavourfleet.git
cd flavourfleet
```

### Setup for Frontend
- Go to Frontend folder
- cd Frontend
- npm install

### Setup for Admin Pannel
- Go to Admin folder
- cd admin
- npm install
  
### Setup for Backend
- Go to Backend folder
- cd Backend
- npm install

### Run the frontend
- npm run dev

### Run the admin
- npm run dev
  
### Run the Server
- nodemon or npm run start

### Setup env in Backend
- Add mongoDB URI
- Add email and password for mailing

### ⚠️ Important: Enable App Password for Gmail
-If you're using Gmail, and you have 2-step verification enabled, you can't use your regular email password. You need to generate an App Password:

- 🔒 How to Generate Gmail App Password:
- Go to Google My Account

- Navigate to Security

- Enable 2-Step Verification (if not already done)

- Scroll to App Passwords

- Choose Mail as the app and Other (enter FlavourFleet) as the device

- Generate — it will give you a 16-character password

- Use that in .env as EMAIL_PASS
