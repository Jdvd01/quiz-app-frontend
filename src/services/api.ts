const API_BASE_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:3000";

interface ApiResponse<T> {
	data: T;
	success: boolean;
	message?: string;
}

class ApiError extends Error {
	constructor(public status: number, message: string) {
		super(message);
		this.name = "ApiError";
	}
}

async function apiRequest<T>(
	endpoint: string,
	options: RequestInit = {}
): Promise<T> {
	const url = `${API_BASE_URL}${endpoint}`;

	const defaultOptions: RequestInit = {
		headers: {
			"Content-Type": "application/json",
			...options.headers,
		},
	};

	const response = await fetch(url, {
		...defaultOptions,
		...options,
	});

	if (!response.ok) {
		throw new ApiError(
			response.status,
			`HTTP error! status: ${response.status}`
		);
	}

	return response.json();
}

export { apiRequest, ApiError, type ApiResponse };
