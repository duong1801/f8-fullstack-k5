/** @format */
var dropDownBtn = document.querySelector(".dropdown-btn");
var dropDownMenu = document.querySelector(".dropdown-menu");
var btnTextBold = document.getElementById("bold-btn");
var btnTextUnderline = document.getElementById("underline-btn");
var btnTextItalic = document.getElementById("italic-btn");
var btnTextColor = document.getElementById("color-btn");
var editorContent = document.querySelector(".content");
var countWordsEl = document.querySelector(".count-words");
var countCharsEl = document.querySelector(".count-chars");
dropDownBtn.addEventListener("click", function (e) {
	e.stopPropagation();
	dropDownMenu.style.display = "block";
});

document.addEventListener("click", function () {
	dropDownMenu.style.display = "none";
});

btnTextBold.addEventListener("click", function () {
	document.execCommand("bold", false);
});

btnTextItalic.addEventListener("click", function () {
	document.execCommand("italic", false);
});

btnTextUnderline.addEventListener("click", function () {
	document.execCommand("underline", false);
});

btnTextColor.addEventListener("input", function () {
	document.execCommand("foreColor", false, btnTextColor.value);
});

editorContent.addEventListener("keyup", function () {
	var textContent = editorContent.textContent;
	var countChars = textContent.trim().length;
	var innerText = editorContent.innerText;
	var countWords = 0;
	var innerTextArr = innerText.split("\n");
	console.log(innerTextArr);
	innerTextArr.forEach(function (words) {
		if (words) {
			if (words.includes(" ")) {
				var wordArr = words.split(" ");
				countWords += wordArr.length;
			} else {
				countWords++;
			}
		}
	});
	countCharsEl.textContent = countChars;
	countWordsEl.textContent = countWords;
});
