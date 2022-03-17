import{_ as n,c as s,o as a,a as p}from"./app.3646c367.js";const d='{"title":"\u8BFE\u7A0B\u5185\u5BB9","description":"","frontmatter":{},"headers":[],"relativePath":"fe-basic/JS/error-handling.md"}',t={},o=p(`<h1 id="\u8BFE\u7A0B\u5185\u5BB9" tabindex="-1">\u8BFE\u7A0B\u5185\u5BB9</h1><ul><li>\u9519\u8BEF\u5904\u7406\u662F\u4E00\u9879\u5FC5\u8981\u7684\u529F\u80FD</li><li>JS \u901A\u8FC7\u9519\u8BEF\u5BF9\u8C61\u6765\u6355\u6349\u9519\u8BEF,\u901A\u8FC7<code>throw</code>\u8BED\u53E5\u629B\u51FA\u9519\u8BEF <ul><li>throw \u8BED\u53E5 <ol><li>\u6682\u505C\u51FD\u6570\u6267\u884C</li><li>\u5C06\u9519\u8BEF\u5BF9\u8C61\u629B\u5165\u9519\u8BEF\u6808</li><li>\u5C06\u6267\u884C\u4F20\u9012\u5230\u8C03\u7528\u5806\u6808\u4E2D\u7684\u7B2C\u4E00\u4E2A<code>catch</code>\u5757\uFF0C\u5982\u679C\u6CA1\u6709\uFF0C\u5219\u7EC8\u6B62\u7A0B\u5E8F\u6267\u884C</li></ol><ul><li>\u9519\u8BEF\u5BF9\u8C61</li><li><code>new Error()</code></li><li><code>new TypeError()</code></li><li><code>new ReferenceError()</code></li><li>...</li></ul></li></ul></li><li>JS \u7684\u9519\u8BEF\u5904\u7406 <ul><li>\u5728\u540C\u6B65\u60C5\u51B5\u4E0B\u901A\u8FC7<code>try..catch..</code>\u6765\u6355\u6349\u5E76\u5904\u7406\u9519\u8BEF\u5BF9\u8C61</li><li>\u5728\u5F02\u6B65\u60C5\u51B5\u4E0B\uFF0C\u4F7F\u7528<code>Promise.catch()</code>\u548C<code>async+try</code>\u8FDB\u884C\u9519\u8BEF\u5904\u7406 <ul><li>\u56E0\u4E3A\u5F02\u6B65\u51FD\u6570\u6267\u884C\u65F6\uFF0Ctry \u8BED\u53E5\u7684\u6267\u884C\u73AF\u5883\u5DF2\u7ECF\u88AB\u91CA\u653E\uFF0C\u4ECE\u800C\u4E0D\u80FD\u6B63\u5E38\u7684\u8FDB\u884C\u9519\u8BEF\u5904\u7406</li></ul></li></ul></li><li>\u901A\u8FC7\u7EE7\u627F<code>Error\u57FA\u7C7B</code>\u6765\u6269\u5C55\u81EA\u5DF1\u7684\u9519\u8BEF\u5BF9\u8C61</li></ul><div class="language-js line-numbers-mode"><pre><code><span class="token keyword">const</span> myError <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;oops&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
myError<span class="token punctuation">.</span>name<span class="token punctuation">;</span> <span class="token comment">// Error</span>
myError<span class="token punctuation">.</span>message<span class="token punctuation">;</span> <span class="token comment">// oops</span>
myError<span class="token punctuation">.</span>stack<span class="token punctuation">;</span> <span class="token comment">// \u5806\u6808\u4FE1\u606F</span>

<span class="token comment">// \u540C\u6B65\u9519\u8BEF\u5904\u7406</span>
<span class="token keyword">try</span> <span class="token punctuation">{</span>
  <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;fail&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// \u5F02\u6B65\u9519\u8BEF\u5904\u7406</span>
Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span><span class="token string">&#39;fail&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token parameter">e</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;mid: &#39;</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// mid: fail</span>
  <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token parameter">e</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;fin: &#39;</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u4E0D\u4F1A\u6267\u884C</span>
Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;asyncfail&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">response</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span><span class="token string">&#39;#3 fail&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span>console<span class="token punctuation">.</span>log<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// #3 fail</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token parameter">e</span> <span class="token operator">=&gt;</span> conso<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;final: &#39;</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">(</span>
  <span class="token comment">// \u4E0D\u4F1A\u6267\u884C</span>
  <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token keyword">await</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;oops #1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">await</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span><span class="token string">&#39;oops #2&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token comment">// oops #2</span>

    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;is this still good?&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u4F1A\u6253\u5370</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// \u6269\u5C55\u9519\u8BEF\u5BF9\u8C61</span>
<span class="token keyword">class</span> <span class="token class-name">customError</span> <span class="token keyword">extends</span> <span class="token class-name">Error</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">message</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&#39;customError&#39;</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">customError</span><span class="token punctuation">(</span><span class="token string">&#39;oops&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
a<span class="token punctuation">.</span>name<span class="token punctuation">;</span> <span class="token comment">// customError</span>
a<span class="token punctuation">.</span>message<span class="token punctuation">;</span> <span class="token comment">// oops</span>
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br></div></div><h1 id="links" tabindex="-1">Links</h1><blockquote><p><a href="https://www.bilibili.com/video/BV16q4y1o7EG" target="_blank" rel="noopener noreferrer">b \u7AD9\u89C6\u9891</a> p132 - p138 7</p></blockquote>`,5),c=[o];function e(l,u,i,r,k,m){return a(),s("div",null,c)}var f=n(t,[["render",e]]);export{d as __pageData,f as default};
