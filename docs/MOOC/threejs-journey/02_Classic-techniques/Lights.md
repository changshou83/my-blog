# Lights

- 各种光源

## Type

### AmbientLight

- 环境光
	- 会均匀的照亮场景中的所有物体
	- 不能用来投射阴影，因为它没有方向
- 参数列表
	- color - (参数可选）颜色的rgb数值。缺省值为 0xffffff。  
	- intensity - (参数可选)光照的强度。缺省值为 1。

### DirectionalLight

- 平行光
	- 沿着特定方向发射的光，可以投射阴影
	- 常常用平行光来模拟太阳光 的效果; 太阳足够远，因此我们可以认为太阳的位置是无限远
	- 是目标平行光，而不是自由平行光
- 参数列表：color,intensity

### HemisphereLight

- 半球光
	- 不能投射阴影
	- 直接放置于场景之上，光照颜色从天空光线颜色渐变到地面光线颜色
- 参数列表
	- skyColor - (可选参数) 天空中发出光线的颜色。 缺省值 0xffffff。  
	- groundColor - (可选参数) 地面发出光线的颜色。 缺省值 0xffffff。  
	- intensity - (可选参数) 光照强度。 缺省值 1。

### PointLight

- 点光源
	- 可以投射阴影
	- 从一个点向各个方向发射的光源
	- 一个常见的例子是模拟一个灯泡发出的光
- 参数列表
	- color - (可选参数)) 十六进制光照颜色。 缺省值 0xffffff (白色)。  
	- intensity - (可选参数) 光照强度。 缺省值 1。  
	- distance - 这个距离表示从光源到光照强度为0的位置。 当设置为0时，光永远不会消失(距离无穷大)。缺省值 0.  
	- decay - 沿着光照距离的衰退量。缺省值 1。 在 physically correct 模式中，decay = 2。

### RectAreaLight

- 平面光
	- 从一个矩形平面上均匀地发射光线
	- 可以用来模拟像明亮的窗户或者条状灯光光源
	- 注意事项
		- 不支持阴影。
		- 只支持 MeshStandardMaterial 和 MeshPhysicalMaterial 两种材质。
		- 你必须在你的场景中加入 [RectAreaLightUniformsLib](https://threejs.org/examples/jsm/lights/RectAreaLightUniformsLib.js) ，并调用**init()**。
- 参数列表
	- color - (可选参数) 十六进制数字表示的光照颜色。缺省值为 0xffffff (白色)  
	- intensity - (可选参数) 光源强度／亮度 。缺省值为 1。  
	- width - (可选参数) 光源宽度。缺省值为 10。  
	- height - (可选参数) 光源高度。缺省值为 10。

### SpotLight

- 聚光灯
	- 可以投射阴影
	- 从一个点沿一个方向射出，随着光线照射的变远，光线圆锥体的尺寸也逐渐增大
- 参数列表
	- color - (可选参数) 十六进制光照颜色。 缺省值 0xffffff (白色)。  
	- intensity - (可选参数) 光照强度。 缺省值 1。  
	- distance - 从光源发出光的最大距离，其强度根据光源的距离线性衰减。  
	- angle - 光线散射角度，最大为`Math.PI * 0.5`。  
	- penumbra - 聚光锥的半影衰减百分比。在0和1之间的值。默认为0。  
	- decay - 沿着光照距离的衰减量。

## Helper

- 辅助对象，帮助你看见光的位置

### DirectionalLightHelper

- 模拟平行光的辅助对象，其中包含了表示光位置的平面和表示光方向的线段
- 参数列表
	- light-- 被模拟的光源.  
	- size -- (可选的) 平面的尺寸. 默认为 **1**.  
	- color -- (可选的) 如果没有设置颜色将使用光源的颜色.

### HemisphereLightHelper

- 创建一个虚拟的球形网络来模拟半球形光源
- 参数列表
	- light-- 被模拟的光源.  
	- size -- 用于模拟光源的网格尺寸  
	- color -- (可选的) 如果没有设置颜色将使用光源的颜色.

### PointLightHelper

- 创建一个虚拟的球形网络来模拟点光源
- 参数列表
	- light-- 被模拟的光源.  
	- size -- (可选的) 球形辅助对象的尺寸. 默认为 **1**.  
	- color -- (可选的) 如果没有设置颜色将使用光源的颜色.

### SpotLightHelper

- 创建一个虚拟的锥形网络来模拟聚光灯
- 参数列表
	- light-- 被模拟的光源.  
	- color -- (可选的) 如果没有设置颜色将使用光源的颜色.

## LightProbe

- 光照探针
- 另一种在3D场景中添加光源的方法
- 光照探针不发光。光照探针存储着有关穿过3D空间的光线的信息。渲染过程中，通过使用来自光照探针的数据，来逼近打到3D物体上的光线。
- type
	- LightProbe
	- AmbientLightProbe
	- HemisphereLightProbe

## Performence

- 尽可能少使用灯光
- 尽量使用轻量的灯光
	- Minimal
		- AmbientLight(环境光，无阴影)
		- HemisphereLight(氛围灯，无阴影)
	- Moderate
		- DirectionalLight(平行光，有阴影)
		- PointLight(点光源，有阴影)
	- High
		- SpotLight(聚光灯，有阴影)
		- RectAeraLight(矩形光，有阴影)
- 可以使用自带阴影的纹理来代替灯光