# **Auth Service - E-Prescription & Pharmacy Management System**  

🚀 **Auth Service** is a microservice responsible for user authentication, authorization, and role-based access control in the **E-Prescription & Pharmacy Management System**. It provides secure **JWT-based authentication**, **Redis caching**, **role-based access**, and **secure password hashing**.

---

## **📌 Features**
✔️ **User Authentication** (Login, Register, Logout)  
✔️ **Role-Based Access Control** (Admin, Doctor, Pharmacist)  
✔️ **JWT Authentication** with Access & Refresh Tokens  
✔️ **Secure Password Hashing** (bcrypt)  
✔️ **Redis Caching** for performance optimization  
✔️ **User Profile Management**  
✔️ **API Key Validation** for secure inter-service communication  


## **📦 Installation**
### **🔹 Prerequisites**
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)

### **🔹 Clone the Repository**
```sh
git clone https://github.com/olubusade/auth-service.git
cd auth-service
```

### **🔹 Install Dependencies**
```sh
npm install
```

### **🔹 Configure Environment Variables**
Create a `.env` file in the root directory:
```ini
PORT=5001
MONGO_URI=mongodb://localhost:27017/authDB
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1h
REDIS_HOST=localhost
REDIS_PORT=6379
API_KEY=your_api_key
```

---

## **🚀 Running the Service**
### **🔹 Start the Server**
```sh
npm start
```
The service will run on `http://localhost:5001`

---

## **🛠 API Endpoints**
### **🔹 Authentication Routes**
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/auth/register` | Register a new user | Public |
| POST | `/api/auth/login` | User login | Public |

### **🔹 User Management Routes**
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/users/` | Get all users | Admin |
| GET | `/api/users/:id` | Get user by ID | Admin, Doctor, Pharmacist |
| PUT | `/api/users/:id` | Update user profile | Authenticated |
| DELETE | `/api/users/:id` | Delete user | Admin |

---

## **🔐 Authentication & Security**
✔️ **JWT Tokens** - Secure authentication mechanism  
✔️ **Role-Based Access Control (RBAC)** - Restricts routes based on user role  
✔️ **Password Hashing** - Ensures user passwords are securely stored  
✔️ **Redis Caching** - Reduces database queries and improves response time  
✔️ **API Key Validation** - Ensures only authorized services communicate  

---

## **🌍 Deployment**
### **🔹 Using Docker**
1. **Build Docker Image**  
   ```sh
   docker build -t auth-service .
   ```
2. **Run the Container**  
   ```sh
   docker run -p 5001:5001 --env-file .env auth-service
   ```

---

## **📌 Contributing**
1. Fork the repository  
2. Create a new feature branch  
3. Commit changes and push  
4. Open a pull request  

---

## **📞 Support**
For issues or suggestions, create an issue on the [GitHub repository](https://github.com/olubusade/auth-service/issues).

---

## **📜 License**
This project is **MIT Licensed**. See the [LICENSE](LICENSE) file for details.  

---

💡 **Enjoy!** 🚀