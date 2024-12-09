import mongoose from "mongoose";
import { Schema } from "mongoose";

// Define the Answer schema
const answerSchema = new Schema({
  answerText: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
});

// Define the Question schema
const questionSchema = new Schema({
  questionText: { type: String, required: true },
  answerOptions: [answerSchema], // Array of possible answers
});

// Define the Quiz schema
const quizSchema = new Schema({
  quizId: { type: String, required: true, unique: true },
  classId: { type: String, required: true },
  questions: [questionSchema], // Array of questions
});

// Explicitly define the collection
const Quiz = mongoose.model("Quiz", quizSchema, "ecs-265-QA"); // Use the correct collection name

export default Quiz;
