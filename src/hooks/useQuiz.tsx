"use client";

import {
	initialQuestionValue,
	initialQuizInfoValue,
	initialQuizValue,
	initialResultsValue,
} from "@/utils/initialValues";
import { GeneratedQuiz, Question, QuizInfo, QuizResults } from "@/utils/types";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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

	const [results, setResults] = useState<QuizResults>(
		location.state?.results || initialResultsValue
	);

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
		setCurrentQuestion(nextQuestion ?? initialQuestionValue);
	}

	async function submitQuiz() {
		// API Call

		const resultsData = {
			total: 2,
			correct: 1,
			incorrect: 1,
			percentage: 50,
			results: [
				{
					id: 1,
					question:
						"¿Qué palabra clave se usa para declarar una variable que no debe cambiar su valor?",
					isCorrect: true,
					userAnswer: "const",
				},
				{
					id: 2,
					question: "¿Cuál es el tipo de dato que representa un texto?",
					isCorrect: false,
					userAnswer: "string",
				},
				{
					id: 3,
					question: "¿Qué hace console.log('Hola')?",
					isCorrect: true,
					userAnswer: "Muestra 'Hola' en la consola",
				},
			],
		};

		setResults(resultsData);

		await navigate("/results", {
			state: {
				quizInfo,
				quiz,
				currentQuestion,
				results: resultsData,
			},
		});
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
		handleQuizGeneration,
		totalQuestions,
		results,
	};
};
