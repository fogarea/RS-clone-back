import Post from "../model/schema/post.js";
import User from "../model/schema/user.js";
import DB_Provider from "../model/provider.js";
import { CRUDController } from "./CRUD.controller.js";

class PostController extends CRUDController {
  constructor() {
    super(Post, "posts");
  }

  async getById(req, res) {
    const post = await super.getById(req, res, "raw");
    const author = await DB_Provider.findById(User, post.author, [
      "id",
      "gender",
      "login"
    ]);
    post.author = author;
    console.log(post);
    return res.json(post);
  }
}

export default new PostController();
