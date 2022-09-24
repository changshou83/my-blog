# FullScreen

- 双击全屏操作的处理
- 思路
	- 监听`dblclick`事件
	- 获取全屏元素(`document.fullscreenElement`)
	- 如果已存在，则调用`document.exitFullScreen()`方法退出全屏
	- 否则，调用要进行全屏的元素的`requestFullscreen()`方法使其全屏

## CSS

```css
* {
  margin: 0;
  padding: 0;
}
  
html,
body {
  // 为了防止向下滑动时展露白色背景
  overflow: hidden;
}
  
.webgl {
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
}
```

## JavaScript

```js
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('dblclick', () => {
  // 兼容处理比较麻烦
  const fullscreenElement = document.fullscreenElement || document.webkitFullScreenElement;
  
  if(!fullscreenElement) {
    if(canvas.requestFullscreen)
      canvas.requestFullscreen();
    else if(canvas.webkitRequestFullScreen)
      canvas.webkitRequestFullScreen();
  } else {
    if(document.exitFullscreen)
      document.exitFullscreen();
    else if(document.webkitExitFullScreen)
      document.webkitExitFullScreen();
  }
})
```

# Resizing

- 更改浏览器窗口大小时的处理

```js
window.addEventListener('resize', () => {
	// Update Size
	size.width = window.innerWidth;
	size.height = window.innerHeight;
	
    // Update Camera
    // 摄像机视锥体的长宽比
	camera.aspect = size.width / size.height;
	// 更新摄像机投影矩阵。在任何参数被改变以后必须被调用。
	camera.updateProjectionMatrix();

    // Update Renderer
    renderer.setSize(size.width, size.height);
})
```
