import { forwardRef as e } from "react";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region packages/react/core/utils/classNames/classNames.ts
function r(...e) {
	let t = [], n = (e) => {
		if (Array.isArray(e)) {
			e.forEach(n);
			return;
		}
		(typeof e == "string" || typeof e == "number") && t.push(String(e));
	};
	return e.forEach(n), t.join(" ");
}
//#endregion
//#region packages/react/core/utils/generateId/generateId.ts
var i = 0;
function a(e) {
	return i += 1, e ? `${e}-${i}` : `aui-${i}`;
}
function o() {
	i = 0;
}
//#endregion
//#region packages/react/components/forms/Button/Button.tsx
function s({ variant: e = "primary", size: n = "medium", className: r, children: i, disabled: a, ...o }) {
	let s = [
		"aui-button",
		`aui-button--${e}`,
		`aui-button--${n}`,
		r
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ t("button", {
		...o,
		className: s,
		disabled: a,
		children: i
	});
}
//#endregion
//#region packages/react/components/forms/Input/Input.tsx
var c = e(({ label: e, description: i, error: o, id: s, className: c, disabled: l, required: u, ...d }, f) => {
	let p = s ?? a("aui-input"), m = i ? `${p}-description` : void 0, h = o ? `${p}-error` : void 0, g = [m, h].filter(Boolean).join(" ") || void 0, _ = !!o;
	return /* @__PURE__ */ n("div", {
		className: "aui-input-field",
		children: [
			e != null && /* @__PURE__ */ n("label", {
				className: "aui-input-field__label",
				htmlFor: p,
				children: [e, u && /* @__PURE__ */ t("span", {
					"aria-hidden": "true",
					children: " *"
				})]
			}),
			/* @__PURE__ */ t("input", {
				...d,
				ref: f,
				id: p,
				className: r("aui-input", _ && "aui-input--invalid", c),
				disabled: l,
				required: u,
				"aria-invalid": _ || void 0,
				"aria-describedby": g
			}),
			i != null && !o && /* @__PURE__ */ t("div", {
				className: "aui-input-field__description",
				id: m,
				children: i
			}),
			o != null && /* @__PURE__ */ t("div", {
				className: "aui-input-field__error",
				id: h,
				role: "alert",
				children: o
			})
		]
	});
});
c.displayName = "Input";
//#endregion
export { r as a, o as i, s as n, a as r, c as t };
