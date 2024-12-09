import Quiz from "../models/quizModel.js";

export const getQuiz = async (req, res) => {
  const { classId, quizId } = req.params;

  try {
    const quiz = await Quiz.findOne({ classId, quizId });
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json(quiz);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error fetching quiz" });
  }
};

export const getEcs265Documents = async (req, res) => {
  const classId = "ecs265";

  try {
    // Fetch the documents from the ecs-265-QA collection
    const quizzes = await Quiz.find({ classId: "ecs265" });
    if (!quizzes.length) {
      return res
        .status(404)
        .json({ message: "No quizzes found for this class." });
    }
    res.json(quizzes); // Send the list of quizzes
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error fetching quizzes for ecs265" });
  }
};
