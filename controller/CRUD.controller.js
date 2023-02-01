import DB_Provider from "../model/provider.js";

export class CRUDController {
  constructor(model, endpoint) {
    this.model = model;
    this.endpoint = endpoint;
  }

  async get(_, res) {
    try {
      const items = await DB_Provider.findAll(this.model);
      return res.json(items);
    } catch (e) {
      return res.status(500).json({
        message: `CANNOT READ ${this.endpoint.toUpperCase()}`,
        error: e.message
      });
    }
  }

  async getById(req, res, raw = false) {
    const itemID = req.params?.id;

    try {
      const item = await DB_Provider.findById(this.model, itemID);
      if (raw) return item;
      return res.json(item);
    } catch (e) {
      return res.status(500).json({
        message: `CANNOT GET ${this.endpoint.toUpperCase()} BY ID: ${itemID}`,
        error: e.message
      });
    }
  }

  async create(req, res) {
    try {
      req.body.author = req.user.id;
      const createdItem = await DB_Provider.create(this.model, req.body);
      return res.json(createdItem);
    } catch (e) {
      return res.status(500).json({
        message: `CANNOT CREATE ${this.endpoint.toUpperCase()}`,
        error: e.message
      });
    }
  }

  async update(req, res) {
    const item = req.body;

    try {
      const updatedItem = await DB_Provider.update(this.model, item);
      return res.json(updatedItem);
    } catch (e) {
      return res.status(500).json({
        message: `CANNOT UPDATE ${this.endpoint.toUpperCase()} WITH ID: ${item._id}`,
        error: e.message
      });
    }
  }

  async delete(req, res) {
    const itemID = req.params?.id;

    try {
      const deletedItem = await DB_Provider.delete(this.model, itemID);
      return res.json(deletedItem);
    } catch (e) {
      return res.status(500).json({
        message: `CANNOT DELETE ${this.endpoint.toUpperCase()} WITH ID: ${itemID}`,
        error: e.message
      });
    }
  }
}
