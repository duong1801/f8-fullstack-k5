/** @format */
const searchBox = document.querySelector(".search-box");
const btn = document.querySelector(".btn");
const actionMessage = document.querySelector(".action");
const messagePending = "Hãy nói nội dung bạn muốn";
const messageResult = "Đã nói xong. Hy vọng kết quả như ý bạn";

// Tạo một thể hiện mới của SpeechRecognition
const recognition = new webkitSpeechRecognition();
// Đặt một số thuộc tính cho việc nhận diện
recognition.continuous = false;
recognition.lang = "vi-VN"; // Sử dụng tiếng Việt
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// Bắt đầu nhận diện khi màn hình được nhấp vào
btn.onclick = () => {
	recognition.start();
	actionMessage.innerText = messagePending;
};

// Xử lý sự kiện kết quả
recognition.onresult = (event) => {
	const textVoice = event.results[0][0].transcript.toLowerCase();
	let targetUrl = "";
	if (textVoice.includes("facebook")) {
		targetUrl = "https://www.facebook.com";
	}
	// else if (
	// 	textValue.includes("google") &&
	// 	!textValue.slice(textValue.indexOf("google") + 7)
	// ) {
	// 	if (confirm(`Có phải bạn muốn: ${text} ?`)) {
	// 		window.open("https://www.google.com", "_blank");
	// 	}
	// } else if (textValue.includes("youtube")) {
	// 	if (confirm(`Có phải bạn muốn: ${text} ?`)) {
	// 		window.open("https://www.youtube.com", "_blank");
	// 	}
	// } else if (textValue.includes("google drive")) {
	// 	if (confirm(`Có phải bạn muốn: ${text} ?`)) {
	// 		window.open("https://www.drive.google.com", "_blank");
	// 	}
	// } else if (textValue.includes("google map")) {
	// 	if (confirm(`Có phải bạn muốn: ${text} ?`)) {
	// 		window.open(
	// 			"https://www.google.com/maps/@21.0223341,105.8270062,13z?hl=vi-VN&entry=ttu",
	// 			"_blank"
	// 		);
	// 	}
	// } else if (textValue.includes("bài hát")) {
	// 	if (confirm(`Có phải bạn muốn: ${text} ?`)) {
	// 		let songName = textValue.slice(textValue.indexOf("bài hát") + 8);
	// 		window.open(`https://zingmp3.vn/tim-kiem/tat-ca?q=${songName}`, "_blank");
	// 	}
	// } else if (textValue.includes("video")) {
	// 	if (confirm(`Có phải bạn muốn: ${text} ?`)) {
	// 		let videoName = textValue.slice(textValue.indexOf("video") + 6);
	// 		window.open(
	// 			`https://www.youtube.com/results?search_query=${videoName}`,
	// 			"_blank"
	// 		);
	// 	}
	// } else if (textValue.includes("tới")) {
	// 	if (confirm(`Có phải bạn muốn: ${text} ?`)) {
	// 		let location = textValue.slice(textValue.indexOf("tới") + 4);
	// 		let url = `https://google.com/maps/search/${location}`;
	// 		redirect(url);
	// 	}
	// } else {
	// 	if (confirm(`Có phải bạn muốn: ${text} ?`)) {
	// 		alert(`Không thực hiện được yêu cầu: ${text}`);
	// 	}
	// }

	showResutVoice(textVoice);
	if (targetUrl) {
	}
};

function redirect(value) {
	window.open(value, "_blank");
}
function getValue(string, key) {
	return string.slice(string.indexOf(key) + key.length, string.length - 1);
}

function showResutVoice(textVoice) {
	const div = document.createElement("div");
	actionMessage.innerText = messageResult;
	actionMessage.classList.add("success");
	div.classList.add("result");
	div.innerText = `Đang thực hiện: ${textVoice}`;
	searchBox.appendChild(div);
}
// Dừng nhận diện khi giọng nói kết thúc
recognition.onspeechend = () => {
	recognition.stop();
};
