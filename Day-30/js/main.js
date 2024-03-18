/** @format */
var root = document.querySelector("#root");
var tableProducts = document.querySelector(".list-product");
var tableCart = document.querySelector(".cart");
var cart = JSON.parse(localStorage.getItem("cart")) || [];
console.log(cart);
var products = [
	{ id: 1, name: "Sản phẩm 1", price: 10000 },
	{ id: 2, name: "Sản phẩm 2", price: 20000 },
	{ id: 3, name: "Sản phẩm 3", price: 30000 },
	{ id: 4, name: "Sản phẩm 4", price: 40000 },
];
var Blue = {
	createElement: function (tag, attributes = {}, ...children) {
		var element = document.createElement(tag);
		if (children.length) {
			children.forEach((item) => {
				element.append(item);
			});
		}

		if (Object.keys(attributes).length) {
			Object.keys(attributes).forEach((key) => {
				if (key.startsWith("on")) {
					var event = key.replace("on", "").toLocaleLowerCase();
					element.addEventListener(event, attributes[key]);
				} else {
					element[key] = attributes[key];
				}
			});
		}
		return element;
	},
};

function getProductById(id, arr = []) {
	var product = arr.find(function (product) {
		return product.id === id;
	});
	return product;
}

function handleAddToCart(event, id) {
	var product = getProductById(id, products);
	var quantity = +event.target.previousElementSibling.value;
	var cartItem = { ...product, quantity: quantity };
	if (!cart.length) {
		cart.push(cartItem);
		renderCart();
	} else {
		var check = cart.some((product) => product.id === id);
		if (!check) {
			cart.push(cartItem);
			tbodyCartTable = document.querySelector(".table-cart tbody");
			if (tbodyCartTable) {
				var tr = Blue.createElement(
					"tr",
					{},
					Blue.createElement("td", {}, cart.length + 1),
					Blue.createElement("td", {}, cartItem.name),
					Blue.createElement("td", {}, cartItem.price),
					Blue.createElement(
						"td",
						{},
						Blue.createElement("input", {
							type: "number",
							"data-id": "3",
							value: cartItem.quantity,
						})
					),
					Blue.createElement("td", {}, cartItem.price * cartItem.quantity),
					Blue.createElement("td", {}, Blue.createElement("button", {}, "Xoá"))
				);
				tbodyCartTable.append(tr);
			}
		} else {
			var productUpdate = getProductById(id, cart);
			index = cart.indexOf(productUpdate);
			cart[index].quantity += +quantity;
		}
	}
	localStorage.setItem("cart", JSON.stringify(cart));
}

var productElement = products.map(function (product, index) {
	return Blue.createElement(
		"tr",
		{},
		Blue.createElement("td", {}, index + 1),
		Blue.createElement("td", {}, product.name),
		Blue.createElement("td", {}, product.price),
		Blue.createElement(
			"td",
			{},
			Blue.createElement("input", {
				type: "number",
				id: "quantity_1",
				value: "1",
				style: "width: 90%; display: block; margin: 0 auto",
			}),

			Blue.createElement(
				"button",
				{
					type: "button",
					style: "width: 100%",
					onClick: function (event) {
						handleAddToCart(event, product.id);
					},
				},
				"Thêm giỏ hàng"
			)
		)
	);
});

var listProducts = Blue.createElement("tbody", {}, ...productElement);
tableProducts.append(listProducts);

if (!cart?.length || cart[0]?.quantity === 0) {
	var text = Blue.createElement(
		"p",
		{ style: { textAlign: "center" } },
		"Không có sản phẩm nào trong giỏ hàng"
	);
	root.appendChild(text);
} else {
	renderCart();
}

function renderCart() {
	var cartElement = cart.map(function (product, index) {
		return Blue.createElement(
			"tr",
			{},
			Blue.createElement("td", {}, index + 1),
			Blue.createElement("td", {}, product.name),
			Blue.createElement("td", {}, product.price),
			Blue.createElement(
				"td",
				{},
				Blue.createElement("input", {
					type: "number",
					"data-id": "3",
					value: product.quantity,
				})
			),
			Blue.createElement("td", {}, product.price * product.quantity),
			Blue.createElement("td", {}, Blue.createElement("button", {}, "Xoá"))
		);
	});
	var tbodyEL = Blue.createElement("tbody", {}, ...cartElement);
	var tableCart = Blue.createElement(
		"table",
		{
			className: "table-cart",
			cellpadding: "0",
			cellspacing: "0",
			width: "100%",
			border: "1",
		},
		Blue.createElement(
			"thead",
			{},
			Blue.createElement(
				"tr",
				{},
				Blue.createElement("td", { width: "5%" }, "STT"),
				Blue.createElement("td", {}, "Tên sản phẩm"),
				Blue.createElement("td", { width: "20%" }, "Giá"),
				Blue.createElement("td", { width: "20%" }, "Số lượng"),
				Blue.createElement("td", { width: "20%" }, "Thành tiền"),
				Blue.createElement("td", { width: "5%" }, "Xoá")
			)
		),
		tbodyEL
	);
	root.appendChild(tableCart);
}
