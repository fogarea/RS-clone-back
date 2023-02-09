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

  async findMany(model, query) {
    return await this.db.findMany(model, query);
  }

  async findAll(model) {
    return await this.db.findAll(model);
  }

  async findById(model, id) {
    return await this.db.findById(model, id);
  }

  async create(model, data) {
    return await this.db.create(model, data);
  }

  async update(model, data) {
    return await this.db.update(model, data);
  }

  async delete(model, id) {
    return await this.db.delete(model, id);
  }

  async clear(model) {
    return await this.db.clear(model);
  }

  normalize(result) {
    return this.db.normalize(result);
  }

  normalizeAll(results) {
    return this.db.normalizeAll(results);
  }

  applyLanguage(results, lang) {
    return this.db.applyLanguage(results, lang);
  }
}

const mongo = new mongoDB(DB.MONGO_CFG);
export default new DB_Provider(mongo);
