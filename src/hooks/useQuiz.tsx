"use client";

import {
	initialQuestionValue,
	initialQuizInfoValue,
	initialQuizValue,
	initialResultsValue,
} from "@/utils/initialValues";
import {
	GeneratedQuiz,
	Question,
	QuizInfo,
	QuizResults,
	UserAnswers,
} from "@/utils/types";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const useQuiz = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const [quizInfo, setQuizInfo] = useState<QuizInfo>(
		location.state?.quizInfo || initialQuizInfoValue
	);
	const [quiz, setQuiz] = useState<GeneratedQuiz>(
		location.state?.quiz || initialQuizValue
	);
	const [currentQuestion, setCurrentQuestion] = useState<Question>(
		location.state?.currentQuestion || initialQuestionValue
	);

	const [results, setResults] = useState<QuizResults>(
		location.state?.results || initialResultsValue
	);
	const [userAnswers, setUserAnswers] = useState<UserAnswers>({});

	// If we dont have info, redirects to "/"
	useEffect(() => {
		if (
			(location.pathname === "/quiz" || location.pathname === "/results") &&
			!location.state?.quiz
		) {
			navigate("/");
		}
	}, [location.state, location.pathname, navigate]);

	function handleResetQuiz() {
		setQuizInfo(initialQuizInfoValue);
		setQuiz(initialQuizValue);
		setCurrentQuestion(initialQuestionValue);

		navigate("/");
	}

	async function handleQuizGeneration(
		topic: string,
		level: string,
		language: string
	) {
		try {
			const newQuizInfo = { topic, level, language };
			setQuizInfo(newQuizInfo);

			await navigate("/loading", {
				state: {
					quizInfo: newQuizInfo,
					action: "generate",
				},
			});
		} catch (error) {
			console.error("Error generating quiz:", error);
			throw error;
		}
	}

	function handleNextQuestion() {
		const nextQuestion = quiz.questions.find(
			(item) => item.id == currentQuestion.id + 1
		);
		if (!nextQuestion) return;
		setCurrentQuestion(nextQuestion);
	}

	async function handleAnswerQuestion(index: number, answer: string) {
		const newData = { ...userAnswers, [index]: answer };
		await setUserAnswers(newData);
	}

	async function submitQuiz(answersOverride?: UserAnswers) {
		try {
			const finalAnswers = answersOverride || userAnswers;

			await navigate("/loading", {
				state: {
					quizInfo,
					quiz,
					userAnswers: finalAnswers,
				},
			});
		} catch (error) {
			console.error("Error submitting quiz:", error);
			throw error;
		}
	}

	const totalQuestions = quiz.questions.length;

	return {
		quizInfo,
		setQuizInfo,
		handleResetQuiz,
		currentQuestion,
		setCurrentQuestion,
		quiz,
		setQuiz,
		handleNextQuestion,
		handleAnswerQuestion,
		handleQuizGeneration,
		totalQuestions,
		results,
		userAnswers,
		submitQuiz,
	};
};
