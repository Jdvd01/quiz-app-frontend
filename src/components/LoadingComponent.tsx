"use client";

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { quizService } from "@/services";
import { Card, CardContent } from "@/components/ui/card";

export const LoadingComponent = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { action, quizInfo } = location.state || {};
	const isGenerating = action === "generate";

	const [loadingState, setLoadingState] = useState<
		"pending" | "processing" | "completed"
	>("pending");
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const processAction = async () => {
			try {
				const { quizInfo, quiz, userAnswers, action } = location.state || {};

				if (!quizInfo) {
					navigate("/");
					return;
				}

				// Cambiar a estado de procesamiento
				setLoadingState("processing");

				if (action === "generate") {
					// Generar nuevo quiz
					const generatedQuiz = await quizService.generateQuiz({
						topic: quizInfo.topic,
						level: quizInfo.level,
						language: quizInfo.language,
					});

					// Marcar como completado
					setLoadingState("completed");

					// Navegar a la página del quiz con los datos generados
					navigate("/quiz", {
						state: {
							quizInfo,
							quiz: generatedQuiz,
							currentQuestion: generatedQuiz.questions[0],
						},
					});
				} else {
					// Verificar respuestas del quiz
					if (!quiz || !userAnswers) {
						navigate("/");
						return;
					}

					const results = await quizService.verifyQuiz({
						questions: quiz.questions,
						userAnswers: userAnswers,
					});

					// Marcar como completado
					setLoadingState("completed");

					// Navegar a la página de resultados con los datos
					navigate("/results", {
						state: {
							quizInfo,
							quiz,
							results,
						},
					});
				}
			} catch (error) {
				console.error("Error processing action:", error);
				setError(error instanceof Error ? error.message : "Unknown error");
				// En caso de error, redirigir al inicio después de un breve delay
				setTimeout(() => navigate("/"), 3000);
			}
		};

		processAction();
	}, [navigate, location.state]);

	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				<Card className="border-primary/20 shadow-xl bg-surface">
					<CardContent className="p-8 text-center">
						<div className="mb-8">
							<div className="w-16 h-16 border-4 border-secondary border-t-primary rounded-full animate-spin mx-auto mb-6"></div>
							<h2 className="text-2xl font-bold text-foreground mb-2">
								{isGenerating
									? "Generating your quiz..."
									: "Processing your answers..."}
							</h2>
							<p className="text-muted-foreground mb-6">
								{isGenerating ? (
									<>
										We're preparing personalized questions about{" "}
										<strong className="text-primary">{quizInfo?.topic}</strong>
									</>
								) : (
									"We're analyzing your answers to give you the best results"
								)}
							</p>
						</div>

						<div className="space-y-4">
							{isGenerating ? (
								<>
									<div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10">
										<div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
											<span className="text-primary-foreground text-xs font-bold">
												✓
											</span>
										</div>
										<span className="text-foreground font-medium">
											Configuration received
										</span>
									</div>

									<div
										className={`flex items-center gap-3 p-3 rounded-lg ${
											loadingState === "processing"
												? "bg-primary/10"
												: "opacity-50"
										}`}
									>
										<div
											className={`w-6 h-6 border-2 border-secondary rounded-full ${
												loadingState === "processing"
													? "border-t-primary animate-spin"
													: ""
											}`}
										></div>
										<span
											className={`font-medium ${
												loadingState === "processing"
													? "text-foreground"
													: "text-muted-foreground"
											}`}
										>
											Generating questions...
										</span>
									</div>

									<div
										className={`flex items-center gap-3 p-3 rounded-lg ${
											loadingState === "completed"
												? "bg-primary/10"
												: "opacity-50"
										}`}
									>
										<div
											className={`w-6 h-6 rounded-full border-2 ${
												loadingState === "completed"
													? "bg-primary border-primary"
													: "border-secondary"
											} flex items-center justify-center`}
										>
											{loadingState === "completed" && (
												<span className="text-primary-foreground text-xs font-bold">
													✓
												</span>
											)}
										</div>
										<span
											className={`font-medium ${
												loadingState === "completed"
													? "text-foreground"
													: "text-muted-foreground"
											}`}
										>
											Preparing quiz
										</span>
									</div>
								</>
							) : (
								<>
									<div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10">
										<div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
											<span className="text-primary-foreground text-xs font-bold">
												✓
											</span>
										</div>
										<span className="text-foreground font-medium">
											Answers submitted
										</span>
									</div>

									<div
										className={`flex items-center gap-3 p-3 rounded-lg ${
											loadingState === "processing"
												? "bg-primary/10"
												: "opacity-50"
										}`}
									>
										<div
											className={`w-6 h-6 border-2 border-secondary rounded-full ${
												loadingState === "processing"
													? "border-t-primary animate-spin"
													: ""
											}`}
										></div>
										<span
											className={`font-medium ${
												loadingState === "processing"
													? "text-foreground"
													: "text-muted-foreground"
											}`}
										>
											Analyzing results...
										</span>
									</div>

									<div
										className={`flex items-center gap-3 p-3 rounded-lg ${
											loadingState === "completed"
												? "bg-primary/10"
												: "opacity-50"
										}`}
									>
										<div
											className={`w-6 h-6 rounded-full border-2 ${
												loadingState === "completed"
													? "bg-primary border-primary"
													: "border-secondary"
											} flex items-center justify-center`}
										>
											{loadingState === "completed" && (
												<span className="text-primary-foreground text-xs font-bold">
													✓
												</span>
											)}
										</div>
										<span
											className={`font-medium ${
												loadingState === "completed"
													? "text-foreground"
													: "text-muted-foreground"
											}`}
										>
											Preparing results
										</span>
									</div>
								</>
							)}
						</div>

						{error ? (
							<div className="mt-8 p-4 bg-destructive/10 rounded-lg border-l-4 border-destructive">
								<p className="text-destructive text-sm">
									<strong>Error:</strong> {error}
								</p>
								<p className="text-muted-foreground text-xs mt-1">
									Redirecting to home...
								</p>
							</div>
						) : (
							quizInfo && (
								<div className="mt-8 p-4 bg-muted/50 rounded-lg border-l-4 border-primary">
									<p className="text-muted-foreground text-sm">
										<strong className="text-foreground">Level:</strong>{" "}
										{quizInfo.level} •{" "}
										<strong className="text-foreground">Language:</strong>{" "}
										{quizInfo.language}
									</p>
								</div>
							)
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
};
