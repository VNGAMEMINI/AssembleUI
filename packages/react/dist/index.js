import { createContext as e, forwardRef as t, useCallback as n, useContext as r, useEffect as i, useState as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region packages/react/core/contexts/ThemeContext.tsx
var c = e(void 0);
//#endregion
//#region packages/react/core/hooks/useTheme/useTheme.ts
function l() {
	let e = r(c);
	if (e === void 0) throw Error("useTheme must be used within a ThemeProvider");
	return e;
}
//#endregion
//#region packages/react/core/hooks/useDisclosure/useDisclosure.ts
function u({ defaultIsOpen: e = !1 } = {}) {
	let [t, r] = a(e);
	return {
		isOpen: t,
		onOpen: n(() => r(!0), []),
		onClose: n(() => r(!1), []),
		onToggle: n(() => r((e) => !e), [])
	};
}
//#endregion
//#region packages/react/core/hooks/useMediaQuery/useMediaQuery.ts
function d(e) {
	return typeof window > "u" || typeof window.matchMedia != "function" ? !1 : window.matchMedia(e).matches;
}
function f(e) {
	let [t, n] = a(() => d(e));
	return i(() => {
		if (typeof window.matchMedia != "function") return;
		let t = window.matchMedia(e), r = (e) => n(e.matches);
		return n(t.matches), t.addEventListener("change", r), () => t.removeEventListener("change", r);
	}, [e]), t;
}
//#endregion
//#region packages/react/core/utils/classNames/classNames.ts
function p(...e) {
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
//#region packages/react/core/utils/mergeRefs/mergeRefs.ts
function m(...e) {
	return (t) => {
		e.forEach((e) => {
			if (typeof e == "function") {
				e(t);
				return;
			}
			e !== null && (e.current = t);
		});
	};
}
//#endregion
//#region packages/react/core/utils/generateId/generateId.ts
var h = 0;
function g(e) {
	return h += 1, e ? `${e}-${h}` : `aui-${h}`;
}
function _() {
	h = 0;
}
//#endregion
//#region packages/react/core/providers/ThemeProvider.tsx
function v({ children: e, defaultTheme: t = "light" }) {
	let [n, r] = a(t);
	return /* @__PURE__ */ o(c.Provider, {
		value: {
			theme: n,
			setTheme: r
		},
		children: /* @__PURE__ */ o("div", {
			"data-aui-theme": n,
			children: e
		})
	});
}
//#endregion
//#region packages/react/components/forms/Button/Button.tsx
function y({ variant: e = "primary", size: t = "medium", className: n, children: r, disabled: i, ...a }) {
	let s = [
		"aui-button",
		`aui-button--${e}`,
		`aui-button--${t}`,
		n
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ o("button", {
		...a,
		className: s,
		disabled: i,
		children: r
	});
}
//#endregion
//#region packages/react/components/forms/Input/Input.tsx
var b = t(({ label: e, description: t, error: n, id: r, className: i, disabled: a, required: c, ...l }, u) => {
	let d = r ?? g("aui-input"), f = t ? `${d}-description` : void 0, m = n ? `${d}-error` : void 0, h = [f, m].filter(Boolean).join(" ") || void 0, _ = !!n;
	return /* @__PURE__ */ s("div", {
		className: "aui-input-field",
		children: [
			e != null && /* @__PURE__ */ s("label", {
				className: "aui-input-field__label",
				htmlFor: d,
				children: [e, c && /* @__PURE__ */ o("span", {
					"aria-hidden": "true",
					children: " *"
				})]
			}),
			/* @__PURE__ */ o("input", {
				...l,
				ref: u,
				id: d,
				className: p("aui-input", _ && "aui-input--invalid", i),
				disabled: a,
				required: c,
				"aria-invalid": _ || void 0,
				"aria-describedby": h
			}),
			t != null && !n && /* @__PURE__ */ o("div", {
				className: "aui-input-field__description",
				id: f,
				children: t
			}),
			n != null && /* @__PURE__ */ o("div", {
				className: "aui-input-field__error",
				id: m,
				role: "alert",
				children: n
			})
		]
	});
});
b.displayName = "Input";
//#endregion
export { y as Button, b as Input, c as ThemeContext, v as ThemeProvider, p as classNames, g as generateId, m as mergeRefs, _ as resetGenerateId, u as useDisclosure, f as useMediaQuery, l as useTheme };
