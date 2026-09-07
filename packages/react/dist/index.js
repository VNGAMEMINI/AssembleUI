import { createContext as e, useCallback as t, useContext as n, useEffect as r, useState as i } from "react";
import { jsx as a } from "react/jsx-runtime";
//#region packages/react/core/contexts/ThemeContext.tsx
var o = e(void 0);
//#endregion
//#region packages/react/core/hooks/useTheme/useTheme.ts
function s() {
	let e = n(o);
	if (e === void 0) throw Error("useTheme must be used within a ThemeProvider");
	return e;
}
//#endregion
//#region packages/react/core/hooks/useDisclosure/useDisclosure.ts
function c({ defaultIsOpen: e = !1 } = {}) {
	let [n, r] = i(e);
	return {
		isOpen: n,
		onOpen: t(() => r(!0), []),
		onClose: t(() => r(!1), []),
		onToggle: t(() => r((e) => !e), [])
	};
}
//#endregion
//#region packages/react/core/hooks/useMediaQuery/useMediaQuery.ts
function l(e) {
	return typeof window > "u" || typeof window.matchMedia != "function" ? !1 : window.matchMedia(e).matches;
}
function u(e) {
	let [t, n] = i(() => l(e));
	return r(() => {
		if (typeof window.matchMedia != "function") return;
		let t = window.matchMedia(e), r = (e) => n(e.matches);
		return n(t.matches), t.addEventListener("change", r), () => t.removeEventListener("change", r);
	}, [e]), t;
}
//#endregion
//#region packages/react/core/utils/classNames/classNames.ts
function d(...e) {
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
function f(...e) {
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
var p = 0;
function m(e) {
	return p += 1, e ? `${e}-${p}` : `aui-${p}`;
}
function h() {
	p = 0;
}
//#endregion
//#region packages/react/core/providers/ThemeProvider.tsx
function g({ children: e, defaultTheme: t = "light" }) {
	let [n, r] = i(t);
	return /* @__PURE__ */ a(o.Provider, {
		value: {
			theme: n,
			setTheme: r
		},
		children: /* @__PURE__ */ a("div", {
			"data-aui-theme": n,
			children: e
		})
	});
}
//#endregion
//#region packages/react/components/forms/Button/Button.tsx
function _({ variant: e = "primary", size: t = "medium", className: n, children: r, disabled: i, ...o }) {
	let s = [
		"aui-button",
		`aui-button--${e}`,
		`aui-button--${t}`,
		n
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ a("button", {
		...o,
		className: s,
		disabled: i,
		children: r
	});
}
//#endregion
export { _ as Button, o as ThemeContext, g as ThemeProvider, d as classNames, m as generateId, f as mergeRefs, h as resetGenerateId, c as useDisclosure, u as useMediaQuery, s as useTheme };
