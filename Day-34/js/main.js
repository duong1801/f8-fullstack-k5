/** @format */

let timer = document.querySelector(".timer");
let counter = document.querySelector(".counter");
let btn = document.querySelector(".btn");
let urlTarget = "https://fullstack.edu.vn";
function redirectToLink() {
	window.location.href = urlTarget;
}

function updateCountdown() {
	const waitingTime = 30000;

	const currentTime = Date.now();

	const remainingTime = waitingTime - (currentTime - startTime);

	if (remainingTime <= 0) {
		btn.removeAttribute("disabled");
		counter.innerText = 0;
		return;
	} else {
		requestId = requestAnimationFrame(updateCountdown);
		counter.innerText = Math.ceil(remainingTime / 1000);
	}
}
document.addEventListener("visibilitychange", function () {
	if (document.visibilityState === "hidden") {
		lastTimeHidden = Date.now();
		cancelAnimationFrame(requestId);
	} else {
		startTime += Date.now() - lastTimeHidden;
		requestId = requestAnimationFrame(updateCountdown);
	}
});

btn.addEventListener("click", redirectToLink);

let startTime = Date.now();
let requestId = requestAnimationFrame(updateCountdown);

let lastTimeHidden = 0;
