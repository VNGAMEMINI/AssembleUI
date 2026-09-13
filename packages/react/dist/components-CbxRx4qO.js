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
var c = e(({ label: e, description: i, error: o, id: s, className: c, disabled: l, required: u, "aria-describedby": d, "aria-invalid": f, ...p }, m) => {
	let h = s ?? a("aui-input"), g = i ? `${h}-description` : void 0, _ = o ? `${h}-error` : void 0, v = [d, [i && !o ? g : void 0, _].filter(Boolean).join(" ")].filter(Boolean).join(" ") || void 0, y = !!o, b = o != null || f;
	return /* @__PURE__ */ n("div", {
		className: "aui-input-field",
		children: [
			e != null && /* @__PURE__ */ n("label", {
				className: "aui-input-field__label",
				htmlFor: h,
				children: [e, u && /* @__PURE__ */ t("span", {
					"aria-hidden": "true",
					children: " *"
				})]
			}),
			/* @__PURE__ */ t("input", {
				...p,
				ref: m,
				id: h,
				className: r("aui-input", y && "aui-input--invalid", c),
				disabled: l,
				required: u,
				"aria-invalid": b,
				"aria-describedby": v
			}),
			i != null && !o && /* @__PURE__ */ t("div", {
				className: "aui-input-field__description",
				id: g,
				children: i
			}),
			o != null && /* @__PURE__ */ t("div", {
				className: "aui-input-field__error",
				id: _,
				role: "alert",
				children: o
			})
		]
	});
});
c.displayName = "Input";
//#endregion
//#region packages/react/components/forms/Checkbox/Checkbox.tsx
var l = e(({ label: e, description: i, error: o, id: s, className: c, disabled: l, required: u, "aria-describedby": d, "aria-invalid": f, ...p }, m) => {
	let h = s ?? a("aui-checkbox"), g = i ? `${h}-description` : void 0, _ = o ? `${h}-error` : void 0, v = [d, [i && !o ? g : void 0, _].filter(Boolean).join(" ")].filter(Boolean).join(" ") || void 0, y = !!o, b = o != null || f;
	return /* @__PURE__ */ n("div", {
		className: "aui-checkbox-field",
		children: [
			/* @__PURE__ */ n("div", {
				className: "aui-checkbox-field__control",
				children: [/* @__PURE__ */ t("input", {
					...p,
					ref: m,
					id: h,
					type: "checkbox",
					className: r("aui-checkbox", y && "aui-checkbox--invalid", c),
					disabled: l,
					required: u,
					"aria-invalid": b,
					"aria-describedby": v
				}), e != null && /* @__PURE__ */ n("label", {
					className: "aui-checkbox-field__label",
					htmlFor: h,
					children: [e, u && /* @__PURE__ */ t("span", {
						"aria-hidden": "true",
						children: " *"
					})]
				})]
			}),
			i != null && !o && /* @__PURE__ */ t("div", {
				className: "aui-checkbox-field__description",
				id: g,
				children: i
			}),
			o != null && /* @__PURE__ */ t("div", {
				className: "aui-checkbox-field__error",
				id: _,
				role: "alert",
				children: o
			})
		]
	});
});
l.displayName = "Checkbox";
//#endregion
//#region packages/react/components/forms/Radio/Radio.tsx
var u = e(({ label: e, description: i, error: o, id: s, className: c, disabled: l, required: u, "aria-describedby": d, "aria-invalid": f, ...p }, m) => {
	let h = s ?? a("aui-radio"), g = i ? `${h}-description` : void 0, _ = o ? `${h}-error` : void 0, v = [d, [i && !o ? g : void 0, _].filter(Boolean).join(" ")].filter(Boolean).join(" ") || void 0, y = !!o, b = o != null || f;
	return /* @__PURE__ */ n("div", {
		className: "aui-radio-field",
		children: [
			/* @__PURE__ */ n("div", {
				className: "aui-radio-field__control",
				children: [/* @__PURE__ */ t("input", {
					...p,
					ref: m,
					id: h,
					type: "radio",
					className: r("aui-radio", y && "aui-radio--invalid", c),
					disabled: l,
					required: u,
					"aria-invalid": b,
					"aria-describedby": v
				}), e != null && /* @__PURE__ */ n("label", {
					className: "aui-radio-field__label",
					htmlFor: h,
					children: [e, u && /* @__PURE__ */ t("span", {
						"aria-hidden": "true",
						children: " *"
					})]
				})]
			}),
			i != null && !o && /* @__PURE__ */ t("div", {
				className: "aui-radio-field__description",
				id: g,
				children: i
			}),
			o != null && /* @__PURE__ */ t("div", {
				className: "aui-radio-field__error",
				id: _,
				role: "alert",
				children: o
			})
		]
	});
});
u.displayName = "Radio";
//#endregion
//#region packages/react/components/forms/Select/Select.tsx
var d = e(({ label: e, description: i, error: o, id: s, className: c, disabled: l, required: u, "aria-describedby": d, "aria-invalid": f, ...p }, m) => {
	let h = s ?? a("aui-select"), g = i ? `${h}-description` : void 0, _ = o ? `${h}-error` : void 0, v = [d, [i && !o ? g : void 0, _].filter(Boolean).join(" ")].filter(Boolean).join(" ") || void 0, y = !!o, b = o != null || f;
	return /* @__PURE__ */ n("div", {
		className: "aui-select-field",
		children: [
			e != null && /* @__PURE__ */ n("label", {
				className: "aui-select-field__label",
				htmlFor: h,
				children: [e, u && /* @__PURE__ */ t("span", {
					"aria-hidden": "true",
					children: " *"
				})]
			}),
			/* @__PURE__ */ t("select", {
				...p,
				ref: m,
				id: h,
				className: r("aui-select", y && "aui-select--invalid", c),
				disabled: l,
				required: u,
				"aria-invalid": b,
				"aria-describedby": v
			}),
			i != null && !o && /* @__PURE__ */ t("div", {
				className: "aui-select-field__description",
				id: g,
				children: i
			}),
			o != null && /* @__PURE__ */ t("div", {
				className: "aui-select-field__error",
				id: _,
				role: "alert",
				children: o
			})
		]
	});
});
d.displayName = "Select";
//#endregion
//#region packages/react/components/forms/Textarea/Textarea.tsx
var f = e(({ label: e, description: i, error: o, id: s, className: c, disabled: l, required: u, "aria-describedby": d, "aria-invalid": f, ...p }, m) => {
	let h = s ?? a("aui-textarea"), g = i ? `${h}-description` : void 0, _ = o ? `${h}-error` : void 0, v = [d, [i && !o ? g : void 0, _].filter(Boolean).join(" ")].filter(Boolean).join(" ") || void 0, y = !!o, b = o != null || f;
	return /* @__PURE__ */ n("div", {
		className: "aui-textarea-field",
		children: [
			e != null && /* @__PURE__ */ n("label", {
				className: "aui-textarea-field__label",
				htmlFor: h,
				children: [e, u && /* @__PURE__ */ t("span", {
					"aria-hidden": "true",
					children: " *"
				})]
			}),
			/* @__PURE__ */ t("textarea", {
				...p,
				ref: m,
				id: h,
				className: r("aui-textarea", y && "aui-textarea--invalid", c),
				disabled: l,
				required: u,
				"aria-invalid": b,
				"aria-describedby": v
			}),
			i != null && !o && /* @__PURE__ */ t("div", {
				className: "aui-textarea-field__description",
				id: g,
				children: i
			}),
			o != null && /* @__PURE__ */ t("div", {
				className: "aui-textarea-field__error",
				id: _,
				role: "alert",
				children: o
			})
		]
	});
});
f.displayName = "Textarea";
//#endregion
//#region packages/react/components/forms/Switch/Switch.tsx
var p = e(({ label: e, description: i, error: o, id: s, className: c, disabled: l, required: u, "aria-describedby": d, "aria-invalid": f, ...p }, m) => {
	let h = s ?? a("aui-switch"), g = i ? `${h}-description` : void 0, _ = o ? `${h}-error` : void 0, v = [d, [i && !o ? g : void 0, _].filter(Boolean).join(" ")].filter(Boolean).join(" ") || void 0, y = !!o, b = o != null || f;
	return /* @__PURE__ */ n("div", {
		className: "aui-switch-field",
		children: [
			/* @__PURE__ */ n("label", {
				className: "aui-switch-field__label",
				htmlFor: h,
				children: [/* @__PURE__ */ t("input", {
					...p,
					ref: m,
					id: h,
					type: "checkbox",
					role: "switch",
					className: r("aui-switch", y && "aui-switch--invalid", c),
					disabled: l,
					required: u,
					"aria-invalid": b,
					"aria-describedby": v
				}), e != null && /* @__PURE__ */ n("span", {
					className: "aui-switch-field__text",
					children: [e, u && /* @__PURE__ */ t("span", {
						"aria-hidden": "true",
						children: " *"
					})]
				})]
			}),
			i != null && !o && /* @__PURE__ */ t("div", {
				className: "aui-switch-field__description",
				id: g,
				children: i
			}),
			o != null && /* @__PURE__ */ t("div", {
				className: "aui-switch-field__error",
				id: _,
				role: "alert",
				children: o
			})
		]
	});
});
p.displayName = "Switch";
//#endregion
//#region packages/react/components/data/Badge/Badge.tsx
var m = e(({ children: e, variant: n = "neutral", size: i = "md", className: a, ...o }, s) => /* @__PURE__ */ t("span", {
	...o,
	ref: s,
	className: r("aui-badge", `aui-badge--${n}`, `aui-badge--${i}`, a),
	children: e
}));
m.displayName = "Badge";
//#endregion
export { u as a, s as c, r as d, d as i, a as l, p as n, l as o, f as r, c as s, m as t, o as u };
