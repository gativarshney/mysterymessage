import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST() {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return Response.json(
                {
                    success: false,
                    message: "GEMINI_API_KEY is not defined in the environment variables."
                },
                { status: 500 }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `Create a list of three open—ended and engaging questions as a single string. Each question should be separated by " II ". These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: "What's a hobby you've recently started? II If you could have dinner with any historical figure, who would it be? II What's a simple thing that makes you happy?". Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        const questions = text.split(' II ');

        const trimmedQuestions = questions.map(q => q.trim());
        return Response.json(
            {
                success: true,
                questions: trimmedQuestions
            },
            { status: 200 }
        );
    } catch (error: unknown) {
        console.error("Error generating suggested messages:", error);
        return Response.json(
            {
                success: false,
                message: "Failed to generate suggested messages.",
                error: error instanceof Error ? error.message : "An unknown error occurred"
            },
            { status: 500 }
        );
    }
}
