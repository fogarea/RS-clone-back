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
      mongoose.set("strictQuery", true);
      await mongoose.connect(this.config.URL, this.config.SETTINGS);
    } catch (e) {
      console.error(`DB CONNECTION FAILED: ${e}`);
    }
  }

  async findOne(model, query) {
    const result = await model.findOne(query);
    if (result?._doc) return { ...result._doc };
    else return null;
  }

  async findAll(model) {
    const result = await model.find();
    return [...result];
  }

  async findMany(model, query) {
    const result = await model.find(query);
    return [...result];
  }

  async findById(model, id) {
    this.validateId(id);

    const result = await model.findById(id);
    if (result?._doc) return { ...result._doc };
    else return null;
  }

  async create(model, data) {
    const item = await model.create(data);
    return await this.findById(model, item._id);
  }

  async update(model, data) {
    this.validateId(data._id);
    const result = await model.findByIdAndUpdate(data._id, data, {
      new: true
    });

    if (result?._doc) return { ...result._doc };
    else throw Error(`item with this id not found`);
  }

  async findOneAndUpdate(model, filter, data) {
    const item = await model.findOneAndUpdate(filter, data, {
      new: true
    });
    if (item?._doc) return item._doc;
    else return null;
  }

  async delete(model, id) {
    this.validateId(id);
    const result = await model.findByIdAndDelete(id);
    return { ...result._doc };
  }

  validateId(id) {
    if (!id) throw new Error("NO `ID` WAS PROVIDED");
  }

  async clear(model) {
    await model.deleteMany({});
  }

  normalize(result) {
    if (!result) return result;
    if (result._id) result.id = result._id;
    delete result.password;
    delete result._id;
    delete result.__v;
    delete result.iat;
    delete result.exp;
    return result;
  }

  normalizeAll(results) {
    const normalized = [];
    for (const result of results) normalized.push(this.normalize(result._doc));
    return normalized;
  }

  applyLanguage(results, lang) {
    const translated = [];

    const translate = (result, lang) => {
      if (result.hasOwnProperty("en")) {
        result = result[lang];
      }
      return result;
    };

    for (const result of results) {
      if (result)
        Object.keys(result).forEach((key) => {
          if (Array.isArray(result[key])) {
            result[key] = result[key].map((subResult) => {
              return translate(subResult._doc || subResult, lang);
            });
          } else if (typeof result[key] === "object") {
            result[key] = translate(result[key], lang);
          }
        });

      translated.push(result);
    }
    return translated;
  }

  async close() {
    await mongoose.connection.close();
  }
}

export default MongoDB;
