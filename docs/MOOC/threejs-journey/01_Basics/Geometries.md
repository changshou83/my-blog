# Geometries

- 是面、线或点几何体的有效表述
- 包括顶点位置，面片索引、法相量、颜色值、UV 坐标和自定义缓存属性值
- 基类在 `v0.125.0`版本更改为BufferGeometry，可以有效减少向 GPU 传输上述数据所需的开销。

## BufferGeometry

- 50个随机大小的三角形

```js
const geometry = new THREE.BufferGeometry();

const count = 50;
const vertices = new Float32Array(count * 3 * 3);
for(let i = 0; i < count * 3 * 3; i++) {
  vertices[i] = (Math.random() - 0.5) * 4;
}
  
geometry.setAttribute(
  'position',
  new THREE.BufferAttribute(vertices, 3)
);
```

## BoxGeometry

- 四边形的原始几何类

### Example

```js
// width, height, depth
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
```

## 平面几何体

### PlaneGeometry

- 平面几何体
- 参数列表
	- width — 平面沿着X轴的宽度。默认值是1。  
	- height — 平面沿着Y轴的高度。默认值是1。  
	- widthSegments — （可选）平面的宽度分段数，默认值是1。  
	- heightSegments — （可选）平面的高度分段数，默认值是1。

### ShapeGeometry

- 从一个或多个路径形状中创建一个单面多边形几何体
- 参数列表
	- shapes — 一个单独的shape，或者一个包含形状的Array。Default is a single triangle shape.  
	- curveSegments - Integer - 每一个形状的分段数，默认值为12。

## 多面几何体

### TetrahedronGeometry

- 四面几何体
- 参数列表
	- radius — 四面体的半径，默认值为1。  
	- detail — 默认值为0。将这个值设为一个大于0的数将会为它增加一些顶点，使其不再是一个四面体。

### OctahedronGeometry

- 八面体
- 参数列表
	- radius — 八面体的半径，默认值为1。  
	- detail — 默认值为0，将这个值设为一个大于0的数将会为它增加一些顶点，使其不再是一个八面体。

### DodecahedronGeometry

- 十二面几何体
- 参数列表
	- radius — 十二面体的半径，默认值为1。  
	- detail — 默认值为0。将这个值设为一个大于0的数将会为它增加一些顶点，使其不再是一个十二面体。

### IcosahedronGeometry

- 二十面几何体
- 参数列表
	- radius — 二十面体的半径，默认为1。  
	- detail — 默认值为0。将这个值设为一个大于0的数将会为它增加一些顶点，使其不再是一个二十面体。当这个值大于1的时候，实际上它将变成一个球体。

## 圆形几何体

### ConeGeometry

- 圆锥几何体
- 参数列表
	- radius — 圆锥底部的半径，默认值为1。  
	- height — 圆锥的高度，默认值为1。  
	- radialSegments — 圆锥侧面周围的分段数，默认为8。  
	- heightSegments — 圆锥侧面沿着其高度的分段数，默认值为1。  
	- openEnded — 一个Boolean值，指明该圆锥的底面是开放的还是封顶的。默认值为false，即其底面默认是封顶的。  
	- thetaStart — 第一个分段的起始角度，默认为0。（three o'clock position）  
	- thetaLength — 圆锥底面圆扇区的中心角，通常被称为“θ”（西塔）。默认值是2*Pi，这使其成为一个完整的圆锥。

### CylinderGeometry

- 圆柱几何体
- 参数列表
	- radiusTop — 圆柱的顶部半径，默认值是1。  
	- radiusBottom — 圆柱的底部半径，默认值是1。  
	- height — 圆柱的高度，默认值是1。  
	- radialSegments — 圆柱侧面周围的分段数，默认为8。  
	- heightSegments — 圆柱侧面沿着其高度的分段数，默认值为1。  
	- openEnded — 一个Boolean值，指明该圆锥的底面是开放的还是封顶的。默认值为false，即其底面默认是封顶的。  
	- thetaStart — 第一个分段的起始角度，默认为0。（three o'clock position）  
	- thetaLength — 圆柱底面圆扇区的中心角，通常被称为“θ”（西塔）。默认值是2*Pi，这使其成为一个完整的圆柱。

### RingGeometry

