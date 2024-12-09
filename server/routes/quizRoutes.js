import express from "express";
import { getQuiz } from "../controllers/quizController.js";
import { getEcs265Documents } from "../controllers/quizController.js";

const router = express.Router();

// Route to get quiz questions based on classId and quizId
router.get("/quiz/:classId/:quizId", getQuiz);
router.get("/quiz/ecs265", getEcs265Documents); // New route for ecs265

export default router;
