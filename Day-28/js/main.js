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
var isDrag = false;
var potionsStartDrag = 0;
var pullingDistance = 0;

//Tính kích thước chiều rộng của 1 item
var itemWidth = carouselImages.clientWidth;
var distanceChange = (itemWidth / 100) * 12;
//Tính tổng kích thước các item
var totalWidth = itemWidth * carouselItems.length;

//Cập nhật css cho carousel-image
carouselImages.style.width = `${totalWidth}px`;

for (var i = 0; i < carouselItems.length; i++) {
	dotsHtmls.push(
		`<span class='dot-item-${i}' onclick='handleChangeSlide(${i})'></span>`
	);
}

carouselDots.innerHTML = dotsHtmls.join("");

handleChangeSlide();

function handleChangeSlide(index = 0) {
	indexActive = index;

	if (indexActive < 0) {
		indexActive = 0;
	}
	if (indexActive > carouselItems.length - 1) {
		indexActive = carouselItems.length - 1;
	}

	var dotActive = $(`.dot-item-${indexActive}`);
	var dotLastActive = $(`.dot-item-${lastIndexActive}`);

	dotLastActive.classList.remove("active");
	dotActive.classList.add("active");

	translateX += (lastIndexActive - indexActive) * itemWidth;
	carouselImages.style.transition = "0.3s translate linear";
	carouselImages.style.translate = `${translateX}px`;
	lastIndexActive = indexActive;
}

//Lắng nghe sự kiện click vào nút next

carouselNextBtn.addEventListener("click", function () {
	if (Math.abs(translateX) >= totalWidth - itemWidth) {
		return; //Thoát hàm
	}
	indexActive++;
	handleChangeSlide(indexActive);
});

carouselPrevBtn.addEventListener("click", function () {
	if (Math.abs(translateX) < itemWidth) {
		return; //Thoát hàm
	}
	indexActive--;
	handleChangeSlide(indexActive);
});

carousel.addEventListener("mousedown", function (e) {
	isDrag = true;
	potionsStartDrag = e.clientX;
});

carousel.addEventListener("mousemove", function (e) {
	e.preventDefault();

	if (isDrag) {
		pullingDistance = e.clientX - potionsStartDrag;
		carouselImages.style.transition = "none";
		if (pullingDistance < 0) {
			carouselImages.style.translate = `${translateX + pullingDistance}px`;
			if (Math.abs(pullingDistance) > distanceChange) {
				indexActive++;
				handleChangeSlide(indexActive);
				isDrag = false;
			}
		} else {
			carouselImages.style.translate = `${translateX + pullingDistance}px`;
			if (Math.abs(pullingDistance) > distanceChange) {
				indexActive--;
				handleChangeSlide(indexActive);
				isDrag = false;
			}
		}
	}
});
document.addEventListener("mousemove", function (e) {
	e.preventDefault();
});

carousel.addEventListener("mouseup", function (e) {
	isDrag = false;
	handleChangeSlide(indexActive);
});
