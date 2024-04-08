/** @format */
const searchBox = document.querySelector(".search-box");
const btn = document.querySelector(".btn");
const actionMessage = document.querySelector(".action");
const messagePending = "Hãy nói nội dung bạn muốn";
const messageResult = "Đã nói xong. Hy vọng kết quả như ý bạn";
let resultEl = null;
let isTarget = false;
const SpeechRecognition =
	window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.lang = "vi-VN";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

btn.onclick = () => {
	recognition.start();
	let message = actionMessage.innerText;
	if (!message) {
		actionMessage.innerText = messagePending;
	} else {
		if (actionMessage.classList.contains("success")) {
			actionMessage.innerText = messagePending;
			actionMessage.classList.remove("success");
			if (resultEl) {
				resultEl.remove();
			}
		}
	}
};

recognition.onresult = (event) => {
	const textVoice = event.results[0][0].transcript.toLowerCase();
	let targetUrl = "";
	if (textVoice.includes("facebook")) {
		targetUrl = "https://www.facebook.com";
	} else if (textVoice.includes("google")) {
		targetUrl = "https://www.google.com";
	} else if (textVoice.includes("youtube")) {
		targetUrl = "https://www.youtube.com";
	} else if (textVoice.includes("google drive")) {
		targetUrl = "https://www.drive.google.com";
	} else if (textVoice.includes("google map")) {
		targetUrl =
			"https://www.google.com/maps/@21.0223341,105.8270062,13z?hl=vi-VN&entry=ttu";
	} else if (textVoice.includes("bài hát")) {
		const songName = getInfoByKeyword("bài hát", textVoice);
		console.log(songName);
		targetUrl = `https://zingmp3.vn/tim-kiem/tat-ca?q=${songName}`;
	} else if (textVoice.includes("video")) {
		const videoName = getInfoByKeyword("video", textVoice);
		targetUrl = `https://www.youtube.com/results?search_query=${videoName}`;
	} else if (textVoice.includes("tới") || textVoice.includes("chỉ đường")) {
		let keyword = "";
		if (textVoice.includes("chỉ đường tới")) {
			keyword = "chỉ đường tới";
		} else if (textVoice.includes("chỉ đường")) {
			keyword = "chỉ đường";
		} else if (textVoice.includes("tới")) {
			keyword = "tới";
		}
		let address = getInfoByKeyword(keyword, textVoice);

		targetUrl = `https://google.com/maps/search/${address}`;
	}
	resultEl = showResutVoiceAndGetResultEl(textVoice);

	if (targetUrl) {
		isTarget = true;
		setTimeout(function () {
			redirect(targetUrl);
		}, 1500);
	} else {
		isTarget = false;
	}
};

function redirect(value) {
	window.open(value, "_blank");
}
function getInfoByKeyword(keyword, string) {
	let result = string
		.slice(string.indexOf(keyword) + keyword.length + 1)
		.trim();
	return result !== -1 ? result : false;
}

function showResutVoiceAndGetResultEl(textVoice) {
	const div = document.createElement("div");
	actionMessage.innerText = messageResult;
	actionMessage.classList.add("success");
	div.classList.add("result");
	div.innerText = `Đang thực hiện: ${textVoice}`;
	searchBox.appendChild(div);
	return div;
}

recognition.onspeechend = () => {
	recognition.stop();
	console.log(isTarget);
	const messageActionCompleted = "Đã nói xong. Hy vọng kết quả như ý bạn";
	const messageResult = "Đã thực hiện xong";
	const messageCancelRequest = "Không thực hiện được yêu cầu";
	if (isTarget) {
		setTimeout(function () {
			actionMessage.innerText = messageActionCompleted;
			console.log("123");
			resultEl.innerText = messageResult;
		}, 1500);
	} else {
		setTimeout(function () {
			resultEl.innerText = messageCancelRequest;
		}, 1500);
	}
};
