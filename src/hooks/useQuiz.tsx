"use client";

import { GeneratedQuiz, Question, QuizInfo } from "@/utils/types";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const initialQuizInfoValue = {
	topic: "",
	level: "",
	language: "",
};

const initialQuestionValue = {
	id: 1,
	question: "",
	options: [],
};

const initialQuizValue = {
	topic: "",
	questions: [],
};

export const useQuiz = () => {
	const navigate = useNavigate();
	const location = useLocation();

	// Defining values to prevent data inconsistency
	const [quizInfo, setQuizInfo] = useState<QuizInfo>(
		location.state?.quizInfo || initialQuizInfoValue
	);
	const [quiz, setQuiz] = useState<GeneratedQuiz>(
		location.state?.quiz || initialQuizValue
	);
	const [currentQuestion, setCurrentQuestion] = useState<Question>(
		location.state?.currentQuestion || initialQuestionValue
	);

	// If we dont have info, redirects to "/"
	useEffect(() => {
		if (location.pathname === "/quiz" && !location.state?.quiz) {
			navigate("/");
		}
	}, [location.state, location.pathname, navigate]);

	function handleResetQuiz() {
		setQuizInfo(initialQuizInfoValue);
		setQuiz(initialQuizValue);
		setCurrentQuestion(initialQuestionValue);
	}

	async function handleQuizGeneration(
		topic: string,
		level: string,
		language: string
	) {
		const newQuizInfo = { topic, level, language };
		setQuizInfo(newQuizInfo);

		// Aquí puedes hacer la llamada a la API directamente
		// Por ejemplo:
		// const response = await fetch('/api/generate-quiz', {
		//   method: 'POST',
		//   headers: { 'Content-Type': 'application/json' },
		//   body: JSON.stringify(newQuizInfo)
		// });
		// const generatedQuiz = await response.json();
		// setQuiz(generatedQuiz);

		const generatedQuiz = {
			topic: "JavaScript",
			questions: [
				{
					id: 1,
					question:
						"Quelle est la principale difference de portee entre var, let et const ?",
					options: [
						"var a une portee fonction, let/const une portee bloc",
						"var et let ont une portee bloc, const a une portee globale",
						"Tous ont une portee globale",
						"const a une portee module, var une portee bloc, let une portee fonction",
					],
				},
				{
					id: 2,
					question: "Que fait 'use strict' dans un fichier JavaScript ?",
					options: [
						"Active un mode plus strict qui interdit certaines pratiques et change certains comportements",
						"Optimise automatiquement le code pour la performance",
						"Charge le module strict depuis npm",
						"Convertit tout le code en TypeScript",
					],
				},
			],
		};

		setQuiz(generatedQuiz);

		console.log("Generating quiz with:", newQuizInfo);

		// Pasar los datos a través del estado de React Router
		await navigate("/quiz", {
			state: {
				quizInfo: newQuizInfo,
				quiz: generatedQuiz,
				currentQuestion: generatedQuiz.questions[0],
			},
		});
	}

	function handleNextQuestion() {
		if (currentQuestion.id === quiz.questions.length) return submitQuiz();
		const nextQuestion = quiz.questions.find(
			(item) => item.id == currentQuestion.id + 1
		);
		console.log("heey", nextQuestion);
		setCurrentQuestion(nextQuestion ?? initialQuestionValue);
	}

	function submitQuiz() {
		// API Call
		console.log("submiting");
		handleResetQuiz();
		navigate("/results");
	}

	return {
		quizInfo,
		setQuizInfo,
		handleResetQuiz,
		currentQuestion,
		setCurrentQuestion,
		quiz,
		setQuiz,
		handleNextQuestion,
		handleQuizGeneration,
		submitQuiz,
	};
};
