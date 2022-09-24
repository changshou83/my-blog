# 着色

## 着色

- 研究光线与材质如何作用就是着色
- 着色!=光影，只考虑光对物体本身的影响
- Blinn-Phong 反射模型
	- 着色点
		- 观测方向`v hat`
		- 法线`n hat`
		- 光照方向`l hat`
		- 表面参数(颜色，shininess)
	- 高光(镜面反射，`specular reflect`)
		- 半程向量离法向量越近，说明越接近镜面反射光
		- 半程向量：`h = bisector(v, l) = (v+l)/|v+l|`
		- 公式：`L_s = k_s(I/r^2)max(0,n·h)^p`
			- `p`用来控制高光的大小
	- 漫反射(`diffuse reflect`)
		- 光射到着色点上并向四面八方反射，效果与观察方向无关
		- 理论
			- Lambert余弦定理：`l hat`和`n hat`夹角决定光照强度，`L = cosθ = l hat * n hat`
			- 能量衰退定理：r处的能量强度：`I/r^2`
		- Lambert漫反射模型：`L_d=k_d(I/r^2)max(0,n·l)`
			- `L_d`：漫反射的光
			- `k_d`：漫反射系数
			- `I/r^2`：到达每个着色点上的能量
			- `max(0,n·l)`：每个着色点吸收的能量，`n`为法向量，`l`为入射光的单位向量
				- 漫反射的光只与入射角度相关
	- 环境光照(`Ambient light`)
		- **大胆简化，深入的需要涉及全局光照**
		- 公式：`L_a = k_aI_a`，与入射和反射光角度都没有关系，所以是一个常数
	- 总结
		- `L = L_a + L_d + L_s`
		- `  = k_aI_a + k_d(I/r^2)max(0,n·l) + k_s(I/r^2)max(0,n·h)^p`
- 着色频率
	- flat shading：shade each face
	- gouraud shading：shade each vertex
		- 相邻面法线的加权平均为顶点法线
	- phong shading：shade each pixel

## 图形(实时渲染)管线

- pipeline：
	- `application->[vertex processing]`
	- `-vertex stream->[triangle processing]`
	- `-triangle stream->[rasterization]`
	- `-fragment stream->[fragment processing]`
	- `-shaded fragment->[framebuffer operations]`
	- `->display`
