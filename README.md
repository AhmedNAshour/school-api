# School Management System API

This repository contains the API for a School Management System. It provides endpoints for managing schools, classrooms, students, and users with different roles.

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
  - `GET /api/school/getSchoolById?schoolId={schoolId}`: Retrieve a specific school by its ID.
  - `POST /api/school/createSchool`: Create a new school.
  - `PUT /api/school/updateSchool?schoolId={schoolId}`: Update school details.
  - `DELETE /api/school/deleteSchool?schoolId={schoolId}`: Delete a school.
   
- **Classrooms**

  - `GET /api/classroom/getAllClassrooms?schoolId={schoolId}`: Retrieve a list of all classrooms of a specific school.
  - `GET /api/classroom/getClassroomById?schoolId={schoolId}&classroomId={classroomId}`: Retrieve a specific classroom by its ID.
  - `POST /api/classroom/createClassroom`: Create a new classroom.
  - `PUT /api/classroom/updateClassroom?schoolId={schoolId}&classroomId={classroomId}`: Update classroom details.
  - `DELETE /api/classroom/deleteClassroom?schoolId={schoolId}&classroomId={classroomId}`: Delete a classroom.

- **Students**

  - `GET /api/student/getAllStudents`: Retrieve a list of all students.
  - `GET /api/student/getStudentById?schoolId={schoolId}&studentId={studentId}`: Retrieve a specific student by their ID.
  - `GET /api/student/getStudentsBySchool?schoolId={schoolId}`: Retrieves students of a specific school.
  - `GET /api/student/getStudentsByClassroom?schoolId={schoolId}&classroomId={classroomId}`:  Retrieves students of a specific classroom.
  - `POST /api/student/createStudent`: Create a new student.
  - `PUT /api/student/updateStudent?schoolId={schoolId}&studentId={studentId}`: Update student details.
  - `DELETE /api/student/deleteStudent?schoolId={schoolId}&studentId={studentId}`: Delete a student.

- **Users**
  - `POST /api/user/createUser`: Create a new user.
  - `POST /api/user/login`: Authenticate and log in as a user.
  - `GET /api/user/getAllUsers`: Retrieve a list of all users.
  - `GET /api/user/getUserById?userId={userId}`: Retrieve a specific user by their ID.
  - `PUT /api/user/updateUser?userId={userId}`: Update user details.
  - `DELETE /api/user/deleteUser?userId={userId}`: Delete a user.

## Usage

You can use API testing tools like Postman or any programming language to make HTTP requests to the provided endpoints. Don't forget to use the appropriate login credentials to access different functionalities based on user roles.

## Contributing

Contributions are welcome! If you have any improvements or suggestions, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
