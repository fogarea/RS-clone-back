import postController from "../controller/post.controller.js";

class PostsRouter {
  create(app) {
    app.get("/posts", (_, res) => {
      res.status(200).json("hello");
    });

    app.post("/posts", async (req, res) => {
      try {
        const post = await postController.create(req.body);
        res.status(200).json(post);
      } catch (e) {
        res.status(500).json({
          message: "WRONG REQUEST DATA",
          endpoint: "/post",
          request: req.body,
          error: e.message
        });
      }
    });
  }
}

export default new PostsRouter();
