import Post from "../model/schema/post.js";
import { CRUDController } from "./CRUD.controller.js";

class PostController extends CRUDController {
  constructor() {
    super(Post, "posts");
  }
}

export default new PostController();
