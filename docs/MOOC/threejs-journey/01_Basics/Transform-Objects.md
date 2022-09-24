# Transform Objects

- 更改物体的属性使物体发生变化

## Content

- `mesh.position.[x/y/z]`：位置
- `mesh.position.distanceTo(Vector3)`：计算出网格与某点的距离
- `mesh.scale.[x/y/z]`：缩放
- `mesh.rotation.[x/y/z]`：旋转
- `mesh.rotation.reorder(string)`：更改坐标系

## Group

- 可以通过组控制多个物体

```js
const group = new THREE.Group();

const redMesh = new THREE.Mesh(
	new THREE.BoxBufferGeometry(1,1,1),
	new THREE.MeshBasicMateral({ color: 'red' })
);
group.add(redMesh);

const blueMesh = new THREE.Mesh(
	new THREE.BoxBufferGeometry(1,1,1),
	new THREE.MeshBasicMateral({ color: 'blue' })
);
group.add(blueMesh);

scene.add(group);
```

## Other

- `camera.lookAt(Position)`：让摄像头注视某个地方
