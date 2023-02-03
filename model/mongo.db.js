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

  async findOne(model, query) {
    return await model.findOne(query);
  }

  async findAll(model) {
    return await model.find();
  }

  async findById(model, id, filter) {
    this.validateId(id);
    if (filter) return await model.findById(id).select(filter.join(" "));
    return await model.findById(id);
  }

  async create(model, data, filter) {
    if (filter) {
      const item = await model.create(data);
      return await this.findById(model, item._id, filter);
    }
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

  async clear(model) {
    await model.deleteMany({});
  }
}

export default MongoDB;
