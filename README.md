# 🛍️ Item Management Web App

This is a full-stack web application for managing items (e.g., shirts, pants, shoes, sports gear, etc.). It allows users to add new items, view them in a gallery, and explore detailed information in a modal dialog with an image carousel.

---

## 📌 Features

### 🔹 Frontend (React + ShadCN + Tailwind)
- Add new item with:
  - Item name
  - Type (Shirt, Pant, Shoes, Sports Gear, Other)
  - Description
  - Cover image
  - Additional images
- View all items in a responsive gallery
- Click any item to open a modal with:
  - Full details
  - Image carousel (ShadCN Carousel)
  - “Enquire” button
- Clean and responsive UI using Tailwind CSS
- Controlled routing using React Router

### 🔹 Backend (Node.js + Express + MongoDB)
- REST API to:
  - Add new item
  - Get all items
  - Get item by ID
  - Delete item
- Stores items in MongoDB with schema validation
- Handles large image payloads (base64-encoded)
- `.env` file for environment variables

---

## 📁 Project Structure

root/
├── backend/
│ ├── controller/
│ │ └── itemController.js
│ ├── model/
│ │ └── itemModel.js
│ ├── routes/
│ │ └── itemRoute.js
│ ├── .env
│ ├── index.js
│ └── package.json
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── AddItem.jsx
│ │ │ ├── ViewItems.jsx
│ │ │ └── ImageCarousel.jsx
│ │ └── App.jsx
│ ├── public/
│ ├── .env
│ └── package.json
└── README.md


---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or Atlas)
- npm or yarn

---

### 🛠️ Backend Setup

```bash
cd backend
npm install

node index.js
