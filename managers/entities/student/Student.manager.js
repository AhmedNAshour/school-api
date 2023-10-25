module.exports = class Student {
  constructor({
    utils,
    // cache,
    config,
    // cortex,
    managers,
    // validators,
    mongomodels,
  } = {}) {
    this.config = config;
    // this.cortex = cortex;
    // this.validators = validators;
    this.mongomodels = mongomodels;
    this.tokenManager = managers.token;
    // this.usersCollection = 'users';
    this.httpExposed = [
      'post=createStudent',
      'get=getAllStudents',
      'get=getStudentById',
      'get=getStudentsBySchool',
      'get=getStudentsByClassroom',
      'put=updateStudent',
      'delete=deleteStudent',
    ];
  }

  async createStudent({
    __sharedAuth,
    schoolId,
    name,
    age,
    grade,
    classroomId,
  }) {
    try {
      const student = new this.mongomodels.student({
        name,
        age,
        grade,
        classroom: classroomId,
        school: schoolId,
      });
      const newStudent = await student.save();
      return newStudent;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getAllStudents({ __superAdminAuth }) {
    try {
      const students = await this.mongomodels.student.find({});
      return students;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getStudentsBySchool({ __sharedAuth, schoolId, classroomId }) {
    try {
      const students = await this.mongomodels.student.find({
        school: schoolId,
      });
      return students;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getStudentsByClassroom({ __sharedAuth, schoolId, classroomId }) {
    try {
      const students = await this.mongomodels.student.find({
        school: schoolId,
        classroom: classroomId,
      });
      return students;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getStudentById({ __sharedAuth, schoolId, studentId }) {
    try {
      const student = await this.mongomodels.student.findById(studentId);
      if (!student) {
        throw new Error('Student not found');
      }
      return student;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async updateStudent({
    __sharedAuth,
    schoolId,
    name,
    contactInfo,
    studentId,
  }) {
    try {
      const updatedStudent = await this.mongomodels.student.findByIdAndUpdate(
        studentId,
        { name, contactInfo },
        { new: true }
      );
      if (!updatedStudent) {
        throw new Error('Student not found');
      }
      return updatedStudent;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async deleteStudent({ __sharedAuth, schoolId, studentId }) {
    try {
      const deletedStudent = await this.mongomodels.student.findByIdAndRemove(
        studentId
      );
      if (!deletedStudent) {
        throw new Error('Student not found');
      }
      return deletedStudent;
    } catch (err) {
      throw new Error(err.message);
    }
  }
};
