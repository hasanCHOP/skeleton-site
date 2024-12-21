require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
	// Only allow GET requests
	if (event.httpMethod !== "GET") {
		return {
			statusCode: 405,
			body: "Method Not Allowed",
		};
	}

	try {
		const { category } = event.queryStringParameters || {};

		// Get prices with expanded product data
		const prices = await stripe.prices.list({
			expand: ["data.product"],
			active: true,
		});

		// Filter by category from metadata
		const items = prices.data.filter((price) => price.product.metadata.category === category);

		return {
			statusCode: 200,
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(items),
		};
	} catch (error) {
		console.error("Error:", error);
		return {
			statusCode: 500,
			body: JSON.stringify({ error: "Failed to fetch items" }),
		};
	}
};
