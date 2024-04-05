/** @format */
class F8 {
	static component(
		componentName = "",
		{ data = undefined, template = undefined }
	) {
		const newData = data();
		console.log(newData);
		customElements.define(
			componentName,
			class extends HTMLElement {
				constructor() {
					super();

					Object.keys(newData).forEach((key) => {
						window[key] = newData[key];
					});
				}

				connectedCallback() {
					let shadow = this.attachShadow({ mode: "open" });
					const variablesArr = template.match(/{{.+?}}/g);
					variablesArr.forEach((variable) => {
						const variableResult = variable.match(/{{(.+?)}}/)[1].trim();
						let regex = new RegExp(`{{\\s*${variableResult}\\s*}}`, "g");
						template = template.replace(regex, window[variableResult]);
					});
					shadow.innerHTML = template;
				}
			}
		);
	}
}
F8.component("counter-app", {
	data: () => ({
		count: 0,
		title: "Counter App",
	}),
	template: `
  <h1> {{title}} </h1>
  <h2> {{count}} </h2>
  <button v-on:click="count--">-</button>
  <button v-on:click="count++">+</button>
  <button v-on:dblclick="title='Xin chào'">Change Title</button>
  `,
});

// F8.component("header-component", {
// 	template: `<h1>HEADER</h1>`,
// });

// const template = `
// <p>Hello F8</p>
// <h2>Khoá học fullstack</h2>

// `;
// const templateEl = document.createElement("template");
// templateEl.innerHTML = templateEl;
// const templateNode = templateEl.content.cloneNode(true);
// console.dir(templateNode);

// customElements.define();
