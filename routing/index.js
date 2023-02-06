import authRouter from "./auth.router.js";
import postsRouter from "./posts.router.js";
import programRouter from "./program.router.js";
import trainingRouter from "./training.router.js";

export default {
  auth: authRouter,
  posts: postsRouter,
  program: programRouter,
  training: trainingRouter
};
