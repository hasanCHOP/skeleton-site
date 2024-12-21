exports.handler = async (event, context) => {
	// Only allow POST requests
	if (event.httpMethod !== "POST") {
		return {
			statusCode: 405,
			body: JSON.stringify({ message: "Method not allowed" }),
		};
	}

	try {
		// Parse the incoming request body
		const data = JSON.parse(event.body);
		const { name, email, message } = data;

		// Validate required fields
		if (!name || !email || !message) {
			return {
				statusCode: 400,
				body: JSON.stringify({ message: "Missing required fields" }),
			};
		}

		// Here you would typically save to a database
		// For now, we'll just return success
		// TODO: Add database integration (e.g., MongoDB, Fauna, etc.)

		return {
			statusCode: 200,
			body: JSON.stringify({
				message: "Message received successfully",
				data: { name, email, timestamp: new Date().toISOString() },
			}),
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ message: "Error processing request" }),
		};
	}
};
