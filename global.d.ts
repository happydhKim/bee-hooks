export {}

declare global {
  interface FullscreenElementTypes extends Document {
    mozFullScreenElement?: Element;
    msFullscreenElement?: Element;
    webkitFullscreenElement?: Element;
    mozCancelFullScreen?: () => void;
    msExitFullscreen?: () => void;
    webkitExitFullscreen?: () => void;
  }
  
  interface FullscreenFunctionTypes {
    requestFullscreen?: () => void;
    mozRequestFullScreen?: () => void;
    msRequestFullscreen?: () => void;
    webkitRequestFullscreen?: () => void;
  }
}