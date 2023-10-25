# School Management System API

This repository contains the API for a School Management System. It provides endpoints for managing schools, classrooms, students, and users with different roles. You can use this API for educational institution management, student data tracking, and user authentication.

## Getting Started

API Docs:
https://documenter.getpostman.com/view/13540247/2s9YRE2Bcf

To get started with the API, you can make requests to the following base URL:

- Base URL: [https://school-service-zfmj.onrender.com](https://school-service-zfmj.onrender.com)

## Authentication

You can use the following login credentials to authenticate as different user roles:

1. **Superadmin Credentials**

   - Username: superadmin
   - Password: password

2. **Schooladmin Credentials**
   - Username: schooladmin
   - Password: password

## API Endpoints

The API provides various endpoints to interact with schools, classrooms, students, and users. Below are the available endpoints:

- **Schools**

  - `GET /api/school/getAllSchools`: Retrieve a list of all schools.
  - `GET /api/school/getSchoolById/{schoolId}`: Retrieve a specific school by its ID.
  - `POST /api/school/createSchool`: Create a new school.

- **Classrooms**

  - `GET /api/classroom/getAllClassrooms`: Retrieve a list of all classrooms.
  - `GET /api/classroom/getClassroomById/{classroomId}`: Retrieve a specific classroom by its ID.
  - `POST /api/classroom/createClassroom`: Create a new classroom.

- **Students**

  - `GET /api/student/getAllStudents`: Retrieve a list of all students.
  - `GET /api/student/getStudentById/{studentId}`: Retrieve a specific student by their ID.
  - `POST /api/student/createStudent`: Create a new student.

- **Users**
  - `POST /api/user/createUser`: Create a new user.
  - `POST /api/user/login`: Authenticate and log in as a user.
  - `GET /api/user/getAllUsers`: Retrieve a list of all users.
  - `GET /api/user/getUserById/{userId}`: Retrieve a specific user by their ID.
  - `PUT /api/user/updateUser/{userId}`: Update user details.
  - `DELETE /api/user/deleteUser/{userId}`: Delete a user.

## Usage

You can use API testing tools like Postman or any programming language to make HTTP requests to the provided endpoints. Don't forget to use the appropriate login credentials to access different functionalities based on user roles.

## Contributing

Contributions are welcome! If you have any improvements or suggestions, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
