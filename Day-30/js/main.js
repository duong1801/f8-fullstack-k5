/** @format */
var root = document.querySelector("#root");
var tableProducts = document.querySelector(".list-product");
var cart = JSON.parse(localStorage.getItem("cart")) || [];

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
				} else if (key.startsWith("data")) {
					var dataset = key.replace("data-", "");
					element.dataset[dataset] = attributes[key];
				} else {
					element[key] = attributes[key];
				}
			});
		}
		return element;
	},
};
var textEmptyCart = Blue.createElement(
	"p",
	{ className: "text-empty-cart" },
	"Không có sản phẩm nào trong giỏ hàng"
);
function getProductById(id, arr = []) {
	var product = arr.find(function (product) {
		return product.id === id;
	});
	return product;
}

function handleAddToCart(event, id) {
	// var cart = JSON.parse(localStorage.getItem("cart")) || [];
	var product = getProductById(id, products);
	var quantity = +event.target.previousElementSibling.value;
	var cartItem = { ...product, quantity: quantity };
	console.log(cart.length);
	if (cart.length === 0) {
		cart.push(cartItem);
		renderCart();
		if (textEmptyCart) {
			textEmptyCart.remove();
		}
	} else {
		var check = cart.some((product) => product.id === id);
		if (!check) {
			cart.push(cartItem);
			tbodyCartTable = document.querySelector(".table-cart tbody");
			if (tbodyCartTable) {
				var tr = Blue.createElement(
					"tr",
					{},
					Blue.createElement("td", {}, cart.length),
					Blue.createElement("td", {}, cartItem.name),
					Blue.createElement("td", {}, cartItem.price),
					Blue.createElement(
						"td",
						{},
						Blue.createElement("input", {
							type: "number",
							"data-id": cartItem.id,
							value: cartItem.quantity,
						})
					),
					Blue.createElement("td", {}, cartItem.price * cartItem.quantity),
					Blue.createElement(
						"td",
						{},
						Blue.createElement(
							"button",
							{
								onClick: function (event) {
									handleRemoveItemCart(event, product.id);
								},
							},
							"Xoá"
						)
					)
				);
				tbodyCartTable.append(tr);
			}
		} else {
			var productUpdate = getProductById(id, cart);
			index = cart.indexOf(productUpdate);
			cart[index].quantity += +quantity;
			var inputUpdate = document.querySelector(`[data-id="${id}"]`);
			var newQuantity = cart[index].quantity;
			inputUpdate.value = newQuantity;
			var amount = inputUpdate.parentElement.nextElementSibling;
			amount.innerText = newQuantity * productUpdate.price;
		}
	}
	localStorage.setItem("cart", JSON.stringify(cart));
}

function handleRemoveItemCart(event, id) {
	if (cart.length) {
		var itemRemove = event.target.parentElement.parentElement;
		var productRemove = getProductById(id, cart);
		var indexProductRemove = cart.indexOf(productRemove);
		cart.splice(indexProductRemove, 1);
		itemRemove.remove();
	}
	if (cart.length === 0) {
		var tableCart = document.querySelector(".table-cart");
		var callToActionGroups = document.querySelector(".call-to-action-groups");
		if (tableCart && callToActionGroups) {
			tableCart.remove();
			callToActionGroups.remove();
			root.appendChild(textEmptyCart);
		}
	}
	localStorage.setItem("cart", JSON.stringify(cart));
}

function handleRemoveCart() {
	var tableCart = document.querySelector(".table-cart");
	var callToActionGroups = document.querySelector(".call-to-action-groups");
	if (tableCart && callToActionGroups) {
		console.log("Xoas");
		tableCart.remove();
		callToActionGroups.remove();
		cart = [];
		localStorage.removeItem("cart");
		root.appendChild(textEmptyCart);
	}
}

function handleUpdateCart() {
	var inputsWithDataId = document.querySelectorAll(
		".table-cart input[data-id]"
	);

	inputsWithDataId.forEach(function (input) {
		var id = +input.dataset.id;
		var newQuantity = input.value;
		var productUpdate = getProductById(id, cart);
		var amount = input.parentElement.nextElementSibling;
		input.value = newQuantity;
		amount.innerText = productUpdate.price * newQuantity;
		var indexUpdate = cart.indexOf(productUpdate);

		// var productUpdate = getProductById(id, cart);
	});
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
	var textEmptyCart = Blue.createElement(
		"p",
		{ className: "text-empty-cart" },
		"Không có sản phẩm nào trong giỏ hàng"
	);
	root.appendChild(textEmptyCart);
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
					"data-id": product.id,
					value: product.quantity,
				})
			),
			Blue.createElement("td", {}, product.price * product.quantity),
			Blue.createElement(
				"td",
				{},
				Blue.createElement(
					"button",
					{
						onClick: function (event) {
							handleRemoveItemCart(event, product.id);
						},
					},
					"Xoá"
				)
			)
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

	root.append(tableCart);
	var callToActionGroups = Blue.createElement(
		"div",
		{
			className: "call-to-action-groups",
		},
		Blue.createElement("hr", {}),
		Blue.createElement(
			"button",
			{
				type: "button",
				id: "update_cart",
				onClick: function () {
					handleUpdateCart();
				},
			},
			"Cập nhật giỏ hàng"
		),
		Blue.createElement(
			"button",
			{
				type: "button",
				id: "delete_cart",
				onClick: function () {
					handleRemoveCart();
				},
			},
			"Xoá giỏ hàng"
		)
	);
	root.appendChild(callToActionGroups);
}
