"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePageLeave = void 0;
var react_1 = require("react");
var usePageLeave = function (onPageLeave) {
    (0, react_1.useEffect)(function () {
        document.documentElement.addEventListener('mouseleave', onPageLeave);
        return function () { return document.documentElement.removeEventListener('mouseleave', onPageLeave); };
    }, []);
};
exports.usePageLeave = usePageLeave;
//# sourceMappingURL=usePageLeave.js.map