import dataBase from "../model/index.js";

export class CRUDController {
  constructor(model, endpoint) {
    this.model = model;
    this.endpoint = endpoint;
  }

  async get(_, res) {
    try {
      const items = await dataBase.find(this.model);
      res.json(items);
    } catch (e) {
      res.status(500).json({
        message: `CANNOT READ ${this.endpoint.toUpperCase()}`,
        error: e.message
      });
    }
  }

  async getById(req, res) {
    const itemID = req.params?.id;

    try {
      const item = await dataBase.findById(this.model, itemID);
      res.json(item);
    } catch (e) {
      res.status(500).json({
        message: `CANNOT GET ${this.endpoint.toUpperCase()} BY ID: ${itemID}`,
        error: e.message
      });
    }
  }

  async create(req, res) {
    try {
      const createdItem = await dataBase.create(this.model, req.body);
      res.json(createdItem);
    } catch (e) {
      res.status(500).json({
        message: `CANNOT CREATE ${this.endpoint.toUpperCase()}`,
        error: e.message
      });
    }
  }

  async update(req, res) {
    const item = req.body;

    try {
      const updatedItem = await dataBase.update(this.model, item);
      res.json(updatedItem);
    } catch (e) {
      res.status(500).json({
        message: `CANNOT UPDATE ${this.endpoint.toUpperCase()} WITH ID: ${
          item._id
        }`,
        error: e.message
      });
    }
  }

  async delete(req, res) {
    const itemID = req.params?.id;

    try {
      const deletedItem = await dataBase.delete(this.model, itemID);
      res.json(deletedItem);
    } catch (e) {
      res.status(500).json({
        message: `CANNOT DELETE ${this.endpoint.toUpperCase()} WITH ID: ${itemID}`,
        error: e.message
      });
    }
  }
}
