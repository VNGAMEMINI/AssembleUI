import { a as e, c as t, i as n, l as r, n as i, o as a, r as o, s, t as c } from "./components-CmIboB-d.js";
import "./patterns/index.js";
import "./templates/index.js";
import { createContext as l, useCallback as u, useContext as d, useEffect as f, useState as p } from "react";
import { jsx as m } from "react/jsx-runtime";
//#region packages/react/core/contexts/ThemeContext.tsx
var h = l(void 0);
//#endregion
//#region packages/react/core/hooks/useTheme/useTheme.ts
function g() {
	let e = d(h);
	if (e === void 0) throw Error("useTheme must be used within a ThemeProvider");
	return e;
}
//#endregion
//#region packages/react/core/hooks/useDisclosure/useDisclosure.ts
function _({ defaultIsOpen: e = !1 } = {}) {
	let [t, n] = p(e);
	return {
		isOpen: t,
		onOpen: u(() => n(!0), []),
		onClose: u(() => n(!1), []),
		onToggle: u(() => n((e) => !e), [])
	};
}
//#endregion
//#region packages/react/core/hooks/useMediaQuery/useMediaQuery.ts
function v(e) {
	return typeof window > "u" || typeof window.matchMedia != "function" ? !1 : window.matchMedia(e).matches;
}
function y(e) {
	let [t, n] = p(() => v(e));
	return f(() => {
		if (typeof window.matchMedia != "function") return;
		let t = window.matchMedia(e), r = (e) => n(e.matches);
		return n(t.matches), t.addEventListener("change", r), () => t.removeEventListener("change", r);
	}, [e]), t;
}
//#endregion
//#region packages/react/core/utils/mergeRefs/mergeRefs.ts
function b(...e) {
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
function x({ children: e, defaultTheme: t = "light" }) {
	let [n, r] = p(t);
	return /* @__PURE__ */ m(h.Provider, {
		value: {
			theme: n,
			setTheme: r
		},
		children: /* @__PURE__ */ m("div", {
			"data-aui-theme": n,
			children: e
		})
	});
}
//#endregion
export { a as Button, n as Checkbox, e as Input, o as Radio, i as Select, c as Textarea, h as ThemeContext, x as ThemeProvider, r as classNames, s as generateId, b as mergeRefs, t as resetGenerateId, _ as useDisclosure, y as useMediaQuery, g as useTheme };
