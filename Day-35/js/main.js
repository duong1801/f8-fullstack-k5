/** @format */
class F8 {
	static component(
		componentName = "",
		{ data = undefined, template = undefined }
	) {
		customElements.define(
			componentName,

			class extends HTMLElement {
				constructor() {
					super();
				}

				connectedCallback() {
					let shadow = this.attachShadow({ mode: "open" });
					if (typeof data === "function") {
						const newData = data();
						Object.keys(newData).forEach((key) => {
							window[key] = newData[key];
						});
						template = template.replace(
							/<(\w+)(.*?)>(\s*){{([^{}]+)}}(\s*)<\/\1>/g,
							'<$1$2 data-$4="$4">$3{{$4}}</$1>'
						);
						const variablesArr = template.match(/{{.+?}}/g);
						variablesArr.forEach((variable) => {
							const variableResult = variable.match(/{{(.+?)}}/)[1].trim();
							let regex = new RegExp(`{{\\s*${variableResult}\\s*}}`, "g");
							template = template.replace(regex, window[variableResult]);
						});
					}

					const templateEl = document.createElement("template");
					templateEl.innerHTML = template;
					const templateNode = templateEl.content.cloneNode(true);
					const childrenNode = templateNode.children;

					for (let i = 0; i < childrenNode.length; i++) {
						// console.log(childrenNode[i].attributes);
						const children = childrenNode[i];
						if (children.attributes.length) {
							const arrtibutes = childrenNode[i].attributes;
							for (let i = 0; i < arrtibutes.length; i++) {
								const arrtibute = arrtibutes[i];
								const nodeName = arrtibute.nodeName;
								const nodeValue = arrtibute.nodeValue;

								const variables = nodeValue.match(/^[a-z]*/);

								if (nodeName.startsWith("v-on")) {
									const action = nodeName.match(/:(.+)/)[1];

									const variable = nodeValue.match(/^[a-z]*/)[0];
									const elementsUpdate = templateNode.querySelectorAll(
										`[data-${variable}]`
									);

									children.addEventListener(action, function () {
										eval(nodeValue);
										const newValue = window[variable];
										console.log(newValue);
										elementsUpdate.forEach((element) => {
											element.innerText = newValue;
										});
									});
								}
							}
						}
					}
					shadow.append(templateNode);
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
   <p> {{count}} </p>
  <button v-on:click="count--">-</button>
  <button v-on:click="count++">+</button>
  <button v-on:dblclick="title='Xin chào'">Change Title</button>
  `,
});

F8.component("header-component", {
	template: `<h1>HEADER</h1>`,
});

// const template = `
// <p>Hello F8</p>
// <h2>Khoá học fullstack</h2>

// `;
// const templateEl = document.createElement("template");
// templateEl.innerHTML = templateEl;
// const templateNode = templateEl.content.cloneNode(true);
// console.dir(templateNode);

// customElements.define();
