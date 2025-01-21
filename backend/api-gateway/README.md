# start redis with docker (optional)
 docker run --name redis -p 6379:6379 -d redis

# Test API with Postman or cURL
curl -X GET http://localhost:5000/api/dashboard


📌 Outstanding Technical Properties?
✅ Proper Data Flow – Fetches from MongoDB when Redis cache is empty.
✅ Performance Optimization – Uses Redis caching for faster responses.
✅ Scalability – Modular MVC structure allows easy future enhancements.
✅ Security – API key validation and JWT authentication.
✅ Resiliency – Ensures data consistency across microservices.