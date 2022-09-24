# Textures

- 纹理是一组附着在物体表面的图片
- `UV Unwrapping`：纹理覆盖在物体上的方式
	- 通过访问`geometry.attributes.uv`可以发现是一组float32Array，用来标识图片位置

## Create

- (可选)使用`LoadingManager()`来创建加载管理器管理多个加载器，使用其上的回调函数来处理事件
- 使用`TextureLoader(manager)`来创建加载器
- 使用`loader.load(url)`来加载图片创建纹理对象

## Use

- `new THREE.MeshBasicMaterial({ map: texture })`创建材料并将其map属性设置为纹理对象

## Transform

- `repeat`
	- `texture.repeat.x/y = <number>`：规定纹理在一个面上的重复几次
	- `texture.wrapS/wrapT = THREE.<MirroredRepeatedWrapping/...>`：规定纹理如何重复
- `offset`
	- `texture.offset.x/y = <number>`：规定纹理在一个面上的偏移距离
- `rotation`
	- `texture.rotation = <number>`：沿着中心点进行旋转的角度
- `center`
	- `texture.center.x/y = <number>`：规定中心的位置

## MipMapping(贴图)

- 最小化过滤器
	- 当纹理的大小大于要渲染的表面时如何渲染(缩小物体时)
	- `texture.minFilter = THREE.<NearestFilter(sharper)/LinearFilter(default)/...>`
	- `texture.generatemipmaps = true`：当设置为NearestFilter时建议将生成小版本贴图取消，性能优化
- 放大过滤器
	- 当纹理的大小小于要渲染的表面时如何渲染(放大物体时)
	- `texture.mapFilter = THREE.<NearestFilter(sharper)/LinearFilter(default)>`

## 3 Crucial elements

- `weight(权重)`
	- 提供一张图片的两种版本还是对一张图片进行两种处理
- `size`
	- 因为纹理都是要缓存在gpu内存中的，大小有限，为了gpu的性能，减少纹理的大小
	- `jpg`：有损压缩，更小更模糊
	- `png`：无损压缩，更清晰更大
- `data`
	- 使用png格式的图片可以获取更详细的数据
	- 因为MipMapping会对图片进行除二，如果不能除二就会对图片进行裁剪，这将消耗更多的时间，所以图片的宽高必须都是2的倍数
	- 可以通过不同的数据对一张只有三原色的纹理进行处理得到不同的结果

## Where find

- [poliigon.com](https://www.poliigon.com)
- [3dtextures.me](https://3dtextures.me)
- [arrowway-textures.ch](https://www.arrowway-textures.ch)
- [Substance3d Designer](https://www.adobe.com/cn/products/substance3d-designer.html)
