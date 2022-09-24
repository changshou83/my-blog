# Shadows

- 阴影
- 课程中讲的生成阴影的方法
	- 使用threejs灯光自带的阴影
	- 使用带阴影的图片作为贴图
- 支持阴影的灯光
	- 点光源：阴影相机是一个透视摄像机
	- 平行光：阴影相机是一个正交摄像机
	- 聚光灯：阴影相机是一个透视摄像机

## 如何开启光源自带的阴影

1. `renderer.shadowMap.enabled = true`
2. `light.castShadow = true`
3. `mesh.castShadow = true`
4. `receivedShadowMesh.receiveShadow = true`

### 优化阴影

- mipmapping
	- `Light.shadow.mapSize.width = 1024;`
	- `Light.shadow.mapSize.height = 1024;`
- `Light.shadow.camera.near = 1;Light.shadow.camera.far = 6;`
- 阴影算法：`renderer.shadowMap.type`
	- BasicShadowMap
		- 提供未经过滤的阴影图
		- **最快，但质量最低**。
	- PCFShadowMap
		- 使用百分比接近过滤（PCF）算法过滤阴影图
		- 默认
	- PCFSoftShadowMap
		- 使用百分比接近过滤（PCF）算法过滤阴影图
		- 是在使用低分辨率的阴影图时，具有更好的软阴影
	- VSMShadowMap
		- 使用Variance Shadow Map（VSM）算法过滤阴影图
		- 当使用VSMShadowMap时，所有的阴影接收器都会产生阴影

## 如何使用自带阴影的图片作为阴影

- baking shadow

```js
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
scene.add(camera);

// 加载纹理
const textureLoader = new THREE.TextureLoader();
const bakedShadow = textureLoader.load('...')

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.shadowMap.enabled = false;

const mesh =new THREE.Mesh(
	new THREE.SphereGeometry(0.5, 32, 32),
	new THREE.MeshStandardMaterial()
);
// 使用纹理作为阴影
const meshShadow = new THREE.Mesh(
	new THREE.BoxGeometry(1,1),
	new THREE.MeshBasicMaterial({
		color: '#000',
		transparent: true,
		alphaMap: bakedShadow
	});
);
scene.add(mesh, meshShadow)

const clock = new THREE.Clock();
const animate = () => {
	const elapsedTime = clock.getElapsedTime();

	// Update Objects
	mesh.position.x = Math.cos(elapsedTime) * 1.5;
	mesh.position.z = Math.sin(elapsedTime) * 1.5;
	mesh.position.x = Math.abs(Math.sin(elapsedTime * 3));

	// Update Shadow
	meshShadow.position.x = mesh.position.x;
	meshShadow.position.z = mesh.position.z;
	meshShadow.position.y = (1 - Math.abs(mesh.position.y)) * 0.3;

	// render
	renderer.render(scene, camera);

	window.requestAnimationFrame(animate);
}
animate();
```

## 如何选择

- 看情况
- 尽可能少使用动态阴影
