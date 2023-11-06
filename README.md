# JWT Authentication App

This Express application demonstrates user authentication, JWT token generation, and route access permissions for different user roles. It includes login routes and resource routes.

## Getting Started

To get started with this application, follow the instructions below.

### Prerequisites

You need to have Node.js and npm (Node Package Manager) installed on your system.

### Installation

1. Clone the repository to your local machine:

   ```sh
   git clone  https://github.com/sabisa-siganga/jwt-authentication.git
   ```

2. Change directory to the project folder:

   ```sh
   cd jwt-authentication
   ```

3. Install the required dependencies:

   ```sh
   npm install
   ```

4. Start the server:

   ```sh
   npm start
   ```

The server will run on http://localhost:8000 by default.

## Usage

### Task 1: User Authentication and JWT Generation

In this task, you can use the following user credentials to log in and obtain JWT tokens, then use the returned token to make the request to the endpoints mentioned below:

- **Admin user (access to /resource and /admin_resource)**

  - Username: sabisa@gmail.com
  - Password: sabisa@gmail.com

- **General user (access to /resource)**
  - Username: jonny@gmail.com
  - Password: jonny@gmail.com

### Task 2: User Access Permissions

In this extended version of the app, three users with different route access permissions are created:

- **Mazvita (access to /a)**

  - Username: Mazvita
  - Password: Mazvita

- **Meagan (access to /a and /b)**

  - Username: Meagan
  - Password: Meagan

- **Kabelo (access to /b and /c)**
  - Username: Kabelo
  - Password: Kabelo

These users have access only to the specific routes mentioned above. To access those routes, you should log in with the corresponding user credentials to obtain JWT tokens, then use the returned token to make the request to the endpoints mentioned below:

## Routes

The application provides the following routes:

- **POST /login**: User authentication route. It returns a JWT token upon successful login.

- **GET /resource**: Accessible to both admin and general users. Displays a message with the user's name.

- **GET /admin_resource**: Accessible only to the admin user. Displays a message if the token is verified and the token holder is an admin.

- **GET /a**: Accessible to Mazvita and Meagan.

- **GET /b**: Accessible to Meagan and Kabelo.

- **GET /c**: Accessible to Kabelo.
