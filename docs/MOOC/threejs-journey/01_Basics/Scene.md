# Scene

- 场景能够让你在什么地方、摆放什么东西来交给three.js来渲染
- 这是你放置物体、灯光和摄像机的地方

## Create

```js
const scene = new THREE.Scene();
```

## Add

```js
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
scene.add(camera);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const light = new THREE.PointLight(0xff0000, 1, 100);
light.position.set(50, 50, 50);
scene.add(light);
```

## Render

```js
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}
animate();
```
