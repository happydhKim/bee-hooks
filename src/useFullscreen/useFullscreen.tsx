import { useCallback, useEffect, useRef, useState } from 'react';

const getFullscreenElement = (): Element | undefined => {
  const elementType: FullscreenElementTypes = window.document;
  const fullscreenElement =
    elementType.fullscreenElement ||
    elementType.mozFullScreenElement ||
    elementType.msFullscreenElement ||
    elementType.webkitFullscreenElement;

  return fullscreenElement;
};

const deactivateFullscreen = () => {
  const elementType: FullscreenElementTypes = window.document;
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

const activateFullScreen = (element: HTMLElement | undefined) => {
  const functionType: FullscreenFunctionTypes  = element;
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

const BROWSERS = ['', 'moz', 'ms', 'webkit'];

const handleEventListener = (
  element: HTMLElement,
  { onFullScreen, onError }: { onFullScreen: (event: Event) => void; onError: (event: Event) => void }
) => {
  BROWSERS.forEach((browser) => {
    element.addEventListener(`${browser}fullscreenchange`, onFullScreen);
    element.addEventListener(`${browser}fullscreenerror`, onError);
  });

  return () => {
    BROWSERS.forEach((browser) => {
      element.removeEventListener(`${browser}fullscreenchange`, onFullScreen);
      element.removeEventListener(`${browser}fullscreenerror`, onError);
    });
  };
};

export const useFullscreen = () => {
  const ref = useRef<HTMLElement>();
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const handleFullscreenChange = useCallback(
    (event: Event) => {
      setIsFullscreen(event.target === getFullscreenElement());
    },
    [setIsFullscreen]
  );

  const handleFullscreenError = useCallback(
    (event: Event) => {
      setIsFullscreen(false);
      console.error(`Full Screen Error: ${event}`);
    },
    [setIsFullscreen]
  );

  const fullscreenRef = useCallback((element) => {
    ref.current = element === null ? window.document.documentElement : element;
  }, []);

  const toggle = useCallback(() => {
    getFullscreenElement() ? deactivateFullscreen() : activateFullScreen(ref.current);
  }, []);

  useEffect(() => {
    if (!ref.current) {
      ref.current = window.document.documentElement;

      return handleEventListener(ref.current, {
        onFullScreen: handleFullscreenChange,
        onError: handleFullscreenError,
      });
    }
  }, []);

  return { fullscreenRef, toggle, isFullscreen };
};
