import { a as e, c as t, d as n, i as r, l as i, n as a, o, r as s, s as c, t as l, u } from "./components-CbxRx4qO.js";
import "./patterns/index.js";
import "./templates/index.js";
import { createContext as d, useCallback as f, useContext as p, useEffect as m, useState as h } from "react";
import { jsx as g } from "react/jsx-runtime";
//#region packages/react/core/contexts/ThemeContext.tsx
var _ = d(void 0);
//#endregion
//#region packages/react/core/hooks/useTheme/useTheme.ts
function v() {
	let e = p(_);
	if (e === void 0) throw Error("useTheme must be used within a ThemeProvider");
	return e;
}
//#endregion
//#region packages/react/core/hooks/useDisclosure/useDisclosure.ts
function y({ defaultIsOpen: e = !1 } = {}) {
	let [t, n] = h(e);
	return {
		isOpen: t,
		onOpen: f(() => n(!0), []),
		onClose: f(() => n(!1), []),
		onToggle: f(() => n((e) => !e), [])
	};
}
//#endregion
//#region packages/react/core/hooks/useMediaQuery/useMediaQuery.ts
function b(e) {
	return typeof window > "u" || typeof window.matchMedia != "function" ? !1 : window.matchMedia(e).matches;
}
function x(e) {
	let [t, n] = h(() => b(e));
	return m(() => {
		if (typeof window.matchMedia != "function") return;
		let t = window.matchMedia(e), r = (e) => n(e.matches);
		return n(t.matches), t.addEventListener("change", r), () => t.removeEventListener("change", r);
	}, [e]), t;
}
//#endregion
//#region packages/react/core/utils/mergeRefs/mergeRefs.ts
function S(...e) {
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
function C({ children: e, defaultTheme: t = "light" }) {
	let [n, r] = h(t);
	return /* @__PURE__ */ g(_.Provider, {
		value: {
			theme: n,
			setTheme: r
		},
		children: /* @__PURE__ */ g("div", {
			"data-aui-theme": n,
			children: e
		})
	});
}
//#endregion
export { l as Badge, t as Button, o as Checkbox, c as Input, e as Radio, r as Select, a as Switch, s as Textarea, _ as ThemeContext, C as ThemeProvider, n as classNames, i as generateId, S as mergeRefs, u as resetGenerateId, y as useDisclosure, x as useMediaQuery, v as useTheme };
