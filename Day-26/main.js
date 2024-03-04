/** @format */
const bgSecondary = "bg-secondary-subtle";

var btnOpen = document.querySelector(".open-modal");
var btnClose = document.querySelector(".close-modal");
var overlay = document.querySelector(".overlay");
var titleLogin = document.querySelector(".title-login");
var titleRegister = document.querySelector(".title-register");
var formLogin = document.querySelector(".form-login");
var formRegister = document.querySelector(".form-register");
var isLogin = true;

//handle open and close modal
function openModal() {
	overlay.classList.add("open");
}

function closeModal() {
	overlay.classList.remove("open");
}

btnOpen.addEventListener("click", openModal);
btnClose.addEventListener("click", closeModal);

document.onkeyup = function (e) {
	if (e.key === "Escape") {
		closeModal();
	}
};

//handle swich tap

titleLogin.addEventListener("click", function () {
	isLogin = true;
	swichTap(isLogin);
});

titleRegister.addEventListener("click", function () {
	isLogin = false;
	swichTap(isLogin);
});

function swichTap(isLogin = false) {
	if (isLogin) {
		//swich color title
		titleRegister.classList.remove(bgSecondary);
		titleLogin.classList.add(bgSecondary);

		//swich form
		formRegister.classList.remove("d-block");
		formLogin.classList.remove("d-none");
	} else {
		//swich color title
		titleLogin.classList.remove(bgSecondary);
		titleRegister.classList.add(bgSecondary);

		//swich form
		formLogin.classList.add("d-none");
		formRegister.classList.add("d-block");
	}
}

//handle submit form
