module.exports = class School {
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
    this.httpExposed = [
      'post=createSchool',
      'get=getAllSchools',
      'put=updateSchool',
      'get=getSchoolById',
      'delete=deleteSchool',
    ];
  }

  async createSchool({ __superAdminAuth, name, location }) {
    const schoolData = { name, location };

    let newSchool = new this.mongomodels.school(schoolData);
    let createdSchool = await newSchool.save();

    // Response
    return createdSchool;
  }

  async getAllSchools({ __superAdminAuth }) {
    try {
      const schools = await this.mongomodels.school.find();
      return schools;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async updateSchool({ __sharedAuth, name, location, schoolId }) {
    // Update Logic
    const updatedSchool = await this.mongomodels.school.findByIdAndUpdate(
      schoolId,
      { name, location },
      { new: true }
    );
    if (!updatedSchool) {
      throw new Error('School not found');
    }

    // Response
    return updatedSchool;
  }

  async getSchoolById({ __sharedAuth, schoolId }) {
    const school = await this.mongomodels.school.findById(schoolId);
    if (!school) {
      throw new Error('School not found');
    }

    return school;
  }

  async deleteSchool({ __superAdminAuth, schoolId }) {
    const deletedSchool = await this.mongomodels.school.findByIdAndRemove(
      schoolId
    );
    if (!deletedSchool) {
      throw new Error('School not found');
    }

    return deletedSchool;
  }
};
