# react-redux-assignment

A simple and responsive **Todo & Product Management Application** built with **React**, **TypeScript**, and **Vite**.  
It helps users manage daily tasks efficiently and also includes a **product purchase flow** with role-based access (Admin/User).

---

## ✨ Features

- ✅ Add, edit, and delete tasks
- ✅ Dark/light mode toggle
- ✅ Responsive design for mobile and desktop
- ✅ Product listing with **Add to Cart** feature
- ✅ Role-based actions:
  - **Admin** → Can add, edit, and delete products
  - **User** → Can browse and purchase products
- ✅ Login authentication with JSON Server
- ✅ Cart checkout & order history

---

## 🛠 Tech Stack

- **Frontend:** React, TypeScript, Vite
- **UI Library:** Material-UI (MUI)
- **State Management:** React Hooks + Redux Toolkit
- **Routing:** React Router
- **Backend (Mock API):** JSON Server

---

## 🚀 Installation

1. **Clone the repository**

```bash
git clone https://github.com/sheetalccube/react-redux-assignment
cd react-redux-assignment
npm install

2. **Start the Frontend **

npm run dev

3. Start the backend (JSON Server)
 npx json-server --watch db.json --port 3000

```

## credentials

Admin Login

Username: admin

Password: 1234
➡️ Admin can add/edit/delete products.

User Login

Username: sheetal

Password: 1234
➡️ User can browse products, add to cart, and purchase.

## Product Purchase Flow

User logs in with their credentials

Browse products from the product list

Add items to the cart

Proceed to checkout → (dummy payment flow)

View purchased items in Order History
