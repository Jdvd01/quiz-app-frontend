import { apiRequest } from "./api";
import {
	GeneratedQuiz,
	QuizInfo,
	QuizResults,
	UserResultsData,
} from "@/utils/types";

type GenerateQuizResponse = GeneratedQuiz;

type VerifyQuizResponse = QuizResults;

export const quizService = {
	async generateQuiz(data: QuizInfo): Promise<GenerateQuizResponse> {
		return apiRequest<GenerateQuizResponse>("/", {
			method: "POST",
			body: JSON.stringify(data),
		});
	},

	async verifyQuiz(data: UserResultsData): Promise<VerifyQuizResponse> {
		return apiRequest<VerifyQuizResponse>("/verify", {
			method: "POST",
			body: JSON.stringify(data),
		});
	},
};
