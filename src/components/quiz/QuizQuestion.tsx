"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen } from "lucide-react";
import { useQuiz } from "@/hooks/useQuiz";

export function QuizQuestion() {
	const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

	const { quiz, quizInfo, currentQuestion, handleNextQuestion } = useQuiz();
	console.log({
		quiz,
		quizInfo,
	});

	const totalQuestions = quiz.questions.length;

	const progressPercentage = (currentQuestion.id / totalQuestions) * 100;

	return (
		<div className="container mx-auto px-4 py-8 max-w-2xl">
			<div className="mb-8">
				<div className="flex items-center justify-between mb-6">
					<div className="flex items-center gap-3">
						<div className="p-2 bg-primary/10 rounded-lg">
							<BookOpen className="w-5 h-5 text-primary" />
						</div>
						<div>
							<Badge
								variant="secondary"
								className="bg-primary/10 text-primary border-primary/20 mb-1"
							>
								{quizInfo.topic}
							</Badge>
							<p className="text-sm text-muted-foreground capitalize">
								{quizInfo.level} • {quizInfo.language}
							</p>
						</div>
					</div>
					<div className="text-right">
						<Badge variant="outline" className="border-primary/30 text-primary">
							{currentQuestion.id} de {totalQuestions}
						</Badge>
						<p className="text-sm text-muted-foreground mt-1">
							{Math.round(progressPercentage)}% completado
						</p>
					</div>
				</div>

				<div className="space-y-2">
					<Progress value={progressPercentage} className="h-3" />
				</div>
			</div>

			<Card className="border-primary/20 shadow-lg">
				<CardHeader>
					<CardTitle className="text-xl leading-relaxed text-foreground">
						{currentQuestion.question}
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid gap-3">
						{currentQuestion.options.map((option, index) => (
							<button
								key={index}
								onClick={() => setSelectedAnswer(index)}
								className={`group p-4 text-left rounded-xl border-2 transition-all duration-300 hover:shadow-md ${
									selectedAnswer === index
										? "border-primary bg-primary/10 shadow-md transform scale-[1.02]"
										: "border-border hover:border-primary/50 hover:bg-accent/50"
								}`}
							>
								<div className="flex items-center space-x-4">
									<div
										className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
											selectedAnswer === index
												? "border-primary bg-primary shadow-sm"
												: "border-secondary group-hover:border-primary/70"
										}`}
									>
										{selectedAnswer === index && (
											<div className="w-2.5 h-2.5 rounded-full bg-primary" />
										)}
									</div>
									<span className="font-medium text-primary group-hover:text-primary transition-colors">
										{option}
									</span>
								</div>
							</button>
						))}
					</div>

					<Button
						onClick={handleNextQuestion}
						disabled={selectedAnswer === null}
						className="w-full mt-8 bg-primary hover:bg-primary/90 text-surface font-semibold py-3 h-12 text-base shadow-lg hover:shadow-xl transition-all duration-200"
					>
						{currentQuestion.id === totalQuestions
							? "🎯 Finalizar Quiz"
							: "➡️ Siguiente Pregunta"}
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
