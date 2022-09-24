import{_ as n,c as s,o as a,a as p}from"./app.6117d463.js";const m='{"title":"Transform Objects","description":"","frontmatter":{},"headers":[{"level":2,"title":"Content","slug":"content"},{"level":2,"title":"Group","slug":"group"},{"level":2,"title":"Other","slug":"other"}],"relativePath":"MOOC/threejs-journey/01_Basics/Transform-Objects.md"}',t={},e=p(`<h1 id="transform-objects" tabindex="-1">Transform Objects</h1><ul><li>\u66F4\u6539\u7269\u4F53\u7684\u5C5E\u6027\u4F7F\u7269\u4F53\u53D1\u751F\u53D8\u5316</li></ul><h2 id="content" tabindex="-1">Content</h2><ul><li><code>mesh.position.[x/y/z]</code>\uFF1A\u4F4D\u7F6E</li><li><code>mesh.position.distanceTo(Vector3)</code>\uFF1A\u8BA1\u7B97\u51FA\u7F51\u683C\u4E0E\u67D0\u70B9\u7684\u8DDD\u79BB</li><li><code>mesh.scale.[x/y/z]</code>\uFF1A\u7F29\u653E</li><li><code>mesh.rotation.[x/y/z]</code>\uFF1A\u65CB\u8F6C</li><li><code>mesh.rotation.reorder(string)</code>\uFF1A\u66F4\u6539\u5750\u6807\u7CFB</li></ul><h2 id="group" tabindex="-1">Group</h2><ul><li>\u53EF\u4EE5\u901A\u8FC7\u7EC4\u63A7\u5236\u591A\u4E2A\u7269\u4F53</li></ul><div class="language-js line-numbers-mode"><pre><code><span class="token keyword">const</span> group <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Group</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> redMesh <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Mesh</span><span class="token punctuation">(</span>
	<span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>BoxBufferGeometry</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>MeshBasicMateral</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;red&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
group<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>redMesh<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> blueMesh <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Mesh</span><span class="token punctuation">(</span>
	<span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>BoxBufferGeometry</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>MeshBasicMateral</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;blue&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
group<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>blueMesh<span class="token punctuation">)</span><span class="token punctuation">;</span>

scene<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>group<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h2 id="other" tabindex="-1">Other</h2><ul><li><code>camera.lookAt(Position)</code>\uFF1A\u8BA9\u6444\u50CF\u5934\u6CE8\u89C6\u67D0\u4E2A\u5730\u65B9</li></ul>`,9),o=[e];function c(l,u,r,i,k,d){return a(),s("div",null,o)}var h=n(t,[["render",c]]);export{m as __pageData,h as default};
