import authRouter from "./auth.router.js";
import postsRouter from "./posts.router.js";
import traningRouter from "./traning.router.js";
import exerciseRouter from "./exercise.router.js";

export default {
  auth: authRouter,
  posts: postsRouter,
  traning: traningRouter,
  exercise: exerciseRouter
};
