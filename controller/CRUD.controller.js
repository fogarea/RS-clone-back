import DB_Provider from "../model/provider.js";

export class CRUDController {
  constructor(model, endpoint) {
    this.model = model;
    this.endpoint = endpoint;
  }

  async get(_, res, raw = false) {
    try {
      const items = await DB_Provider.findAll(this.model);
      if (raw && typeof raw === "string") return items;
      return res.json(items);
    } catch (e) {
      const err = {
        message: `CANNOT READ ${this.endpoint.toUpperCase()}`,
        error: e.message
      };
      if (raw && typeof raw === "string") return err;
      else return res.status(500).json(err);
    }
  }

  async getById(req, res, raw = false) {
    const itemID = req.params?.id;

    try {
      const item = await DB_Provider.findById(this.model, itemID);
      if (raw && typeof raw === "string") return item;
      return res.json(item);
    } catch (e) {
      const err = {
        message: `CANNOT GET ${this.endpoint.toUpperCase()} BY ID: ${itemID}`,
        error: e.message
      };
      if (raw && typeof raw === "string") return err;
      else return res.status(500).json(err);
    }
  }

  async create(req, res, raw = false) {
    try {
      const createdItem = await DB_Provider.create(this.model, req.body);
      if (raw && typeof raw === "string") return createdItem;
      return res.json(createdItem);
    } catch (e) {
      const err = {
        message: `CANNOT CREATE ${this.endpoint.toUpperCase()}`,
        error: e.message
      };
      if (raw && typeof raw === "string") return err;
      else return res.status(500).json(err);
    }
  }

  async update(req, res, raw = false) {
    const item = req.body;

    try {
      const updatedItem = await DB_Provider.update(this.model, item);
      if (raw && typeof raw === "string") return updatedItem;
      return res.json(updatedItem);
    } catch (e) {
      const err = {
        message: `CANNOT UPDATE ${this.endpoint.toUpperCase()} WITH ID: ${item._id}`,
        error: e.message
      };
      if (raw && typeof raw === "string") return err;
      else return res.status(500).json(err);
    }
  }

  async delete(req, res, raw = false) {
    const itemID = req.params?.id;

    try {
      const deletedItem = await DB_Provider.delete(this.model, itemID);
      if (raw && typeof raw === "string") return deletedItem;
      return res.json(deletedItem);
    } catch (e) {
      const err = {
        message: `CANNOT DELETE ${this.endpoint.toUpperCase()} WITH ID: ${itemID}`,
        error: e.message
      };
      if (raw && typeof raw === "string") return err;
      else return res.status(500).json(err);
    }
  }

  async clear(_, res, raw = false) {
    try {
      await DB_Provider.clear(this.model);
      if (raw && typeof raw === "string") return null;
      return res.json(null);
    } catch (e) {
      return res.status(500).json({
        message: `CANNOT CLEAR ${this.endpoint.toUpperCase()}`,
        error: e.message
      });
    }
  }
}