- 二维圆环几何体
- 参数列表
	- innerRadius — 内部半径，默认值为0.5。  
	- outerRadius — 外部半径，默认值为1。  
	- thetaSegments — 圆环的分段数。这个值越大，圆环就越圆。最小值为3，默认值为8。  
	- phiSegments — 最小值为1，默认值为8。  
	- thetaStart — 起始角度，默认值为0。  
	- thetaLength — 圆心角，默认值为Math.PI * 2。

### TorusGeometry

- 圆环几何体
- 参数列表
	- radius - 环面的半径，从环面的中心到管道横截面的中心。默认值是1。  
	- tube — 管道的半径，默认值为0.4。  
	- radialSegments — 管道横截面的分段数，默认值为8。  
	- tubularSegments — 管道的分段数，默认值为6。  
	- arc — 圆环的圆心角（单位是弧度），默认值为Math.PI * 2。

### SphereGeometry

- 球体
- 参数列表
	- radius — 球体半径，默认为1。  
	- widthSegments — 水平分段数（沿着经线分段），最小值为3，默认值为32。  
	- heightSegments — 垂直分段数（沿着纬线分段），最小值为2，默认值为16。  
	- phiStart — 指定水平（经线）起始角度，默认值为0。。  
	- phiLength — 指定水平（经线）扫描角度的大小，默认值为 Math.PI * 2。  
	- thetaStart — 指定垂直（纬线）起始角度，默认值为0。  
	- thetaLength — 指定垂直（纬线）扫描角度大小，默认值为 Math.PI。

### CircleGeometry

- 圆形缓冲几何体
- 由围绕着一个中心点的三角分段的数量所构造，由给定的半径来延展
- 也可以用于创建规则多边形，其分段数量取决于该规则多边形的边数
- 参数列表
	- radius — 圆形的半径，默认值为1  
	- segments — 分段（三角面）的数量，最小值为3，默认值为8。  
	- thetaStart — 第一个分段的起始角度，默认为0。（three o'clock position）  
	- thetaLength — 圆形扇区的中心角，通常被称为“θ”（西塔）。默认值是2*Pi，这使其成为一个完整的圆。

### LatheGeometry

- 创建具有轴对称性的网格，比如花瓶
- 参数列表
	- points — 一个Vector2对象数组。每个点的X坐标必须大于0。 默认值是一个包含 (0,-0.5), (0.5,0) 和 (0,0.5)的数组，可以生成一个菱形。  
	- segments — 要生成的车削几何体圆周分段的数量，默认值是12。  
	- phiStart — 以弧度表示的起始角度，默认值为0。  
	- phiLength — 车削部分的弧度（0-2PI）范围，2PI将是一个完全闭合的、完整的车削几何体，小于2PI是部分的车削。默认值是2PI。

### TorusKnotGeometry

- 创建一个圆环扭结，其特殊形状由一对互质的整数，p和q所定义
- 如果p和q不互质，创建出来的几何体将是一个环面链接
- 参数列表
	- radius - 圆环的半径，默认值为1。
	- tube — 管道的半径，默认值为0.4。
	- tubularSegments — 管道的分段数量，默认值为64。
	- radialSegments — 横截面分段数量，默认值为8。
	- p — 这个值决定了几何体将绕着其旋转对称轴旋转多少次，默认值是2。
	- q — 这个值决定了几何体将绕着其内部圆环旋转多少次，默认值是3。

### TubeGeometry

- 创建一个沿着三维曲线延伸的管道
- 参数列表
	- path — Curve - 一个由基类Curve继承而来的3D路径。 Default is a quadratic bezier curve.  
	- tubularSegments — Integer - 组成这一管道的分段数，默认值为64。  
	- radius — Float - 管道的半径，默认值为1。  
	- radialSegments — Integer - 管道横截面的分段数目，默认值为8。  
	- closed — Boolean 管道的两端是否闭合，默认值为false。

## 辅助几何体

### EdgesGeometry

- 作为一个辅助对象来查看geometry的边缘
- 参数列表
	- geometry — 任何一个几何体对象。  
	- thresholdAngle — 仅当相邻面的法线之间的角度（单位为角度）超过这个值时，才会渲染边缘。默认值为1。

### WireframeGeometry

- 可以被用作一个辅助物体，来对一个geometry以线框的形式进行查看
- 参数列表
	- geometry — 任意几何体对象。
