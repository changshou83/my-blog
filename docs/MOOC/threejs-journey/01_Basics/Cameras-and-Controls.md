# Cameras

- 摄像机

## OrthographicCamera

- 正交摄像机，使用正交投影进行投影
- 在这种投影模式下，无论物体距离相机距离远或者近，在最终渲染的图片中物体的大小都保持不变
- 这对于渲染2D场景或者UI元素是非常有用的

### Example

```js
const size = {
	width: window.innerWidth,
	heigth: window.innerHeight
}
const aspect = size.width / size.height;
/**
 * 视锥体的四个侧面
 *   left : Number, right : Number, top : Number, bottom : Number
 * 视锥体的近远端面
 *   near : Number, far : Number
 */
const camera = new THREE.OrthographicCamera(
	-1 * aspect,
    1 * aspect,
	-1,
	1,
	0.1,
	100
);
scene.add( camera );
```

## PerspectiveCamera

- 透视摄像机，使用透视投影进行投影
- 被用来模拟人眼所看到的景象
- 是3D场景的渲染中使用得最普遍的投影模式

### Example

```js
const size = {
	width: window.innerWidth,
	heigth: window.innerHeight
}
const aspect = size.width / size.height;
/**
 * 视锥体垂直视野角度
 *   FOV : Number
 * 视锥体长宽比
 *   aspect : Number
 * 视锥体近远端面
 *   near : Number, far : Number
 */
const camera = new THREE.PerspectiveCamera(45, aspect, 1, 1000);
scene.add( camera );
```

## Other

### StereoCamera

- 双透视摄像机（立体相机）
- 常被用于创建[3D Anaglyph](https://en.wikipedia.org/wiki/Anaglyph_3D)（3D立体影像） 或者[Parallax Barrier](https://en.wikipedia.org/wiki/parallax_barrier)（视差屏障）
- 类似3D电影的效果

### ArrayCamera

- 用于更加高效地使用一组已经预定义的摄像机来渲染一个场景
- 能够更好地提升VR场景的渲染性能

### CubeCamera

- 创建6个渲染到 `WebGLCubeRenderTarget` 的摄像机

# Controls

- 处理交互

## OrbitControls

- 轨道控制器
- 可以使得相机围绕目标进行轨道运动

### Example

```js
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );

const controls = new OrbitControls( camera, renderer.domElement );

//  controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 0, 20, 100 );
controls.update();

function animate() {
  requestAnimationFrame( animate );

  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update(); 

  renderer.render( scene, camera );
}
```

## DragControls

- 被用于提供一个拖放交互

### Example

```js
const controls = new DragControls( objects, camera, renderer.domElement );

// add event listener to highlight dragged objects
controls.addEventListener( 'dragstart', event => event.object.material.emissive.set( 0xaaaaaa )); controls.addEventListener( 'dragend', event => event.object.material.emissive.set( 0x000000 ));
```

## Other

### TrackballControls

- 与 OrbitControls 相类似
- 然而，它不能恒定保持摄像机的up向量。这意味着，如果摄像机绕过“北极”和“南极”，则不会翻转以保持“右侧朝上”

### PointerLockControls

- 基于[Pointer Lock API](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API)实现
- 对于第一人称3D游戏来说是一个非常完美的选择

### FlyControls

-启用了一种类似于数字内容创建工具（例如Blender）中飞行模式的导航方式

### FirstPersonControls

- FlyControls 的另一个实现。

### TransformControls

- 可提供一种类似于在数字内容创建工具（例如Blender）中对模型进行交互的方式, 来在3D空间中变换物体
- 和其他控制器不同的是，变换控制器不倾向于对场景摄像机的变换进行改变
- TransformControls 期望其所附加的3D对象是场景图的一部分
