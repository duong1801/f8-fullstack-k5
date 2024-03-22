/** @format */
import lyrics from "./lyric.js";
var progressBar = document.querySelector(".progress-bar");
var progress = progressBar.querySelector(".progress");
var progressSpan = progress.querySelector("span");
var timer = document.querySelector(".timer");
var isClickedProgressBar = false;
var progressBarWidth = progressBar.clientWidth;
var openKaraokeBtn = document.querySelector(".open-karaoke");
var karaoke = document.querySelector(".karaoke");
var closeKaraokeBtn = document.querySelector(".close");
var karaokeInner = document.querySelector(".karaoke-inner");
var sentenceEl = document.querySelector(".sentence");
var nameSong = sentenceEl.innerText;
var nextSentenceEl = document.querySelector(".next-sentence");
var singer = nextSentenceEl.innerText;
var sentences = lyrics.data.sentences;
var sentencesEnd = sentences[sentences.length - 1].words;
var endTimeSong = sentencesEnd[sentencesEnd.length - 1].endTime;
var endTime = 0;

progressBar.addEventListener("mousedown", function (e) {
	if (e.which === 1) {
		endTime = 0;
		timer.style.display = "none";
		isClickedProgressBar = true;
		var offsetX = e.offsetX;
		var rate = (offsetX * 100) / progressBarWidth;
		progress.style.width = `${rate}%`;
		positionSpace = offsetX;
		offsetWidth = offsetX;
		initialClientX = e.clientX;
		// audio.currentTime = (rate * audio.duration) / 100;
		audio.removeEventListener("timeupdate", updatedTimer);
		document.addEventListener("mousemove", handleDrag);
		audio.addEventListener("timeupdate", handleRenderLyrics);
	}
});

progressSpan.addEventListener("mousedown", function (e) {
	e.stopPropagation();
	isClickedProgressBar = true;

	audio.removeEventListener("timeupdate", updatedTimer);
	if (e.which === 1) {
		document.addEventListener("mousemove", handleDrag);
		initialClientX = e.clientX;
	}
});

document.addEventListener("mouseup", function () {
	if (isClickedProgressBar) {
		endTime = 0;
		document.removeEventListener("mousemove", handleDrag);
		offsetWidth = positionSpace;
		var rate = (offsetWidth / progressBarWidth) * 100;
		audio.currentTime = (rate * audio.duration) / 100;
		audio.addEventListener("timeupdate", updatedTimer);
	}
	isClickedProgressBar = false;
});

var initialClientX = 0;
var offsetWidth = 0; //Khoảng cách ban đầu button so với progressBar
var positionSpace = 0; //Khoảng cách kéo thêm tại vị trí ban đầu tới vị trí mới
var handleDrag = function (e) {
	timer.style.display = "none";
	var clientX = e.clientX;

	positionSpace = offsetWidth + (clientX - initialClientX);

	var rate = (positionSpace * 100) / progressBarWidth;
	if (rate < 0) {
		rate = 0;
	}
	if (rate > 100) {
		rate = 100;
	}
	progress.style.width = `${rate}%`;
};

//Xây dựng trình phát nhạc
var audio = document.querySelector("audio");
var durationEl = progressBar.nextElementSibling;
var currentTimeEl = progressBar.previousElementSibling;
var playBtn = document.querySelector(".player .player-action i");
var getTime = function (seconds) {
	var mins = Math.floor(seconds / 60);
	seconds = Math.floor(seconds - mins * 60);
	return `${mins < 10 ? "0" + mins : mins}:${
		seconds < 10 ? "0" + seconds : seconds
	}`;
};

//Lắng nghe sự kiện khi file mp3 được tải xong và trình duyệt lấy được thông tin
durationEl.innerText = getTime(audio.duration);
audio.addEventListener("loadeddata", function () {
	durationEl.innerText = getTime(audio.duration);
});

//Khi người dùng click vào nút play
playBtn.addEventListener("click", function () {
	//Nếu nhạc đang dừng --> Phát nhạc
	//Nếu nhạc đang chạy --> Dừng nhạc
	if (audio.paused) {
		audio.play();
		this.classList.remove("fa-play");
		this.classList.add("fa-pause");
	} else {
		audio.pause();
		this.classList.remove("fa-pause");
		this.classList.add("fa-play");
	}
});

var updatedTimer = function () {
	currentTimeEl.innerText = getTime(audio.currentTime);
	//Tính tỷ lệ phần trăm
	var rate = (audio.currentTime / audio.duration) * 100;
	offsetWidth = (progressBarWidth / 100) * rate;
	progress.style.width = `${rate}%`;
};

//Khi nhạc đang phát
audio.addEventListener("timeupdate", updatedTimer);

audio.addEventListener("ended", function () {
	audio.currentTime = 0;
	playBtn.classList.remove("fa-pause");
	playBtn.classList.add("fa-play");
	progress.style.width = "0%";
	currentTimeEl.innerText = getTime(audio.currentTime);
});

var handleShowTimer = function (e) {
	var offsetX = e.offsetX;
	var rate = (offsetX * 100) / progressBarWidth;
	var timing = (audio.duration * rate) / 100;
	timer.style.left = `${rate}%`;
	timer.innerText = getTime(timing);
	timer.style.display = "block";
};

progressBar.addEventListener("mousemove", handleShowTimer);

progressBar.addEventListener("mouseleave", function () {
	timer.style.display = "none";
});

progressSpan.addEventListener("mousemove", function (e) {
	e.stopPropagation();
	timer.style.display = "none";
});

openKaraokeBtn.addEventListener("click", function (e) {
	karaoke.classList.add("show");
});

closeKaraokeBtn.addEventListener("click", function () {
	karaoke.classList.remove("show");
});

audio.addEventListener("timeupdate", handleRenderLyrics);
function handleRenderLyrics() {
	var currentTime = audio.currentTime * 1000;

	if (currentTime > endTime) {
		var dataSentence = getSentence(currentTime);
		if (Object.keys(dataSentence).length && currentTime < endTimeSong) {
			sentenceEl.innerText = dataSentence.sentence;
			var dataNextSentence = getNextSentence(dataSentence.index);
			if (dataNextSentence) {
				nextSentenceEl.innerText = dataNextSentence.sentence;
				endTime = dataNextSentence.endTime;
			}
		} else {
			endTime = 0;
			sentenceEl.innerText = nameSong;
			nextSentenceEl.innerText = singer;
		}
	}
}
function getSentence(currentTime) {
	var data = {};
	sentences.forEach((element, index) => {
		var sentence = "";
		var words = element.words;
		var sentenceLength = words.length;

		if (
			currentTime > words[0].startTime &&
			currentTime < words[sentenceLength - 1].endTime
		) {
			var startTimeSentence = words[0].startTime;
			var endTimeSentence = words[words.length - 1].endTime;
			words.forEach((word) => {
				sentence += ` ${word.data}`;
			});

			data = {
				startTime: startTimeSentence,
				sentence: sentence.trim(),
				endTime: endTimeSentence,
				index: index + 1,
			};
		}
	});
	return data;
}

function getNextSentence(index) {
	if (index < sentences.length) {
		var sentence = "";
		var words = sentences[index].words;
		var startTimeSentence = words[0].startTime;
		var endTimeSentence = words[words.length - 1].endTime;
		words.forEach((word) => {
			sentence += ` ${word.data}`;
		});

		var data = {
			startTime: startTimeSentence,
			sentence: sentence.trim(),
			endTime: endTimeSentence,
			index: index,
		};
		return data;
	}
	return false;
}
