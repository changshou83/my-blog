# Vite

- 新建一个JS工程
- 将内容添加到index.html和main.js当中

## Index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>04 - Vite</title>
</head>
<body>
    <canvas class="webgl"></canvas>
    <script type="module" src="/main.js"></script>
</body>
</html>
```

## Main.js

```js
import './style.css'
import * as THREE from 'three';

const scene = new THREE.Scene();

// Red cube
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({ color: '#ff0000' });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Size
const size = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 1000);
// 将摄像机稍微向外移动一些以避免物体和摄像机重叠
camera.position.z = 3;
  
// Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);
  
renderer.render(scene, camera);
```