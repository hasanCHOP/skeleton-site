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
	contactForm.addEventListener("submit", (e) => {
		const submitButton = contactForm.querySelector("button[type='submit']");
		submitButton.disabled = true;
		submitButton.textContent = "Sending...";
		// Let Netlify handle the form submission
		// The page will refresh after submission
	});
}
