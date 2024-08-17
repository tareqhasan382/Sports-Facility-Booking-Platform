# Booking System API

## Technology Stack

- **Programming Language**: TypeScript
- **Web Framework**: Express.js
- **ODM & Validation Library**: Mongoose for MongoDB
- **Validation Library**: Zod
- **port :** 50000

## Features

1. **User Management**:

   - User sign-up
   - User login

2. **Facility Management** (Admin Only):

   - Create, update, and delete facilities
   - Retrieve all facilities

3. **Booking Management**:
   - Check availability of time slots
   - Create, view, and cancel bookings
   - View bookings by user

## API Endpoints

### User Routes

#### User Sign Up

- Route: POST /api/auth/signup
- Request Body:

```bash
{
  "name": "Programming Hero",
  "email": "web@programming-hero.com",
  "password": "programming-hero",
  "phone": "01322901105",
  "role": "admin",
  "address": "Level-4, 34, Awal Centre, Banani, Dhaka"
}

```

- Response:

```bash
{
  "success": true,
  "statusCode": 200,
  "message": "User registered successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c4",
    "name": "Programming Hero",
    "email": "web@programming-hero.com",
    "role": "admin",
    "phone": "01322901105",
    "address": "Level-4, 34, Awal Centre, Banani, Dhaka"
  }
}

```

#### User Login

- Route: POST /api/auth/login
- Request Body:

```bash

{
  "email": "web@programming-hero.com",
  "password": "programming-hero"
}

```

- Response:

```bash

{
  "success": true,
  "statusCode": 200,
  "message": "User logged in successfully",
  "token": "JWT_TOKEN",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c4",
    "name": "Programming Hero",
    "email": "web@programming-hero.com",
    "role": "admin",
    "phone": "01322901105",
    "address": "Level-4, 34, Awal Centre, Banani, Dhaka"
  }
}

```

### Facility Routes

#### Create a Facility (Admin Only)

- Route: `POST /api/facility`
- Headers: Authorization: Bearer JWT_TOKEN
- Request Body:

```bash
{
  "name": "Tennis Court",
  "description": "Outdoor tennis court with synthetic surface.",
  "pricePerHour": 30,
  "location": "456 Sports Ave, Springfield"
}

```

- Response:

```bash
{
  "success": true,
  "statusCode": 200,
  "message": "Facility added successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Tennis Court",
    "description": "Outdoor tennis court with synthetic surface.",
    "pricePerHour": 30,
    "location": "456 Sports Ave, Springfield",
    "isDeleted": false
  }
}


```

#### Update a Facility (Admin Only)

- Route: `PUT /api/facility/:id`
- Headers: Authorization: Bearer JWT_TOKEN
- Request Body:

```bash
{
  "name": "Updated Tennis Court",
  "description": "Updated outdoor tennis court with synthetic surface.",
  "pricePerHour": 35,
  "location": "789 Sports Ave, Springfield"
}

```

- Response:

```bash
{
  "success": true,
  "statusCode": 200,
  "message": "Facility updated successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Updated Tennis Court",
    "description": "Updated outdoor tennis court with synthetic surface.",
    "pricePerHour": 35,
    "location": "789 Sports Ave, Springfield",
    "isDeleted": false
  }
}

```

#### Delete a Facility - Soft Delete (Admin Only)

- Route: DELETE /api/facility/:id
- Headers: Authorization: Bearer JWT_TOKEN

- Response:

```bash
{
  "success": true,
  "statusCode": 200,
  "message": "Facility deleted successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Updated Tennis Court",
    "description": "Updated outdoor tennis court with synthetic surface.",
    "pricePerHour": 35,
    "location": "789 Sports Ave, Springfield",
    "isDeleted": true
  }
}

```

#### Get All Facilities

- Route: GET /api/facility

- Response:

```bash
{
  "success": true,
  "statusCode": 200,
  "message": "Facilities retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c5",
      "name": "Tennis Court",
      "description": "Outdoor tennis court with synthetic surface.",
      "pricePerHour": 30,
      "location": "456 Sports Ave, Springfield",
      "isDeleted": false
    }
  ]
}

```

### Booking Routes

#### Check Availability

- Route: GET /api/check-availability
- Query Parameters

  - date (string, optional): The date for which availability is to be checked. Format: YYYY-MM-DD. If not provided, today's date will be used by default.

- Response:

```bash
{
  "success": true,
  "statusCode": 200,
  "message": "Availability checked successfully",
  "data": [
    {
      "startTime": "08:00",
      "endTime": "10:00"
    },
    {
      "startTime": "14:00",
      "endTime": "16:00"
    }
  ]
}

```

#### Create a Booking (User Only)

- Route: POST /api/bookings
- Headers: Authorization: Bearer JWT_TOKEN

- Request Body:

```bash
{
  "facility": "60d9c4e4f3b4b544b8b8d1c5",
  "date": "2024-06-15",
  "startTime": "10:00",
  "endTime": "13:00"
}

```

- Response:

```bash
{
  "success": true,
  "statusCode": 200,
  "message": "Booking created successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c6",
    "facility": "60d9c4e4f3b4b544b8b8d1c5",
    "date": "2024-06-15",
    "startTime": "10:00",
    "endTime": "13:00",
    "user": "60d9c4e4f3b4b544b8b8d1c4",
    "payableAmount": 90,
    "isBooked": "confirmed"
  }
}

```

#### View All Bookings (Admin Only)

- Route: GET /api/bookings
- Headers: Authorization: Bearer JWT_TOKEN

- Response:

```bash
{
  "success": true,
  "statusCode": 200,
  "message": "Bookings retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c6",
      "facility": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Tennis Court",
        "description": "Outdoor tennis court with professional-grade surface.",
        "pricePerHour": 30,
        "location": "123 Main Street",
        "isDeleted": false
      },
      "date": "2024-06-15",
      "startTime": "10:00",
      "endTime": "13:00",
      "user": {
        "_id": "60d9c4e4f3b4b544b8b8d1c4",
        "name": "Programming Hero",
        "email": "programming.hero@example.com",
        "phone": "+1234567890",
        "role": "user"
      },
      "payableAmount": 90,
      "isBooked": "confirmed"
    }
  ]
}

```

#### Cancel a Booking (User Only)

- Route: DELETE /api/bookings/:id
- Headers: Authorization: Bearer JWT_TOKEN

- Response:

```bash
{
  "success": true,
  "statusCode": 200,
  "message": "Booking canceled successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c6",
    "facility": "60d9c4e4f3b4b544b8b8d1c5",
    "date": "2024-06-15",
    "startTime": "10:00",
    "endTime": "13:00",
    "user": "60d9c4e4f3b4b544b8b8d1c4",
    "payableAmount": 90,
    "isBooked": "canceled"
  }
}


```
