# 📧 Personalized Cold Email Generator

A web application that helps users generate personalized cold emails efficiently. Built using **React**, **Express**, **JWT Authentication**, and **Firebase Auth**.

## 🚀 Features

- 📩 Generate personalized cold emails with AI assistance
- 🔒 Secure authentication with JWT and Firebase Auth
- 🖥️ User-friendly UI with React and TailwindCSS
- 📡 Backend with Express and MongoDB
- 🎯 Store and manage sent emails for tracking

## 🛠️ Tech Stack

### Frontend
- React
- Tailwind CSS
- Firebase Authentication
- ShadCN

### Backend
- Express.js
- MongoDB
- JWT Authentication

## 🔧 Installation & Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/vivekjpatil1357/coldMail
   cd coldMail
   ```

2. **Install dependencies:**
   ```sh
   # Frontend
   cd client
   npm install

   # Backend
   cd ../server
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the **server** directory and add:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     FIREBASE_API_KEY=your_firebase_api_key
     ```

4. **Run the development servers:**
   ```sh
   # Start backend server
   cd server
   npm run dev

   # Start frontend
   cd ../client
   npm start
   ```

5. **Access the application:**
   Open `http://localhost:3000` in your browser.



## 🚀 Deployment

- Database: Use **MongoDB Atlas**

## 📜 License

This project is licensed under the **MIT License**.

---

💡 **Contributions are welcome!** If you find any issues or have suggestions, feel free to open an issue or a pull request.
