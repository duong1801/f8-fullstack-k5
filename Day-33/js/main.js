/** @format */
var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

var dropDownBtn = $(".dropdown-btn");
var dropDownMenu = $(".dropdown-menu");
var btnTextBold = $("#bold-btn");
var btnTextUnderline = $("#underline-btn");
var btnTextItalic = $("#italic-btn");
var btnTextColor = $("#color-btn");
var editorContent = $(".content");
var countWordsEl = $(".count-words");
var countCharsEl = $(".count-chars");
var newContent = $(".new-content");
var btnSaveTxt = $(".save-txt");
var btnSavePdf = $(".save-pdf");
var inputNameEl = $(".input-file-name");
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
	var innerTextArr = innerText.trim().split("\n");
	// console.log(innerTextArr);
	innerTextArr.forEach(function (words) {
		if (words) {
			if (words.includes(" ")) {
				var wordArr = words.trim().split(" ");
				wordArr.forEach(function (word) {
					if (word.trim()) {
						console.log(word);
						countWords++;
					}
				});
			} else {
				countWords++;
			}
		}
	});
	countCharsEl.textContent = countChars;
	countWordsEl.textContent = countWords;
});

newContent.addEventListener("click", function () {
	editorContent.textContent = "";
	editorContent.focus();
});
console.log(inputNameEl);

btnSaveTxt.addEventListener("click", function (e) {
	e.preventDefault();
	var content = editorContent.textContent;
	var fileName = inputNameEl.value;
	dropDownMenu.style.display = "none";
	var blob = new Blob([content]);
	var blobUrl = URL.createObjectURL(blob);
	var a = document.createElement("a");
	a.href = blobUrl;
	a.download = `${fileName}.txt`;
	a.click();
});

btnSavePdf.addEventListener("click", function () {
	var content = editorContent.textContent;
	var fileName = inputNameEl.value;
	html2pdf().from(content).save(`${fileName}.pdf`);
});
