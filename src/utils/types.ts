export interface QuizInfo {
	topic: string;
	level: string;
	language: string;
}

export interface GeneratedQuiz {
	topic: string;
	questions: Question[];
}

export interface Question {
	id: number;
	question: string;
	options: string[];
}

export interface QuizResults {
	total: number;
	correct: number;
	incorrect: number;
	percentage: number;
	results: VerifiedQuestion[];
}

export interface VerifiedQuestion {
	id: number;
	question: string;
	isCorrect: boolean;
	userAnswer: string;
}

export interface UserResultsData {
	questions: Question[];
	userAnswers: UserAnswers;
}

export type UserAnswers = Record<string, string>;
