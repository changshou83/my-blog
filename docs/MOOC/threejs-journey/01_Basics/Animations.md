# Animations

- 利用`window.requestAnimationFrame()`这个API来为每一帧添加动画
- 利用现成的动画库：[gsap - github](https://github.com/greensock/GSAP)

## Example

### RequestAnimationFrame
```js
/**
 * Clock
 */
const clock = new THREE.Clock();

/**
 * Animation
 */
const animate = () => {
	requestAnimationFrame(animate);
	
	const elapsedTime = clock.getElapsedTime();

	// Update Objects
	// ...

	// Update Cameras
	// ...

	// Update Lights
	// ...

	// Update Controls
	// ...

	// Re-render
	renderer.render(scene, camera);
};

animate();
```

### GSAP

```js
import gsap from 'gsap';

gsap.to(mesh.position, {
	duration: 1,
	delay: 1,
	x: 1
});

const animate = () => {
	requestAnimationFrame(animate);

	// Re-render
	renderer.render(scene, camera);
};

animate();
```
