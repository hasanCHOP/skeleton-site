require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
	// Only allow POST requests
	if (event.httpMethod !== "POST") {
		return {
			statusCode: 405,
			body: "Method Not Allowed",
		};
	}

	try {
		const { priceId, mode } = JSON.parse(event.body);

		// Create checkout session
		const session = await stripe.checkout.sessions.create({
			line_items: [
				{
					price: priceId,
					quantity: 1,
				},
			],
			mode: mode,
			success_url: `${process.env.URL}/success.html`,
			cancel_url: `${process.env.URL}${event.headers.referer || "/"}`,
		});

		return {
			statusCode: 200,
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ url: session.url }),
		};
	} catch (error) {
		console.error("Error:", error);
		return {
			statusCode: 500,
			body: JSON.stringify({ error: "Failed to create checkout session" }),
		};
	}
};
