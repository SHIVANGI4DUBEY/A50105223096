 STAGE -1
 
Notification Platform for Campus notification

GIVEN-
A Campus Notification Platform  to receive real-time updates for
placements,results,events etc.

The system supports:


2. Base URL
https://notifyCampus/message

ex for local system
https://localhost:3000//notifyCampus/

different routes and names based on their functionality can be provided after this as we do in our projects.

1. HEADER STRUCTURE 
Request Headers
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN> #if jwt token is used as an AUTH method
X-Device-Id: <DEVICE_ID> #to track the device 
2. Response Format
FOR SUCCESS-
Success Response
{
  "success": true,
  "message": "Notification fetched successfully",
  "data": {},
  "timestamp": "2026-05-29T10:30:00Z"
}
FOR ERROR-
Error Response
{
  "success": false,
  "message": "Invalid token",
  "errorCode": "AUTH_401",
  "timestamp": "2026-05-29T10:30:00Z"
}
3. Authentication APIs
  a. Student Login
Endpoint
POST /auth/login
Request Body
{
  "email": "student@abc.com",
  "password": "Pswd123@"
}
Response
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "jwt_access_token",
    "refreshToken": "jwt_refresh_token",
    "user": {
      "userId": "U001",
      "name": "Shivangi Dubey",
      "role": "STUDENT"
    }
  }
}


       b. Refresh Token
Endpoint
POST /auth/refresh-token
Request
{
  "refreshToken": "jwt_refresh_token"
}


         c. Logout
Endpoint
POST /auth/logout




4. User APIs
   a. Get Profile
Endpoint
GET /users/profile
Response
{
  "success": true,
  "data": {
    "userId": "U001",
    "name": "Shivangi Dubey",
    "email": "111shivangi.dubey@gmail.com",
    "department": "CSE",
    "year": 3,
    "role": "STUDENT"
  }
}



  5. Placement Notification APIs
7.1 Create new notification for placement (Admin/Placement Cell)
Endpoint
POST /placements
Request Body
{
  "companyName": "abc",
  "jobRole": "Software Engineer",
  "package": "10 LPA",
  "eligibilityCriteria": {
    "minCGPA": 7.5
  },
  "applicationDeadline": "2026-06-10T23:59:00Z",
  "description": "Hiring for 2027 batch"
}
Response
{
  "success": true,
  "message": "Placement notification created  !",
  "data": {
    "placementId": "PL001"
  }
}
7.2 Get All Placements


Endpoint
GET /placements?page=1&limit=10
=> it is used to filter out 10 placement notifications and limit to 1 page 
Response
{
  "success": true,
  "data": {
    "placements": [
      {
        "placementId": "PL001",
        "companyName": "abc",
        "jobRole": "Software Engineer",
        "package": "10 LPA",
        "postedAt": "2026-05-29T09:00:00Z"
      }
    ]
  }
}


6. To get placement details
Endpoint
GET /placements/{placementId}
#This will get placement details based on placement id entered in url

7. Event APIs
a. To  Create Event
Endpoint
POST /events
Request Body
{
  "title": "TechFest",
  "description": "24-hour coding event",
  "eventDate": "2026-06-15T10:00:00Z",
  "venue": "B Auditorium",
  "organizedBy": "Tech Club"
}
b. Get All Events
Endpoint
GET /events
c. Register for Event
Endpoint
POST /events/{eventId}/register
Request Body
{
  "studentId": "U001"
}


8. Result APIs
a. To  Publish Result =>by admin or faculty
Endpoint
POST /results
Request Body
{
  "semester": 5,
  "department": "CSE",
  "resultPdfUrl": "result.pdf"
}

9. To  Get Student Result
Endpoint
GET /results/{studentId}
Response
{
  "success": true,
  "data": {
    "studentId": "U001",
    "semester": 5,
    "cgpa": 8.4,
    "subjects": [
      {
        "subjectName": "DBMS",
        "grade": "A",
        "marks":95
      }
    ]
  }
}
10. Notification APIs
a. To  Get Notifications
Endpoint
GET /notifications
Response
{
  "success": true,
  "data": {
    "notifications": [
      {
        "notificationId": "N001",
        "title": "New Placement Opportunity",
        "message": "company hiring for SDE role",
        "type": "PLACEMENT",
        "isRead": false,
        "createdAt": "2026-05-29T10:00:00Z"
      }
    ]
  }
}

b. Delete Notification
Endpoint
DELETE /notifications/{notificationId}
------------------------------------------------------------

 Real-Time Notification Mechanism


We can use websockets like socket.io for real time message updates and push information (like firebase cloud)and to manage queue kafka  .
Like in whatsapp also we have it which updates it on real time and also in payment apps.




Demo WebSocket Design
Connection URL
wss://CampusNotify.com/ws
Client Connection Payload
{
  "token": "jwt_access_token",
  "userId": "U001"
}


----------------------------------------
DATABASE SCHEMA 

Users Table
{
  "userId": "U001",
  "name": "Shivangi Dubey",
  "email": "111shivangi.dubey@gmail.com",
  "passwordHash": "hashed_password",
  "role": "STUDENT",
  "department": "CSE",
  "year": 3,
  "createdAt": "2026-05-29T10:00:00Z"
}
Notifications Table
{
  "notificationId": "N001",
  "userId": "U001",
  "title": "Placement Drive",
  "message": "abc is  hiring now",
  "type": "PLACEMENT",
  "isRead": false,
  "createdAt": "2026-05-29T10:00:00Z"
}
Placements Table
{
  "placementId": "P001",
  "companyName": "abc",
  "jobRole": "Software Engineer",
  "package": "10 LPA",
  "applicationDeadline": "2026-06-10T23:59:00Z"
}
Events Table
{
  "eventId": "E001",
  "title": " Tech Fest",
  "venue": "B Auditorium",
  "eventDate": "2026-06-15T10:00:00Z"
}
