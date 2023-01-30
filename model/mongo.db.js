import mongoose from "mongoose";

class MongoDB {
  /**
   * @param {{URL: string, SETTINGS: {[key: string]: string}}} config
   */

  constructor(config) {
    if (MongoDB.instance) return MongoDB.instance;

    this.config = config;
    MongoDB.instance = this;
  }

  async connect() {
    try {
      await mongoose.connect(this.config.URL, this.config.SETTINGS);
      console.log("Mongo DB connected");
    } catch (e) {
      console.error(`DB CONNECTION FAILED: ${e}`);
    }
  }

  async find(model) {
    return await model.find();
  }

  async findById(model, id) {
    this.validateId(id);
    return await model.findById(id);
  }

  async create(model, data) {
    return await model.create(data);
  }

  async update(model, data) {
    this.validateId(data._id);
    return await model.findByIdAndUpdate(data._id, data, {
      new: true
    });
  }

  async delete(model, id) {
    this.validateId(id);
    return await model.findByIdAndDelete(id);
  }

  validateId(id) {
    if (!id) throw new Error("NO `ID` WAS PROVIDED");
  }
}

export default MongoDB;
