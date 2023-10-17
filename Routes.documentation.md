# User API

This API provides endpoints for user registration and user authentication.

## Routes

### User Registration

- **URL:** `POST /user/register`
- **Description:** Register a new user in the application.
- **Request Body (JSON):**

  ```json
  {
    "FirstName": "First Name",
    "LastName": "Last Name",
    "Username": "Username",
    "Adress": "Address",
    "Birthdate": "Date of Birth",
    "Email": "Email Address",
    "Password": "Password",
    "Image": "Image URL",
    "Qr": "QR Code",
    "Tickets": "Tickets",
    "Role": "Role"
  }
  ```

- **Response Body(JSON):**
  ```json
  {
      {
        "token": "Authentication Token",
        "user": {
            // User data
        },
        "message": "User created successfully"
        }
    }
  ```

## ERRORS

- 400 Bad Request: User already exists.
- 500 Internal Server Error: Could not create the user

### User Login

- **URL:** `POST /user/login`
- **Description:** Log in to the application with the provided credentials.
- **Request Body (JSON):**

```json
{
  "Email": "Email Address",
  "Password": "Password"
}
```

- **Response Body(JSON):**

```json
{
  "user": {
    // User data
  },
  "token": "Authentication Token",
  "message": "User logged in successfully"
}
```

## ERRORS
- 400 Bad Request: Incorrect credentials.
- 404 Not Found: User not found.
- 500 Internal Server Error: Could not log in the user.
