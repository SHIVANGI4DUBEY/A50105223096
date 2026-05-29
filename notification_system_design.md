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



STAGE-2

DB DESIGN

1. Database to be used
based on purpose different datbases can be used like of data transactions Sql based like MySql
for real-time notification reddis can be usedand for large file size colud dtorage like cloudinary and imaginary can be used.

If we used single or simple Sql/NosQl it can lead to tradeoff and later optimization problems

Still if the choice is between sql and no sql I would prefer sql because
ACID transaction and features like joins,indexing,analytics easy integration with powerBi like data analytics tool 

problems on large volume data can be 
1. Large notification handling a
2. data redundancy and to manage duplicates
3. pagination gets slow 
4. Consistency issues occur
 Big data concepts like decentralization cloud dbs and on this level using combination of multiple databases like hybrid mosel is best suited


QUERIES

# USERS TABLE

```sql
CREATE TABLE users (
    user_id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) NOT NULL,
    department VARCHAR(50),
    year INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```



# EVENTS TABLE

```sql
CREATE TABLE events (
    event_id UUID PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    venue VARCHAR(200),
    organized_by VARCHAR(100),
    event_date TIMESTAMP,
    created_by UUID REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```



# PLACEMENTS TABLE

```sql
CREATE TABLE placements (
    placement_id UUID PRIMARY KEY,
    company_name VARCHAR(150) NOT NULL,
    job_role VARCHAR(100),
    package VARCHAR(50),
    min_cgpa NUMERIC(3,2),
    application_deadline TIMESTAMP,
    description TEXT,
    created_by UUID REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```



# RESULTS TABLE

```sql
CREATE TABLE results (
    result_id UUID PRIMARY KEY,
    student_id UUID REFERENCES users(user_id),
    semester INT,
    cgpa NUMERIC(3,2),
    result_pdf_url TEXT,
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```



# NOTIFICATIONS TABLE

```sql
CREATE TABLE notifications (
    notification_id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    title VARCHAR(200),
    message TEXT,
    type VARCHAR(50),
    is_read BOOLEAN DEFAULT FALSE,
    reference_id UUID,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```



# EVENT REGISTRATIONS TABLE

```sql
CREATE TABLE event_registrations (
    registration_id UUID PRIMARY KEY,
    event_id UUID REFERENCES events(event_id),
    student_id UUID REFERENCES users(user_id),
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```


RESTFUL API BASED ON ABOVE APIS IN THIS FILE

# Login Query

API:


POST /auth/login


SQL:

```sql
SELECT user_id, email, password_hash, role
FROM users
WHERE email = '111shivangi.dubey@gmail.com';
```



# Get User Profile

API:


GET /users/profile


SQL:

```sql
SELECT
    user_id,
    name,
    email,
    department,
    year,
    role
FROM users
WHERE user_id = 'U001';
```



# Create Placement

API:


POST /placements


SQL:

```sql
INSERT INTO placements (
    placement_id,
    company_name,
    job_role,
    package,
    min_cgpa,
    application_deadline,
    description,
    created_by
)
VALUES (
    gen_random_uuid(),
    'abc',
    'Software Engineer',
    '10 LPA',
    7.5,
    '2026-06-15',
    'Hiring for 2027 batch',
    'U001'
);


---

# Fetch Placements

API:


GET /placements


SQL:

```sql
SELECT
    placement_id,
    company_name,
    job_role,
    package,
    application_deadline
FROM placements
ORDER BY created_at DESC
LIMIT 10 OFFSET 0;
```



# Create Event

API:


POST /events


SQL:

```sql
INSERT INTO events (
    event_id,
    title,
    description,
    venue,
    organized_by,
    event_date,
    created_by
)
VALUES (
    gen_random_uuid(),
    'Tech Festn 2026',
    '24 hour coding event',
    'B Auditorium',
    'tech Club',
    '2026-06-15 10:00:00',
    'USR2001'
);
```

---

# Register for Event

API:

POST /events/{eventId}/register

SQL:

```sql
INSERT INTO event_registrations (
    registration_id,
    event_id,
    student_id
)
VALUES (
    gen_random_uuid(),
    'E001',
    'U001'
);
```



# Fetch Notifications

API:


GET /notifications


SQL:

```sql
SELECT
    notification_id,
    title,
    message,
    type,
    is_read,
    created_at
