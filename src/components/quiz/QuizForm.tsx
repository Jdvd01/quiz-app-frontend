"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { BookOpen, Brain, Globe } from "lucide-react";
import { useQuiz } from "@/hooks/useQuiz";

export function QuizForm() {
	const { quizInfo, setQuizInfo, handleQuizGeneration } = useQuiz();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const { topic, level, language } = quizInfo;

		handleQuizGeneration(topic, level, language);
	};

	return (
		<div className="container mx-auto max-w-md">
			<div className="text-center mb-8">
				<div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
					<Brain className="w-8 h-8 text-primary" />
				</div>
				<h1 className="text-3xl font-bold text-primary mb-2">Quiz App</h1>
				<p className="text-secondary">Test your knowledge</p>
			</div>

			<Card className="border-primary/20 shadow-lg bg-surface">
				<CardHeader className="text-center">
					<CardTitle className="text-2xl font-bold text-primary">
						Set up the quiz
					</CardTitle>
					<CardDescription className="text-secondary">
						Fill the fields to generate your personalized quiz
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="space-y-2">
							<Label htmlFor="topic" className="flex items-center gap-2">
								<BookOpen className="w-4 h-4 text-primary" />
								Theme
							</Label>
							<Input
								id="topic"
								name="topic"
								type="text"
								placeholder="E.g.: History, Science, Sports..."
								value={quizInfo.topic}
								onChange={(e) =>
									setQuizInfo({ ...quizInfo, topic: e.target.value })
								}
								className="border-primary/20 focus:border-primary"
								required
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="level" className="flex items-center gap-2">
								<Brain className="w-4 h-4 text-primary" />
								Level
							</Label>
							<Select
								value={quizInfo.level}
								onValueChange={(value) =>
									setQuizInfo({ ...quizInfo, level: value })
								}
								required
							>
								<SelectTrigger className="border-primary/20 focus:border-primary w-full">
									<SelectValue placeholder="Select your level" />
								</SelectTrigger>
								<SelectContent className="bg-surface border-0">
									<SelectItem
										className="text-primary dark:focus:text-surface"
										value="beginner"
									>
										🟢 Beginner
									</SelectItem>
									<SelectItem
										className="text-primary dark:focus:text-surface"
										value="intermediate"
									>
										🟡 Intermediate
									</SelectItem>
									<SelectItem
										className="text-primary dark:focus:text-surface"
										value="advanced"
									>
										🟠 Advanced
									</SelectItem>
									<SelectItem
										className="text-primary dark:focus:text-surface"
										value="expert"
									>
										🔴 Expert
									</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label htmlFor="language" className="flex items-center gap-2">
								<Globe className="w-4 h-4 text-primary" />
								Language
							</Label>
							<Select
								value={quizInfo.language}
								onValueChange={(value) =>
									setQuizInfo({ ...quizInfo, language: value })
								}
								required
							>
								<SelectTrigger className="border-primary/20 focus:border-primary w-full">
									<SelectValue placeholder="Select the language" />
								</SelectTrigger>
								<SelectContent className="bg-surface border-0">
									<SelectItem
										className="text-primary dark:focus:text-surface"
										value="es"
									>
										<span className="text-[10px]">ES</span>
										<span>Español</span>
									</SelectItem>
									<SelectItem
										className="text-primary dark:focus:text-surface"
										value="en"
									>
										<span className="text-[10px]">EN</span>
										<span>English</span>
									</SelectItem>
									<SelectItem
										className="text-primary dark:focus:text-surface"
										value="fr"
									>
										<span className="text-[10px]">FR</span>
										<span>Français</span>
									</SelectItem>
									<SelectItem
										className="text-primary dark:focus:text-surface"
										value="pt"
									>
										<span className="text-[10px]">PT</span>
										<span>Português</span>
									</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<Button
							type="submit"
							className="w-full bg-primary focus:bg-primary/90 text-surface font-semibold py-3"
						>
							Generate quiz
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
