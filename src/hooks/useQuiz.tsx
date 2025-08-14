"use client";

import { QuizInfo } from "@/utils/types";
import { useState } from "react";

const initialQuizValue = {
	topic: "",
	level: "",
	language: "",
};

export const useQuiz = () => {
	const [quizInfo, setQuizInfo] = useState<QuizInfo>(initialQuizValue);

	function handleResetQuiz() {
		setQuizInfo(initialQuizValue);
	}

	console.log(quizInfo);

	return { quizInfo, setQuizInfo, handleResetQuiz };
};
