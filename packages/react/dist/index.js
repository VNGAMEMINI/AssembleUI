import { createContext as e, forwardRef as t, useCallback as n, useContext as r, useEffect as i, useState as a } from "react";
import { jsx as o } from "react/jsx-runtime";
//#region packages/react/core/contexts/ThemeContext.tsx
var s = e(void 0);
//#endregion
//#region packages/react/core/hooks/useTheme/useTheme.ts
function c() {
	let e = r(s);
	if (e === void 0) throw Error("useTheme must be used within a ThemeProvider");
	return e;
}
//#endregion
//#region packages/react/core/hooks/useDisclosure/useDisclosure.ts
function l({ defaultIsOpen: e = !1 } = {}) {
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
function u(e) {
	return typeof window > "u" || typeof window.matchMedia != "function" ? !1 : window.matchMedia(e).matches;
}
function d(e) {
	let [t, n] = a(() => u(e));
	return i(() => {
		if (typeof window.matchMedia != "function") return;
		let t = window.matchMedia(e), r = (e) => n(e.matches);
		return n(t.matches), t.addEventListener("change", r), () => t.removeEventListener("change", r);
	}, [e]), t;
}
//#endregion
//#region packages/react/core/utils/classNames/classNames.ts
function f(...e) {
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
function p(...e) {
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
var m = 0;
function h(e) {
	return m += 1, e ? `${e}-${m}` : `aui-${m}`;
}
function g() {
	m = 0;
}
//#endregion
//#region packages/react/core/providers/ThemeProvider.tsx
function _({ children: e, defaultTheme: t = "light" }) {
	let [n, r] = a(t);
	return /* @__PURE__ */ o(s.Provider, {
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
var v = t(({ variant: e = "primary", size: t = "md", loading: n = !1, disabled: r = !1, className: i, children: a, type: s = "button", ...c }, l) => {
	let u = r || n;
	return /* @__PURE__ */ o("button", {
		...c,
		ref: l,
		type: s,
		className: f("aui-button", `aui-button--${e}`, `aui-button--${t}`, n && "aui-button--loading", i),
		disabled: u,
		"aria-busy": n || void 0,
		children: a
	});
});
v.displayName = "Button";
//#endregion
export { v as Button, s as ThemeContext, _ as ThemeProvider, f as classNames, h as generateId, p as mergeRefs, g as resetGenerateId, l as useDisclosure, d as useMediaQuery, c as useTheme };
