import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QuizForm } from "@/components/quiz/QuizForm";
import { QuizQuestion } from "@/components/quiz/QuizQuestion";
import { QuizResults } from "./quiz/QuizResults";

export function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<QuizForm />} />
				<Route path="/quiz" element={<QuizQuestion />} />
				<Route path="/results" element={<QuizResults />} />
			</Routes>
		</BrowserRouter>
	);
}