FROM notifications
WHERE user_id = 'U001'
ORDER BY created_at DESC
LIMIT 20;
```



# Mark Notification Read

API:


PATCH /notifications/{id}/read


SQL:

```sql
UPDATE notifications
SET is_read = TRUE
WHERE notification_id = 'NOT1001';
```



# Publish Result

API:


POST /results


SQL:

```sql
INSERT INTO results (
    result_id,
    student_id,
    semester,
    cgpa,
    result_pdf_url
)
VALUES (
    gen_random_uuid(),
    'USR1001',
    5,
    8.4,
    'result.pdf'
);
```



# Fetch Student Results

API:


GET /results/{studentId}


SQL:

```sql
SELECT
    semester,
    cgpa,
    result_pdf_url,
    published_at
FROM results
WHERE student_id = 'U001';
```

STAGE-3
The given query seem correct 
It;s function is to fetch notification from students(unread) based on recenecy as mentioned in question



This query can become slow the data is large scale and no proper indexing is done and multiple scans ansd access at same point.

Yes indexing is good idea because otherwise it will scan entire database check every row and sort basded on it 
BUT----
indexing every column is bad as it requires extra space increases splce complexities make operations slower and overhead is craeted
computational overhead 
high time and sapce complexity 
FINALLY NOT A GOOD IDEA
Indexing can be used selectively
computational cost is 
based on time and space complexities


BETTER QUERY

```sql id="abc123"
SELECT
    notificationID,
    title,
    message,
    createdAt
FROM notifications
WHERE studentID = 1042
AND isRead = false
ORDER BY createdAt DESC
LIMIT 20;
```

STAGE-4

It fails as it does sequential execution making it very slow also highly dependent functions leads to high(coupling) Software engineering principle which is not advisable and also it can lead to scalability issues.



FIRST SAVE THEN WE SHOULD SEND 
because-it provides documented proof integrity and autenticity atherwise record and update mismatch


```python id="f6u6fk"
function notify_all(student_ids, message):

    notification_batch_id = create_batch()

    bulk_insert_notifications(student_ids, message)

    publish_to_queue({
        "batch_id": notification_batch_id
    })

    return {
        "status": "accepted"
    }

STAGE-5

```
const API_URL =
  "http://4.224.187.222/evaluation-service/notifications";

// Type priority weights
const TYPE_WEIGHTS = {
  PLACEMENT: 100,
  RESULT: 70,
  EVENT: 40,
};

// User configurable
const TOP_N = 10;

// Maximum age window considered for recency boost
const MAX_AGE_HOURS = 72;

// Fetch notifications from API
async function fetchNotifications(token) {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch notifications: ${response.status}`
      );
    }

    const data = await response.json();

    return data.notifications || [];
  } catch (error) {
    console.error("API Fetch Error:", error.message);
    return [];
  }
}

// Calculate priority score
function calculatePriority(notification) {
  const typeWeight =
    TYPE_WEIGHTS[notification.type] || 10;

  const now = new Date();

  const notificationTime = new Date(
    notification.TimeStamp
  );

  const ageInMilliseconds =
    now - notificationTime;

  const ageInHours =
    ageInMilliseconds / (1000 * 60 * 60);

  // More recent notifications get higher score
  const recencyScore = Math.max(
    0,
    MAX_AGE_HOURS - ageInHours
  );

  return typeWeight + recencyScore;
}

// Get top priority notifications
function getTopNotifications(
  notifications,
  topN = TOP_N
) {
  const scoredNotifications = notifications.map(
    (notification) => ({
      ...notification,
      priorityScore:
        calculatePriority(notification),
    })
  );

  scoredNotifications.sort(
    (a, b) => b.priorityScore - a.priorityScore
  );

  return scoredNotifications.slice(0, topN);
}

// Main execution function
async function main() {
  const token = "YOUR_ACCESS_TOKEN";

  const notifications =
    await fetchNotifications(token);

  const topNotifications =
    getTopNotifications(notifications, 10);

  console.log(
    "Top Priority Notifications:"
  );

  console.table(
    topNotifications.map((notification) => ({
      ID: notification.ID,
      Type: notification.type,
      Message: notification.message,
      TimeStamp: notification.TimeStamp,
      PriorityScore:
        notification.priorityScore.toFixed(2),
    }))
  );
}

