class MainRouter {
  create(app) {
    app.get("/", (_, res) => {
      res.status(200).json("main page here");
    });
  }
}

export default new MainRouter();
