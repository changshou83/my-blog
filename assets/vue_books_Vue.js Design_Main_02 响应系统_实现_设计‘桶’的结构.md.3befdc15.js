import{_ as n,c as s,o as a,a as t}from"./app.192460d6.js";const b='{"title":"\u6876\u7684\u7ED3\u6784","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u7ED3\u6784\u793A\u610F","slug":"\u7ED3\u6784\u793A\u610F"},{"level":3,"title":"\u4E00\u4E9B\u8865\u5145","slug":"\u4E00\u4E9B\u8865\u5145"},{"level":2,"title":"\u64CD\u4F5C\u5C01\u88C5","slug":"\u64CD\u4F5C\u5C01\u88C5"},{"level":2,"title":"\u6539\u9020","slug":"\u6539\u9020"},{"level":3,"title":"\u76D1\u542C","slug":"\u76D1\u542C"}],"relativePath":"vue/books/Vue.js Design/Main/02 \u54CD\u5E94\u7CFB\u7EDF/\u5B9E\u73B0/\u8BBE\u8BA1\u2018\u6876\u2019\u7684\u7ED3\u6784.md"}',p={},e=t(`<h1 id="\u6876\u7684\u7ED3\u6784" tabindex="-1">\u6876\u7684\u7ED3\u6784</h1><h2 id="\u7ED3\u6784\u793A\u610F" tabindex="-1">\u7ED3\u6784\u793A\u610F</h2><p>bucket(WeakMap)--&gt;depsMap(Map)--&gt;effects(Set)--&gt;effect(fn) --&gt;effect --&gt;effects --&gt;effect --&gt;effect --&gt;depsMap --&gt;effects --&gt;effect --&gt;effects --&gt;effect</p><h3 id="\u4E00\u4E9B\u8865\u5145" tabindex="-1">\u4E00\u4E9B\u8865\u5145</h3><p>bucket(WeakMap):target--&gt;depsMap depsMap(Map) :key --&gt;effects effects(Set) :effect ^ced9db</p><ul><li>WeakMap\u7684key\u662F\u5F31\u5F15\u7528\uFF0C\u5373target\u4E0D\u5B58\u5728\u4E86\uFF0C\u5B83\u5BF9\u5E94\u7684\u503C\u90FD\u4F1A\u88AB\u56DE\u6536</li></ul><h2 id="\u64CD\u4F5C\u5C01\u88C5" tabindex="-1">\u64CD\u4F5C\u5C01\u88C5</h2><ul><li>get\u65F6\u6536\u96C6effect\uFF1Atrack</li><li>set\u65F6\u89E6\u53D1effect\uFF1Atrigger</li></ul><div class="language-js line-numbers-mode"><pre><code><span class="token keyword">function</span> <span class="token function">track</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>activeEffect<span class="token punctuation">)</span> <span class="token keyword">return</span>
	
  <span class="token keyword">const</span> depsMap <span class="token operator">=</span> bucket<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>depsMap<span class="token punctuation">)</span> bucket<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> <span class="token punctuation">(</span>depsMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token keyword">const</span> effects <span class="token operator">=</span> depsMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>effects<span class="token punctuation">)</span> depsMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token punctuation">(</span>effects <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	
  effects<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>activeEffect<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">trigger</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> depsMap <span class="token operator">=</span> bucket<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>depsMap<span class="token punctuation">)</span> <span class="token keyword">return</span>
  <span class="token keyword">const</span> effects <span class="token operator">=</span> depsMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
  effects <span class="token operator">&amp;&amp;</span> effects<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">effect</span> <span class="token operator">=&gt;</span> <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h2 id="\u6539\u9020" tabindex="-1">\u6539\u9020</h2><h3 id="\u76D1\u542C" tabindex="-1">\u76D1\u542C</h3><div class="language-js line-numbers-mode"><pre><code><span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">track</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
    <span class="token keyword">return</span> target<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> newValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    target<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> newValue
	<span class="token function">trigger</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div>`,12),c=[e];function o(l,u,i,k,r,f){return a(),s("div",null,c)}var g=n(p,[["render",o]]);export{b as __pageData,g as default};
