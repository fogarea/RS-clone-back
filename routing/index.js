import authRouter from "./auth.router.js";
import programRouter from "./program.router.js";
import trainingRouter from "./training.router.js";
import profileRouter from "./profile.router.js";
import progressRouter from "./progress.router.js";
import meditationRouter from "./meditation.router.js";
import trackRouter from "./track.router.js";
import mealRouter from "./meal.router.js";

export default {
  auth: authRouter,
  program: programRouter,
  training: trainingRouter,
  profile: profileRouter,
  progress: progressRouter,
  meditation: meditationRouter,
  track: trackRouter,
  meal: mealRouter
};
