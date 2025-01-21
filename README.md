
# ePrescription Management System  

## Overview  
The **ePrescription Management System** is a web-based application designed to manage electronic prescriptions efficiently using **Role-Based Access Control (RBAC)**. It follows a **microservices architecture** to ensure scalability, modularity, and maintainability.  

The system is divided into two main parts:  
1. **Frontend:** Built with Angular, providing a responsive UI.  
2. **Backend:** Developed using Node.js, consisting of multiple microservices for modular functionality.  

## Why Microservices?  
Microservices allow for better scalability and separation of concerns. Each service is responsible for a specific functionality, making the system easier to develop, deploy, and maintain. The key benefits include:  
- **Scalability:** Individual services can be scaled independently based on demand.  
- **Fault Tolerance:** A failure in one microservice does not affect others.  
- **Flexibility:** Different services can use different technologies if needed.  
- **Improved Security:** Role-based access is enforced at the service level.  

---
## 📌 Outstanding Technical Properties?

✅ **Proper Data Flow:** Fetches from MongoDB when Redis cache is empty.
✅ **Performance Optimization:** Uses Redis caching for faster responses.
✅ **Scalability:** Modular MVC structure allows easy future enhancements.
✅ **Security:** API key validation and JWT authentication.
✅ **Resiliency:** Ensures data consistency across microservices.

---
## Technologies Used  

### **Frontend (Angular)**  
- **Framework:** Angular  
- **State Management:** (if applicable, e.g., NgRx)  
- **HTTP Client:** Handles API communication  
- **UI Components:** (if applicable, e.g., Material UI, Bootstrap)  

### **Backend (Node.js - Microservices Architecture)**  
- **API Gateway:** Central entry point for routing requests  
- **Authentication & Authorization:** JSON Web Token (JWT)  
- **Database:** MongoDB (hosted online)  
- **Caching:** Redis for performance optimization  
- **Real-Time Communication:** Socket.IO for notifications  
- **Security:** Helmet for HTTP headers protection  
- **Logging & Debugging:** Morgan  

## **Project Structure**  
```
ePrescription-Management-System/
│── frontend/              # Angular frontend application
│── backend/               # Backend microservices
│   │── api-gateway/       # Central API gateway
│   │── auth-service/      # Authentication & role management
│   │── pharmacy-service/  # Pharmacy operations
│   │── prescription-service/ # Manages ePrescriptions
│   │── notification-service/ # Real-time alerts using Socket.IO
│── README.md
│── .gitignore
│── package.json
```

---

## **Microservices Breakdown**  

### 1. **API Gateway**  
- Routes requests to appropriate microservices.  
- Ensures authentication and authorization using JWT.  

### 2. **Auth Service**  
- Manages user authentication and role-based access.  
- Issues JWT tokens for secure authentication.  

### 3. **Pharmacy Service**  
- Handles medicine availability, inventory management, and pharmacy-related tasks.  

### 4. **Prescription Service**  
- Allows doctors to create, update, and manage prescriptions.  
- Ensures data integrity and compliance with regulations.  

### 5. **Notification Service**  
- Uses **Socket.IO** to send real-time notifications to users.  
- Notifies pharmacists when a new prescription is assigned.  

---

## **Role-Based Access Control (RBAC)**  
The system enforces role-based access to ensure data security and proper authorization:  

| **Role**       | **Permissions**                                              |
|---------------|--------------------------------------------------------------|
| **Admin**      | Manage users, settings, and system logs.                     |
| **Pharmacist** | View and process prescriptions assigned to them.             |
| **Doctor**     | Create and manage prescriptions for patients.                |

---

## **Setup & Installation**  

### **1. Clone the Repository**  
```bash
git clone https://github.com/olubusade/eprescription-mngt-system.git
cd ePrescription-Management-System
```

### **2. Install Dependencies**  
```bash
cd backend
npm install
```

```bash
cd frontend
npm install
```

### **3. Configure Environment Variables**  
Create a `.env` file in the **backend** directory for each microservice and define necessary variables:  
```env
MONGO_URI=<your_mongo_db_connection>
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=<your_jwt_secret>
```

### **4. Install and Setup Redis (Linux/MacOS)**  
#### **Install Redis on Ubuntu/Debian**  
```bash
sudo apt update
sudo apt install redis-server
```
Modify Redis configuration to allow persistent storage:  
```bash
sudo nano /etc/redis/redis.conf
```
Find `supervised no` and change it to:  
```
supervised systemd
```
Restart Redis:  
```bash
sudo systemctl restart redis
```
Verify Redis is running:  
```bash
redis-cli ping
```
It should return `PONG`.

#### **Install Redis on Windows**  
- Download Redis from the official website: [Redis for Windows](https://github.com/microsoftarchive/redis/releases)  
- Extract and run `redis-server.exe`  

---

## **Running the Application**  

### **Start Backend Microservices**  
```bash
cd backend/api-gateway
npm start

cd ../auth-service
npm start

cd ../pharmacy-service
npm start

cd ../prescription-service
npm start

cd ../notification-service
npm start
```

### **Start the Frontend**  
```bash
cd frontend
npm start
```
Access the application at:  
```bash
http://localhost:4200
```

---

## **Testing the System**  

### **API Testing with Postman**  
- Use Postman to send API requests to different services.  
- Authenticate users and retrieve JWT tokens for protected routes.  

### **Socket.IO Real-Time Notifications**  
- Open multiple clients and observe real-time updates when a doctor assigns a prescription.  

---

## **Security Considerations**  
- **JWT Authentication** ensures secure user sessions.  
- **Helmet** is used to protect against common security vulnerabilities.  
- **CORS** is configured to restrict API access.  
- **MongoDB Database** is hosted online with access restrictions.  

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