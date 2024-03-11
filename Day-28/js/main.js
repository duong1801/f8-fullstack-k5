/** @format */

/** @format */
var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

var carousel = $(".carousel");
var carouselImages = $(".carousel-images");
var carouselNextBtn = $(".carousel .carousel-nav .next");
var carouselPrevBtn = $(".carousel .carousel-nav .prev");
var carouselDots = $(".carousel-dots");
var carouselItems = carouselImages.children;
var indexActive = 0;
var lastIndexActive = 0;
var translateX = 0;
var dotsHtmls = [];

//Tính kích thước chiều rộng của 1 item
var itemWidth = carouselImages.clientWidth;

//Tính tổng kích thước các item
var totalWidth = itemWidth * carouselItems.length;

//Cập nhật css cho carousel-image
carouselImages.style.width = `${totalWidth}px`;

for (var i = 0; i < carouselItems.length; i++) {
	dotsHtmls.push(
		`<span class='dot-item-${i}' onclick='handleActiveDots(${i})'></span>`
	);
}

carouselDots.innerHTML = dotsHtmls.join("");

handleActiveDots();

function handleActiveDots(index = 0) {
	var dotActive = $(`.dot-item-${index}`);
	var dotLastActive = $(`.dot-item-${lastIndexActive}`);
	dotLastActive.classList.remove("active");
	dotActive.classList.add("active");

	translateX += (indexActive - index) * itemWidth;
	carouselImages.style.translate = `${translateX}px`;
	indexActive = index;
	lastIndexActive = index;
}
//Lắng nghe sự kiện click vào nút next

carouselNextBtn.addEventListener("click", function () {
	if (Math.abs(translateX) >= totalWidth - itemWidth) {
		return; //Thoát hàm
	}
	translateX -= itemWidth;
	carouselImages.style.translate = `${translateX}px`;
	indexActive++;
	handleActiveDots(indexActive);
});

carouselPrevBtn.addEventListener("click", function () {
	if (Math.abs(translateX) < itemWidth) {
		return; //Thoát hàm
	}
	translateX += itemWidth;
	carouselImages.style.translate = `${translateX}px`;
	indexActive--;
	handleActiveDots(indexActive);
});
