import authRouter from "./auth.router.js";
import programRouter from "./program.router.js";
import trainingRouter from "./training.router.js";
import profileRouter from "./profile.router.js";

export default {
  auth: authRouter,
  program: programRouter,
  training: trainingRouter,
  profile: profileRouter
};
