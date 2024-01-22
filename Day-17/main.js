/** @format */
// Bài 1: Hoán vị 2 số
var a = 1;
var b = 2;

a = a + b;
b = a - b;
a = a - b;
console.log(a, b);

// Bài 2: Thực hiện phép toán

var result = 10 + 20 + 5 ** 10 / 2;
console.log(result);

// Bài 3: Tìm số lớn nhất

var a, b, c;

var maxNumber = a;
if (maxNumber < b) {
	maxNumber = b;
}

if (maxNumber < c) {
	maxNumber = c;
}

console.log(`Số lớn nhất là ${maxNumber}`);

// Bài 4: Kiểm tra số cùng dấu
var a, b;
var result;
if (a * b !== 0) {
	if (a * b > 0) {
		result = "Hai số cùng dấu";
	} else {
		result = "Hai số trái dấu";
	}
}
console.log(result);

// Bài 5: Sắp xếp 3 số

var a, b, c;

var temporary;

if (a > b) {
	temporary = a;
	a = b;
	b = temporary;
}
if (a > c) {
	temporary = a;
	a = c;
	c = temporary;
}

if (b > c) {
	temp = b;
	b = c;
	c = temp;
}

console.log(a, b, c);
