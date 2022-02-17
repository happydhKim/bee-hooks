"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFullscreen = void 0;
var react_1 = require("react");
var getFullscreenElement = function () {
    var elementType = window.document;
    var fullscreenElement = elementType.fullscreenElement ||
        elementType.mozFullScreenElement ||
        elementType.msFullscreenElement ||
        elementType.webkitFullscreenElement;
    return fullscreenElement;
};
var deactivateFullscreen = function () {
    var elementType = window.document;
    if (typeof elementType.exitFullscreen === 'function') {
        return elementType.exitFullscreen();
    }
    if (typeof elementType.mozCancelFullScreen === 'function') {
        return elementType.mozCancelFullScreen();
    }
    if (typeof elementType.msExitFullscreen === 'function') {
        return elementType.msExitFullscreen();
    }
    if (typeof elementType.webkitExitFullscreen === 'function') {
        return elementType.webkitExitFullscreen();
    }
    return null;
};
var activateFullScreen = function (element) {
    var functionType = element;
    if (typeof functionType.requestFullscreen === 'function') {
        return functionType.requestFullscreen();
    }
    if (typeof functionType.msRequestFullscreen === 'function') {
        return functionType.msRequestFullscreen();
    }
    if (typeof functionType.webkitRequestFullscreen === 'function') {
        return functionType.webkitRequestFullscreen();
    }
    if (typeof functionType.mozRequestFullScreen === 'function') {
        return functionType.mozRequestFullScreen();
    }
    return null;
};
var BROWSERS = ['', 'moz', 'ms', 'webkit'];
var handleEventListener = function (element, _a) {
    var onFullScreen = _a.onFullScreen, onError = _a.onError;
    BROWSERS.forEach(function (browser) {
        element.addEventListener("".concat(browser, "fullscreenchange"), onFullScreen);
        element.addEventListener("".concat(browser, "fullscreenerror"), onError);
    });
    return function () {
        BROWSERS.forEach(function (browser) {
            element.removeEventListener("".concat(browser, "fullscreenchange"), onFullScreen);
            element.removeEventListener("".concat(browser, "fullscreenerror"), onError);
        });
    };
};
var useFullscreen = function () {
    var ref = (0, react_1.useRef)();
    var _a = (0, react_1.useState)(false), isFullscreen = _a[0], setIsFullscreen = _a[1];
    var handleFullscreenChange = (0, react_1.useCallback)(function (event) {
        setIsFullscreen(event.target === getFullscreenElement());
    }, [setIsFullscreen]);
    var handleFullscreenError = (0, react_1.useCallback)(function (event) {
        setIsFullscreen(false);
        console.error("Full Screen Error: ".concat(event));
    }, [setIsFullscreen]);
    var fullscreenRef = (0, react_1.useCallback)(function (element) {
        ref.current = element === null ? window.document.documentElement : element;
    }, []);
    var toggle = (0, react_1.useCallback)(function () {
        getFullscreenElement() ? deactivateFullscreen() : activateFullScreen(ref.current);
    }, []);
    (0, react_1.useEffect)(function () {
        if (!ref.current) {
            ref.current = window.document.documentElement;
            return handleEventListener(ref.current, {
                onFullScreen: handleFullscreenChange,
                onError: handleFullscreenError,
            });
        }
    }, []);
    return { fullscreenRef: fullscreenRef, toggle: toggle, isFullscreen: isFullscreen };
};
exports.useFullscreen = useFullscreen;
//# sourceMappingURL=useFullscreen.js.map