- shader program
	- 对顶点和像素处理阶段进行编程
	- 描述在每个顶点或像素上都会执行的操作
	- glsl练习网站
		- [shadertoy](https://www.shadertoy.com/)
			- [教程](https://www.bilibili.com/video/BV1Xm4y1X7qU)
			- [iq大佬博客](https://iquilezles.org/articles/)
		- [glsl语法基础](https://blog.csdn.net/misol/article/details/7658949)

## 纹理映射

- 定义任意点的不同属性，让同一个光照模型下点的颜色不同
- 纹理
	- 将二维平面覆盖在三维物体的表面的过程
	- 纹理坐标uv
- 应用纹理
	- 利用目标点在三角形内的位置映射到二维上的位置来查询其在uv上的对应位置颜色
	- 然后使用获取到的颜色代替着色模型中的`k_d`来影响最终效果
- [三角形重心插值与透视校正插值](https://zhuanlan.zhihu.com/p/448575965)

### 纹理放大问题(Texture Magnification)

- 纹理过小：将一张低分辨率的纹理贴在一个高分辨率的屏幕上时，会出现查询到的uv坐标不是整数的问题，如何解决？
	- 最近邻插值(Nearest)：对坐标进行四舍五入查询相近坐标的颜色
	- 双线性插值(Bilinear Interpolation)：对邻近四个像素取两个方向上的线性插值得到平均值
	- Bicubic：对周围十六个进行线性插值得到平均值
- 纹理过大：如果纹理太大了就会出现走样问题，如何解决？
	- 为什么会出现走样现象？离相机越远的物体就会覆盖越多的texel，也就是说远处的物体在采取纹理时会出现重叠现象(采样率不够)，导致走样
	- 有什么问题
		- 视觉：走样，丢失信息
		- 性能：GPU不能完整读取所需texel，导致性能低效
	- 解决方案
		- MSAA：与光栅化抗锯齿一样进行超采样，但是费用高昂
		- Mipmap：实现范围查询

#### Mipmap
- 核心想法：离线预处理查询每个footprint对应区域里的颜色均值，在渲染前生成
- level
	- 因为一个场景中存在不同大小的footprint，需要为不同大小的footprint准备不同精度的mipmap，称为Level
		- 越高的level就代表了更大的footprint的区域查询
		- 称一个pixel覆盖不同数量的texel的现象为footprint
	- Level的层数：`log2n`
	- 存储量：`(4/3) = (1+1/4+1/16...)`
- 快但是不准且只能做近似正方形的查询
- 计算
	- 在屏幕空间中取当前像素点的右方和上方的两个相邻像素点(4个全取也可以)
	- 分别查询得到当前像素点与右方像素点和上方像素点对应在Texture space的坐标，计算出这3个点在Texture space的距离，二者取最大值`L`
	- 那么levelD就是这个距离的log2值 (`D = log2L`) 
	- 处理D
		- 四舍五入取得最近的那个level D
		- 利用D值在 向下和向上取整的两个不同level进行3线性插值
			- 三线性插值：在两个层(`D`,`D+1`)分别作双线性插值的基础上，再在层与层之间再做一次插值
- 局限性：只能预处理出正方形区域的均值，这导致远处过度模糊
	- 各向异性过滤（Ripmaps）
		- 允许对长条的区域进行范围查询，但是不能用于斜着的区域
		- 生成各向异性过滤的图的开销是原本的**三倍**
		- 各向异性的意思是，在不同的方向上它的表现各不相同
		- 各向异性的几X是压缩几倍，也就是从左上角往右下角多几层

### 纹理应用

- 环境光照(贴图)，`Environment Map`
	- 将环境光存储在一个贴图上
		- 问题：展开后的纹理会出现扭曲
	- 天空盒：`Cube Map`
		- 用六幅texture表示一个天空盒
		- 利用方向计算出与对应平面上的交点坐标，剔除平面所对应的一维，剩下来的两维坐标转换到(0,1)范围之内即为(u,v)坐标
- 凹凸贴图，`Bump Mapping`
	- texture除了记录颜色外还可以记录其他信息，比如与物体表面的相对高度
	- 对每个pixel做一个“扰动”，利用高度差重新计算法线(只是扰动法线方向，没有移动顶点)
		- ![图示](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fddddyx.oss-cn-beijing.aliyuncs.com%2Fimg%2F202207242042867.png&sign=7b03a2c8a51bfc8872d0afd784d20a498bfa10811477bb4a28d08f358e90146d)
	- 计算虚拟法线
		- 平面：![平面](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fddddyx.oss-cn-beijing.aliyuncs.com%2Fimg%2F202207242042868.png&sign=bf19d57d44bc285b15472970ee8d3631aa85e0bce4b6e14c551a425e4fa33739)
		- 3D：![3D](https://www.yuque.com/api/filetransfer/images?url=https%3A%2F%2Fddddyx.oss-cn-beijing.aliyuncs.com%2Fimg%2F202207242042869.png&sign=a0386e8bb159e156aab6e9b7394eb9aa0fd55ae7090d1d9abc91a57eec2b7000)
- 位移贴图，`Displacement Mapping`
	- 与Bump Mapping类似，但是与凹凸贴图不同，位移贴图真正移动了顶点
	- 可以从影子中看出区别
	- 代价：需要模型精度比纹理相等甚至更高
- 三维纹理
	- 定义空间中任意一点的纹理
	- 并没有真正生成纹理的图，而是定义一个三维空间的噪声函数经过各种处理，变成需要的样子
- 阴影纹理：阴影可以计算好，直接写在Texture里

#### 凹凸贴图和位移贴图的伪代码实现

```txt
// Bumping Mapping
Let n = normal = (x, y, z)
Vector t = (x*y/sqrt(x*x+z*z),sqrt(x*x+z*z),z*y/sqrt(x*x+z*z))
Vector b = n cross product t
Matrix TBN = [t b n]
dU = kh * kn * (h(u+1/w,v)-h(u,v))
dV = kh * kn * (h(u,v+1/h)-h(u,v))
Vector ln = (-dU, -dV, 1)
// 扰动后的法向量
Normal n = normalize(TBN * ln)

// Displacement Mapping
Let n = normal = (x, y, z)
Vector t = (x*y/sqrt(x*x+z*z),sqrt(x*x+z*z),z*y/sqrt(x*x+z*z))
Vector b = n cross product t
Matrix TBN = [t b n]
dU = kh * kn * (h(u+1/w,v)-h(u,v))
dV = kh * kn * (h(u,v+1/h)-h(u,v))
Vector ln = (-dU, -dV, 1)
// 扰动后的顶点与法向量
Position p = p + kn * n * h(u,v)
Normal n = normalize(TBN * ln)
```



