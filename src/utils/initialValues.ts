import { GeneratedQuiz, Question, QuizInfo, QuizResults } from "./types";

export const initialQuizInfoValue: QuizInfo = {
	topic: "",
	level: "",
	language: "",
};

export const initialQuestionValue: Question = {
	id: 1,
	question: "",
	options: [],
};

export const initialQuizValue: GeneratedQuiz = {
	topic: "",
	questions: [],
};

export const initialResultsValue: QuizResults = {
	total: 0,
	correct: 0,
	incorrect: 0,
	percentage: 0,
	results: [],
};
