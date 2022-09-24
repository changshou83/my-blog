# Material

- 材质被用于将颜色放置在物体的每一个可见像素上
- 其算法由着色器规定，我们可以使用一些内置的材质

## Type

- `new THREE.MeshBasicMaterial()`
	- 一个以简单着色（平面或线框）方式来绘制几何体的材质
	- 不受光照的影响
- `new THREE.MeshNormalMaterial()`
	- 法线网格材质，一种把法向量映射到RGB颜色的材质
- `new THREE.MeshMatcapMaterial()`
	- 由一个材质捕捉（MatCap，或光照球（Lit Sphere））纹理所定义，其编码了材质的颜色与明暗
	- where find：[github](https://github.com/nidorx/matcaps)
- `new THREE.MeshDepthMaterial()`
	- 一种按深度绘制几何体的材质。深度基于相机远近平面
	- 白色最近，黑色最远
- `new THREE.MeshLambertMaterial()`：
	- 使用基于非物理的[Lambertian](https://en.wikipedia.org/wiki/Lambertian_reflectance)模型来计算反射率
	- 可以很好地模拟一些表面（例如未经处理的木材或石材），但不能模拟具有镜面高光的光泽表面（例如涂漆木材）
- `new THREE.MeshPhongMaterial()`
	- 该材质使用非物理的[Blinn-Phong](https://en.wikipedia.org/wiki/Blinn-Phong_shading_model)模型来计算反射率
	- 与Lambertian模型不同，其可以模拟具有镜面高光的光泽表面，但因为要计算阴影，所以性能相较Lambert有所损失
- `new THREE.MeshToonMaterial()`
	- 一种实现卡通阴影的材质
- `new THREE.MeshStandardMaterial()`
	- 一种基于物理的标准材质
	- 使用与Phong相同的着色模型
	- 请注意，为获得最佳效果，您在使用此材质时应始终指定environment map。

## Use

- `new THREE.Mesh(new THREE.SphereGeometry(...), new THREE.MeshBasicMaterial())`：使用物体和材质创建一个网格，然后加入到场景中

## Properties

### Common

- Texture
	- `map`：颜色贴图
	- `aoMap`：该纹理的红色通道用作环境遮挡贴图
	- `roughnessMap`：该纹理的绿色通道用于改变材质的粗糙度
	- `metalnessMap`：该纹理的蓝色通道用于改变材质的金属度。
	- `lightMap`：光照贴图
	- `envMap`：环境贴图
	- `specularMap`：高光贴图
	- `alphaMap`：一张灰度纹理，用于控制整个表面的不透明度
	- `displacementMap`：位移贴图会影响网格顶点的位置
		- 移位的顶点可以投射阴影，阻挡其他对象， 以及充当真实的几何体
		- 位移纹理：网格的所有顶点被映射为图像中每个像素的值（白色是最高的），并且被重定位
	- `emissiveMap`：设置放射（发光）贴图
- Float
	- `aoMapInternsity`：环境遮挡效果的强度
	- `lightMapIntensity `：烘焙光的强度
	- `roughness`：材质的粗糙程度。
		- 0.0表示平滑的镜面反射，1.0表示完全漫反射。
		- 默认值为1.0。如果还提供roughnessMap，则两个值相乘
	- `metalness`：材质与金属的相似度
	- `opacity`：在0.0 - 1.0的范围内的浮点数，表明材质的透明度
	- `displacementScale`：位移贴图对网格的影响程度
		- 黑色是无位移，白色是最大位移
- Boolean
	- `wireframe`：将几何体渲染为线框
	- `needsUpdate`：指定需要重新编译材质
	- `transparent`：定义此材质是否透明
	- `flatShading`：定义材质是否使用平面着色进行渲染
- Material Constants
	- `color.set(<colorValue>)`：材质的颜色
	- `side = THREE.<DoubleSide/...>`：定义将要渲染哪一面 - 正面，背面或两者
	- `emissive`：材质的放射（光）颜色






### Environment Map

- [HDRI - Poly Haven](https://polyhaven.com/hdris)
- [HDRI-to-CubeMap](https://matheowis.github.io/HDRI-to-CubeMap/)