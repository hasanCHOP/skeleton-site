const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobile-nav");

hamburger.addEventListener("click", () => {
	hamburger.classList.toggle("is-active");
	mobileNav.classList.toggle("active");
});

document.addEventListener("click", (e) => {
	if (!mobileNav.contains(e.target) && !hamburger.contains(e.target)) {
		mobileNav.classList.remove("active");
		hamburger.classList.remove("is-active");
	}
});

// Contact Form Handling
const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");

if (contactForm) {
	contactForm.addEventListener("submit", async (e) => {
		e.preventDefault();

		const submitButton = contactForm.querySelector("button[type='submit']");
		submitButton.disabled = true;
		submitButton.textContent = "Sending...";

		try {
			const formData = {
				name: contactForm.querySelector("#name").value,
				email: contactForm.querySelector("#email").value,
				message: contactForm.querySelector("#message").value,
			};

			const response = await fetch("/.netlify/functions/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				// Show success message
				formFeedback.textContent = "Thank you! Your message has been sent successfully.";
				formFeedback.className = "success";
				contactForm.reset();
			} else {
				throw new Error("Network response was not ok");
			}
		} catch (error) {
			// Show error message
			formFeedback.textContent = "Sorry, there was a problem sending your message. Please try again later.";
			formFeedback.className = "error";
		} finally {
			formFeedback.classList.remove("hidden");
			submitButton.disabled = false;
			submitButton.textContent = "Send Message";
		}
	});
}
