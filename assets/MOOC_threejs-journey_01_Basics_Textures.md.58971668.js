import{_ as e,c as l,o as t,a as i}from"./app.6117d463.js";const m='{"title":"Textures","description":"","frontmatter":{},"headers":[{"level":2,"title":"Create","slug":"create"},{"level":2,"title":"Use","slug":"use"},{"level":2,"title":"Transform","slug":"transform"},{"level":2,"title":"MipMapping(\u8D34\u56FE)","slug":"mipmapping-\u8D34\u56FE"},{"level":2,"title":"3 Crucial elements","slug":"_3-crucial-elements"},{"level":2,"title":"Where find","slug":"where-find"}],"relativePath":"MOOC/threejs-journey/01_Basics/Textures.md"}',r={},a=i('<h1 id="textures" tabindex="-1">Textures</h1><ul><li>\u7EB9\u7406\u662F\u4E00\u7EC4\u9644\u7740\u5728\u7269\u4F53\u8868\u9762\u7684\u56FE\u7247</li><li><code>UV Unwrapping</code>\uFF1A\u7EB9\u7406\u8986\u76D6\u5728\u7269\u4F53\u4E0A\u7684\u65B9\u5F0F <ul><li>\u901A\u8FC7\u8BBF\u95EE<code>geometry.attributes.uv</code>\u53EF\u4EE5\u53D1\u73B0\u662F\u4E00\u7EC4float32Array\uFF0C\u7528\u6765\u6807\u8BC6\u56FE\u7247\u4F4D\u7F6E</li></ul></li></ul><h2 id="create" tabindex="-1">Create</h2><ul><li>(\u53EF\u9009)\u4F7F\u7528<code>LoadingManager()</code>\u6765\u521B\u5EFA\u52A0\u8F7D\u7BA1\u7406\u5668\u7BA1\u7406\u591A\u4E2A\u52A0\u8F7D\u5668\uFF0C\u4F7F\u7528\u5176\u4E0A\u7684\u56DE\u8C03\u51FD\u6570\u6765\u5904\u7406\u4E8B\u4EF6</li><li>\u4F7F\u7528<code>TextureLoader(manager)</code>\u6765\u521B\u5EFA\u52A0\u8F7D\u5668</li><li>\u4F7F\u7528<code>loader.load(url)</code>\u6765\u52A0\u8F7D\u56FE\u7247\u521B\u5EFA\u7EB9\u7406\u5BF9\u8C61</li></ul><h2 id="use" tabindex="-1">Use</h2><ul><li><code>new THREE.MeshBasicMaterial({ map: texture })</code>\u521B\u5EFA\u6750\u6599\u5E76\u5C06\u5176map\u5C5E\u6027\u8BBE\u7F6E\u4E3A\u7EB9\u7406\u5BF9\u8C61</li></ul><h2 id="transform" tabindex="-1">Transform</h2><ul><li><code>repeat</code><ul><li><code>texture.repeat.x/y = &lt;number&gt;</code>\uFF1A\u89C4\u5B9A\u7EB9\u7406\u5728\u4E00\u4E2A\u9762\u4E0A\u7684\u91CD\u590D\u51E0\u6B21</li><li><code>texture.wrapS/wrapT = THREE.&lt;MirroredRepeatedWrapping/...&gt;</code>\uFF1A\u89C4\u5B9A\u7EB9\u7406\u5982\u4F55\u91CD\u590D</li></ul></li><li><code>offset</code><ul><li><code>texture.offset.x/y = &lt;number&gt;</code>\uFF1A\u89C4\u5B9A\u7EB9\u7406\u5728\u4E00\u4E2A\u9762\u4E0A\u7684\u504F\u79FB\u8DDD\u79BB</li></ul></li><li><code>rotation</code><ul><li><code>texture.rotation = &lt;number&gt;</code>\uFF1A\u6CBF\u7740\u4E2D\u5FC3\u70B9\u8FDB\u884C\u65CB\u8F6C\u7684\u89D2\u5EA6</li></ul></li><li><code>center</code><ul><li><code>texture.center.x/y = &lt;number&gt;</code>\uFF1A\u89C4\u5B9A\u4E2D\u5FC3\u7684\u4F4D\u7F6E</li></ul></li></ul><h2 id="mipmapping-\u8D34\u56FE" tabindex="-1">MipMapping(\u8D34\u56FE)</h2><ul><li>\u6700\u5C0F\u5316\u8FC7\u6EE4\u5668 <ul><li>\u5F53\u7EB9\u7406\u7684\u5927\u5C0F\u5927\u4E8E\u8981\u6E32\u67D3\u7684\u8868\u9762\u65F6\u5982\u4F55\u6E32\u67D3(\u7F29\u5C0F\u7269\u4F53\u65F6)</li><li><code>texture.minFilter = THREE.&lt;NearestFilter(sharper)/LinearFilter(default)/...&gt;</code></li><li><code>texture.generatemipmaps = true</code>\uFF1A\u5F53\u8BBE\u7F6E\u4E3ANearestFilter\u65F6\u5EFA\u8BAE\u5C06\u751F\u6210\u5C0F\u7248\u672C\u8D34\u56FE\u53D6\u6D88\uFF0C\u6027\u80FD\u4F18\u5316</li></ul></li><li>\u653E\u5927\u8FC7\u6EE4\u5668 <ul><li>\u5F53\u7EB9\u7406\u7684\u5927\u5C0F\u5C0F\u4E8E\u8981\u6E32\u67D3\u7684\u8868\u9762\u65F6\u5982\u4F55\u6E32\u67D3(\u653E\u5927\u7269\u4F53\u65F6)</li><li><code>texture.mapFilter = THREE.&lt;NearestFilter(sharper)/LinearFilter(default)&gt;</code></li></ul></li></ul><h2 id="_3-crucial-elements" tabindex="-1">3 Crucial elements</h2><ul><li><code>weight(\u6743\u91CD)</code><ul><li>\u63D0\u4F9B\u4E00\u5F20\u56FE\u7247\u7684\u4E24\u79CD\u7248\u672C\u8FD8\u662F\u5BF9\u4E00\u5F20\u56FE\u7247\u8FDB\u884C\u4E24\u79CD\u5904\u7406</li></ul></li><li><code>size</code><ul><li>\u56E0\u4E3A\u7EB9\u7406\u90FD\u662F\u8981\u7F13\u5B58\u5728gpu\u5185\u5B58\u4E2D\u7684\uFF0C\u5927\u5C0F\u6709\u9650\uFF0C\u4E3A\u4E86gpu\u7684\u6027\u80FD\uFF0C\u51CF\u5C11\u7EB9\u7406\u7684\u5927\u5C0F</li><li><code>jpg</code>\uFF1A\u6709\u635F\u538B\u7F29\uFF0C\u66F4\u5C0F\u66F4\u6A21\u7CCA</li><li><code>png</code>\uFF1A\u65E0\u635F\u538B\u7F29\uFF0C\u66F4\u6E05\u6670\u66F4\u5927</li></ul></li><li><code>data</code><ul><li>\u4F7F\u7528png\u683C\u5F0F\u7684\u56FE\u7247\u53EF\u4EE5\u83B7\u53D6\u66F4\u8BE6\u7EC6\u7684\u6570\u636E</li><li>\u56E0\u4E3AMipMapping\u4F1A\u5BF9\u56FE\u7247\u8FDB\u884C\u9664\u4E8C\uFF0C\u5982\u679C\u4E0D\u80FD\u9664\u4E8C\u5C31\u4F1A\u5BF9\u56FE\u7247\u8FDB\u884C\u88C1\u526A\uFF0C\u8FD9\u5C06\u6D88\u8017\u66F4\u591A\u7684\u65F6\u95F4\uFF0C\u6240\u4EE5\u56FE\u7247\u7684\u5BBD\u9AD8\u5FC5\u987B\u90FD\u662F2\u7684\u500D\u6570</li><li>\u53EF\u4EE5\u901A\u8FC7\u4E0D\u540C\u7684\u6570\u636E\u5BF9\u4E00\u5F20\u53EA\u6709\u4E09\u539F\u8272\u7684\u7EB9\u7406\u8FDB\u884C\u5904\u7406\u5F97\u5230\u4E0D\u540C\u7684\u7ED3\u679C</li></ul></li></ul><h2 id="where-find" tabindex="-1">Where find</h2><ul><li><a href="https://www.poliigon.com" target="_blank" rel="noopener noreferrer">poliigon.com</a></li><li><a href="https://3dtextures.me" target="_blank" rel="noopener noreferrer">3dtextures.me</a></li><li><a href="https://www.arrowway-textures.ch" target="_blank" rel="noopener noreferrer">arrowway-textures.ch</a></li><li><a href="https://www.adobe.com/cn/products/substance3d-designer.html" target="_blank" rel="noopener noreferrer">Substance3d Designer</a></li></ul>',14),o=[a];function d(u,c,n,s,p,g){return t(),l("div",null,o)}var _=e(r,[["render",d]]);export{m as __pageData,_ as default};
