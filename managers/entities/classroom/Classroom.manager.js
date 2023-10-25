module.exports = class Classroom {
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
      'post=createClassroom',
      'get=getAllClassrooms',
      'get=getClassroomById',
      'put=updateClassroom',
      'delete=deleteClassroom',
    ];
  }

  async createClassroom({ __sharedAuth, name, capacity, schoolId }) {
    try {
      const classroom = new this.mongomodels.classroom({
        name,
        capacity,
        school: schoolId,
      });
      const newClassroom = await classroom.save();
      return newClassroom;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getAllClassrooms({ __sharedAuth, schoolId }) {
    try {
      const classrooms = await this.mongomodels.classroom.find({
        school: schoolId,
      });
      return classrooms;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getClassroomById({ __sharedAuth, schoolId, classroomId }) {
    try {
      const classroom = await this.mongomodels.classroom.findById(classroomId);
      if (!classroom) {
        throw new Error('Classroom not found');
      }
      return classroom;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async updateClassroom({
    __sharedAuth,
    schoolId,
    name,
    capacity,
    classroomId,
  }) {
    try {
      const updatedClassroom =
        await this.mongomodels.classroom.findByIdAndUpdate(
          classroomId,
          { name, capacity },
          { new: true }
        );
      if (!updatedClassroom) {
        throw new Error('Classroom not found');
      }
      return updatedClassroom;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async deleteClassroom({ __sharedAuth, schoolId, classroomId }) {
    try {
      const deletedClassroom =
        await this.mongomodels.classroom.findByIdAndRemove(classroomId);
      if (!deletedClassroom) {
        throw new Error('Classroom not found');
      }
      return deletedClassroom;
    } catch (err) {
      throw new Error(err.message);
    }
  }
};
