import { DB } from "../config.js";
import mongoDB from "./mongo.db.js";

class DB_Provider {
  constructor(db) {
    this.db = db;
    this.connect();
  }

  async connect() {
    await this.db.connect();
  }

  async findOne(model, query) {
    return await this.db.findOne(model, query);
  }

  async findAll(model) {
    return await this.db.findAll(model);
  }

  async findById(model, id, filter = false) {
    return await this.db.findById(model, id, filter);
  }

  async create(model, data, filter = false) {
    return await this.db.create(model, data, filter);
  }

  async update(model, data) {
    return await this.db.update(model, data);
  }

  async delete(model, id) {
    return await this.db.delete(model, id);
  }
}

const mongo = new mongoDB(DB.MONGO_CFG);
export default new DB_Provider(mongo);
