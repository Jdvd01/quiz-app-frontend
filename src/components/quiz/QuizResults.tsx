"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	CheckCircle,
	XCircle,
	RotateCcw,
	Trophy,
	Target,
	BookOpen,
} from "lucide-react";
import { useQuiz } from "@/hooks/useQuiz";

export function QuizResults() {
	const { totalQuestions, results, quizInfo, handleResetQuiz } = useQuiz();

	const getScoreColor = (percentage: number) => {
		if (percentage >= 80) return "text-green-600 dark:text-green-400";
		if (percentage >= 60) return "text-yellow-600 dark:text-yellow-400";
		return "text-red-600 dark:text-red-400";
	};

	const getScoreBadge = (percentage: number) => {
		if (percentage >= 80)
			return {
				text: "🏆 Excellent",
				variant: "default" as const,
				icon: Trophy,
			};
		if (percentage >= 60)
			return { text: "👍 Good", variant: "secondary" as const, icon: Target };
		return {
			text: "📚 Needs improvement",
			variant: "destructive" as const,
			icon: BookOpen,
		};
	};

	const scoreBadge = getScoreBadge(results.percentage);

	return (
		<div className="container mx-auto px-4 pb-8 pt-20 max-w-4xl">
			<Card className="mb-8 border-primary/20 shadow-xl">
				<CardHeader className="text-center pb-4">
					<div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-4">
						<scoreBadge.icon className="w-10 h-10 text-primary" />
					</div>
					<CardTitle className="text-3xl font-bold mb-4 text-primary">
						Quiz Results
					</CardTitle>
					<div className="flex items-center justify-center gap-4 flex-wrap">
						<Badge
							variant="secondary"
							className="bg-primary/10 text-primary border-primary/20"
						>
							📖 {quizInfo.topic}
						</Badge>
						<Badge variant="outline" className="border-primary/30">
							🎯 {quizInfo.level}
						</Badge>
						<Badge variant="outline" className="border-primary/30">
							🌍 {quizInfo.language}
						</Badge>
					</div>
				</CardHeader>
				<CardContent className="text-center">
					<div className="mb-8">
						<div
							className={`text-7xl font-bold mb-4 ${getScoreColor(
								results.percentage
							)}`}
						>
							{results.percentage}%
						</div>
						<div className="text-2xl font-semibold mb-6 text-primary">
							<span className="text-primary">{results.correct}</span>
							<span className="text-primary">/{totalQuestions}</span>
							<span className="text-primary ml-2">correct answers</span>
						</div>
						<Badge
							variant={scoreBadge.variant}
							className="text-lg px-6 py-3 font-semibold"
						>
							{scoreBadge.text}
						</Badge>
					</div>

					<Button
						onClick={handleResetQuiz}
						className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 h-12 shadow-lg hover:shadow-xl transition-all duration-200"
					>
						<RotateCcw className="w-5 h-5 mr-2" />
						Take another quiz
					</Button>
				</CardContent>
			</Card>

			<div className="space-y-6">
				<div className="flex items-center gap-3 mb-6">
					<div className="p-2 bg-primary/10 rounded-lg">
						<BookOpen className="w-5 h-5 text-primary" />
					</div>
					<h2 className="text-2xl font-bold text-primary">Answer Review</h2>
				</div>

				{results.results.map((item, index) => {
					const isCorrect = item?.isCorrect || false;

					return (
						<Card
							key={item.id}
							className="overflow-hidden border-primary/20 shadow-md hover:shadow-lg transition-shadow duration-200"
						>
							<CardHeader className="pb-4">
								<div className="flex items-start justify-between">
									<div className="flex items-start gap-4 flex-1">
										<div
											className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
												isCorrect
													? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
													: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
											}`}
										>
											{index + 1}
										</div>
										<CardTitle className="text-lg leading-relaxed flex-1 text-primary">
											{item.question}
										</CardTitle>
									</div>
									{isCorrect ? (
										<CheckCircle className="w-7 h-7 text-green-600 dark:text-green-400 flex-shrink-0" />
									) : (
										<XCircle className="w-7 h-7 text-red-600 dark:text-red-400 flex-shrink-0" />
									)}
								</div>
							</CardHeader>
							<CardContent className="pt-0">
								<div className="grid gap-3">
									<div
										className={`p-4 rounded-xl border-2 transition-all duration-200 ${
											item.isCorrect
												? "border-border bg-muted/30"
												: "border-red-500 bg-red-50 dark:bg-red-900/20 dark:border-red-400"
										}`}
									>
										<div className="flex items-center justify-between">
											<span className="font-medium">{item.userAnswer}</span>
											<div className="flex items-center gap-2">
												{item.isCorrect && (
													<Badge
														variant="secondary"
														className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
													>
														✅ Correct
													</Badge>
												)}
												{!item.isCorrect && (
													<Badge
														variant="destructive"
														className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
													>
														❌ Your answer
													</Badge>
												)}
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>
		</div>
	);
}
