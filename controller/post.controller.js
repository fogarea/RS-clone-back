import Post from "../model/schema/post.js";
import User from "../model/schema/user.js";
import DB_Provider from "../model/provider.js";
import { CRUDController } from "./CRUD.controller.js";

class PostController extends CRUDController {
  constructor() {
    super(Post, "posts");
  }

  async get(req, res) {
    let items = await super.get(req, res, "raw");
    items = DB_Provider.normalizeAll(items);
    return res.json(items);
  }

  async getById(req, res) {
    const post = await super.getById(req, res, "raw");
    return this.withAuthor(res, post);
  }

  async create(req, res) {
    if (req?.user?.id) req.body.author = req.user.id;
    const post = await super.create(req, res, "raw");
    return this.withAuthor(res, post);
  }

  async withAuthor(res, post) {
    const author = await DB_Provider.findById(User, post.author);
    post.author = DB_Provider.normalize(author);
    post = DB_Provider.normalize(post);
    return res.json(post);
  }
}

export default new PostController();
