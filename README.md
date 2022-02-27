# bee-hooks 🐝

bee-hooks help you create UI in React quickly and easily.  
Currently studying and developing slowly.  
Let me know if you have any interesting features!  


## useFullscreen

### normal mode
```typescript

const { toggle, isFullscreen } = useFullscreen();

<span>Normal Fullscreen mode.</span>
<Button onClick={toggle}>{isFullscreen ? 'set normal mode' : 'set fullscreen mode'}</Button>


```


### ref fullscreen mode
```typescript

const { fullscreenRef, toggle, isFullscreen } = useFullscreen();

<div ref={fullscreenRef}>
  🐝
</div>
<span>If you don't use fullscreenRef, the entire screen will be fullscreen.</span>
<Button onClick={toggle}>{isFullscreen ? 'set normal mode' : 'set ref fullscreen mode'}</Button>

```


## usePageLeave

