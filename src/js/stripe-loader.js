// Get category from meta tag
const category = document.querySelector('meta[name="stripe-category"]').content;

// Container for items
const container = document.getElementById("stripe-items");

// Load and display items
async function loadItems() {
	try {
		// Fetch items from Netlify function
		const response = await fetch(`/.netlify/functions/stripe-items?category=${category}`);
		if (!response.ok) throw new Error("Failed to fetch items");

		const items = await response.json();

		// Render items
		container.innerHTML = items
			.map(
				(price) => `
            <div class="item">
                <img src="${price.product.images[0]}" alt="${price.product.name}" loading="lazy" decoding="async">
                <h3>${price.product.name}</h3>
                <p>${price.product.description}</p>
                <p class="price">$${(price.unit_amount / 100).toFixed(2)}</p>
                <button onclick="handlePurchase('${price.id}')">
                    Purchase
                </button>
            </div>
        `
			)
			.join("");
	} catch (error) {
		console.error("Error loading items:", error);
		container.innerHTML = "<p>Error loading items. Please try again later.</p>";
	}
}

// Handle purchase
async function handlePurchase(priceId) {
	try {
		// Create checkout session through Netlify function
		const response = await fetch("/.netlify/functions/create-checkout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				priceId,
				mode: category === "service" ? "subscription" : "payment",
			}),
		});

		if (!response.ok) throw new Error("Failed to create checkout session");

		const { url } = await response.json();
		window.location = url;
	} catch (error) {
		console.error("Error:", error);
		alert("Error processing purchase. Please try again.");
	}
}

// Load items when page loads
loadItems();
