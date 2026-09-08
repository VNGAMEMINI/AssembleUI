import { a as e, i as t, n, r, t as i } from "./components-sMIJ4MFx.js";
import "./patterns/index.js";
import "./templates/index.js";
import { createContext as a, useCallback as o, useContext as s, useEffect as c, useState as l } from "react";
import { jsx as u } from "react/jsx-runtime";
//#region packages/react/core/contexts/ThemeContext.tsx
var d = a(void 0);
//#endregion
//#region packages/react/core/hooks/useTheme/useTheme.ts
function f() {
	let e = s(d);
	if (e === void 0) throw Error("useTheme must be used within a ThemeProvider");
	return e;
}
//#endregion
//#region packages/react/core/hooks/useDisclosure/useDisclosure.ts
function p({ defaultIsOpen: e = !1 } = {}) {
	let [t, n] = l(e);
	return {
		isOpen: t,
		onOpen: o(() => n(!0), []),
		onClose: o(() => n(!1), []),
		onToggle: o(() => n((e) => !e), [])
	};
}
//#endregion
//#region packages/react/core/hooks/useMediaQuery/useMediaQuery.ts
function m(e) {
	return typeof window > "u" || typeof window.matchMedia != "function" ? !1 : window.matchMedia(e).matches;
}
function h(e) {
	let [t, n] = l(() => m(e));
	return c(() => {
		if (typeof window.matchMedia != "function") return;
		let t = window.matchMedia(e), r = (e) => n(e.matches);
		return n(t.matches), t.addEventListener("change", r), () => t.removeEventListener("change", r);
	}, [e]), t;
}
//#endregion
//#region packages/react/core/utils/mergeRefs/mergeRefs.ts
function g(...e) {
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
//#region packages/react/core/providers/ThemeProvider.tsx
function _({ children: e, defaultTheme: t = "light" }) {
	let [n, r] = l(t);
	return /* @__PURE__ */ u(d.Provider, {
		value: {
			theme: n,
			setTheme: r
		},
		children: /* @__PURE__ */ u("div", {
			"data-aui-theme": n,
			children: e
		})
	});
}
//#endregion
export { n as Button, i as Input, d as ThemeContext, _ as ThemeProvider, e as classNames, r as generateId, g as mergeRefs, t as resetGenerateId, p as useDisclosure, h as useMediaQuery, f as useTheme };
