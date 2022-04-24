import{_ as n,c as s,o as a,a as p}from"./app.4b84d482.js";const d='{"title":"\u6D41\u7A0B\u63A7\u5236","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u6D41\u7A0B\u63A7\u5236","slug":"\u6D41\u7A0B\u63A7\u5236"},{"level":3,"title":"for","slug":"for"},{"level":3,"title":"if","slug":"if"},{"level":3,"title":"switch","slug":"switch"},{"level":3,"title":"defer","slug":"defer"},{"level":2,"title":"\u5C0F\u7ED3","slug":"\u5C0F\u7ED3"}],"relativePath":"go/travel/Basic-\u6D41\u7A0B\u63A7\u5236.md"}',t={},e=p(`<h2 id="\u6D41\u7A0B\u63A7\u5236" tabindex="-1">\u6D41\u7A0B\u63A7\u5236</h2><h3 id="for" tabindex="-1">for</h3><ul><li>Go \u53EA\u6709\u4E00\u79CD\u5FAA\u73AF\u7ED3\u6784\uFF1A<code>for</code>\xA0 \u5FAA\u73AF</li><li>\u7EC4\u6210 <ul><li>\u521D\u59CB\u5316\u8BED\u53E5\uFF1A\u5728\u7B2C\u4E00\u6B21\u8FED\u4EE3\u524D\u6267\u884C\uFF0C\u901A\u5E38\u4E3A\u4E00\u53E5\u77ED\u53D8\u91CF\u58F0\u660E\uFF0C\u6B64\u90E8\u5206\u53EF\u9009</li><li>\u6761\u4EF6\u8868\u8FBE\u5F0F\uFF1A\u5728\u6BCF\u6B21\u8FED\u4EE3\u524D\u6C42\u503C\uFF0C\u4E00\u65E6\u6761\u4EF6\u8868\u8FBE\u5F0F\u7684\u5E03\u5C14\u503C\u4E3A \xA0<code>false</code>\uFF0C\u5FAA\u73AF\u8FED\u4EE3\u5C31\u4F1A\u7EC8\u6B62</li><li>\u540E\u7F6E\u8BED\u53E5\uFF1A\u5728\u6BCF\u6B21\u8FED\u4EE3\u7684\u7ED3\u5C3E\u6267\u884C\uFF0C\u6B64\u90E8\u5206\u53EF\u9009</li></ul></li><li>Go \u7684 for \u8BED\u53E5\u540E\u9762\u7684\u4E09\u4E2A\u6784\u6210\u90E8\u5206\u5916\u6CA1\u6709\u5C0F\u62EC\u53F7\uFF0C \u5927\u62EC\u53F7 \xA0<code>{ }</code>\xA0 \u5219\u662F\u5FC5\u987B\u7684</li><li>\u5728\u53EA\u4FDD\u7559\u6761\u4EF6\u8868\u8FBE\u5F0F\u65F6\uFF0C\u53EF\u4EE5\u53BB\u6389\u5206\u53F7\uFF0C\u6B64\u65F6\u5C31\u662F C \u4E2D\u7684 while</li></ul><div class="language-go line-numbers-mode"><pre><code><span class="token comment">// ...</span>

<span class="token comment">// \u7EC3\u4E60\uFF1A\u4F7F\u7528\u725B\u987F\u6CD5\u5B9E\u73B0Sqrt</span>
<span class="token keyword">func</span> <span class="token function">Sqrt</span><span class="token punctuation">(</span>x <span class="token builtin">float64</span><span class="token punctuation">)</span> <span class="token builtin">float64</span> <span class="token punctuation">{</span>
	z <span class="token operator">:=</span> <span class="token function">float64</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>z<span class="token operator">*</span>z <span class="token operator">-</span> x<span class="token punctuation">)</span><span class="token operator">/</span><span class="token punctuation">(</span><span class="token number">2</span> <span class="token operator">*</span> z<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token function">float64</span><span class="token punctuation">(</span><span class="token number">0.01</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	  z <span class="token operator">-=</span> <span class="token punctuation">(</span>z<span class="token operator">*</span>z <span class="token operator">-</span> x<span class="token punctuation">)</span><span class="token operator">/</span><span class="token punctuation">(</span><span class="token number">2</span> <span class="token operator">*</span> z<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> z
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// \u666E\u901A for \u5FAA\u73AF</span>
	<span class="token keyword">for</span> i<span class="token operator">:=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span><span class="token number">10</span><span class="token punctuation">;</span>i<span class="token operator">++</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token comment">// \u7701\u7565 for \u5FAA\u73AF</span>
	sum <span class="token operator">:=</span> <span class="token number">0</span>
	<span class="token keyword">for</span> <span class="token punctuation">;</span>sum<span class="token operator">&lt;</span><span class="token number">1000</span><span class="token punctuation">;</span> <span class="token punctuation">{</span> sum <span class="token operator">+=</span> sum <span class="token punctuation">}</span>
	<span class="token keyword">for</span> sum<span class="token operator">&lt;</span><span class="token number">1000</span> <span class="token punctuation">{</span> sum <span class="token operator">+=</span> sum <span class="token punctuation">}</span>
	<span class="token comment">// \u65E0\u9650\u5FAA\u73AF</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token comment">// \u7EC3\u4E60</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">Sqrt</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h3 id="if" tabindex="-1">if</h3><ul><li><code>if</code>\u8868\u8FBE\u5F0F\u5916\u65E0\u9700\u5C0F\u62EC\u53F7 \xA0<code>( )</code>\xA0\uFF0C\u800C\u5927\u62EC\u53F7 \xA0<code>{ }</code>\xA0 \u5219\u662F\u5FC5\u987B\u7684</li><li><code>if</code>\u7684\u7B80\u77ED\u8BED\u53E5:\xA0<code>if</code>\xA0 \u8BED\u53E5\u53EF\u4EE5\u5728\u6761\u4EF6\u8868\u8FBE\u5F0F\u524D\u6267\u884C\u4E00\u4E2A\u7B80\u5355\u7684\u8BED\u53E5,\u5E76\u4E14\u8BE5\u8BED\u53E5\u58F0\u660E\u7684\u53D8\u91CF\u4F5C\u7528\u57DF\u4EC5\u5728 \xA0<code>if</code>\xA0 \u6216\u4EFB\u4F55\u5BF9\u5E94\u7684 \xA0<code>else</code>\xA0 \u5757\u4E2D\u4F7F\u7528</li></ul><div class="language-go line-numbers-mode"><pre><code><span class="token comment">// ...</span>

<span class="token keyword">func</span> <span class="token function">pow</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> n<span class="token punctuation">,</span> lim <span class="token builtin">float64</span><span class="token punctuation">)</span> <span class="token builtin">float64</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> v<span class="token operator">:=</span>math<span class="token punctuation">.</span><span class="token function">Pow</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> n<span class="token punctuation">)</span><span class="token punctuation">;</span>v <span class="token operator">&lt;</span> lim <span class="token punctuation">{</span>
	<span class="token keyword">return</span> v
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;%g&gt;=%h\\n&quot;</span><span class="token punctuation">,</span> v<span class="token punctuation">,</span> lim<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> lim
<span class="token punctuation">}</span>

<span class="token comment">//...</span>
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h3 id="switch" tabindex="-1">switch</h3><ul><li>\u81EA\u5E26<code>break</code>\u3002\u9664\u975E\u4EE5 \xA0<code>fallthrough</code>\xA0 \u8BED\u53E5\u7ED3\u675F\uFF0C\u5426\u5219\u5206\u652F\u4F1A\u81EA\u52A8\u7EC8\u6B62</li><li>switch \u7684 case \u65E0\u9700\u4E3A<strong>\u5E38\u91CF</strong>\uFF0C\u4E14\u53D6\u503C\u4E0D\u5FC5\u4E3A\u6574\u6570</li><li>\u6CA1\u6709\u6761\u4EF6\u7684 switch \u540C \xA0<code>switch true</code>\xA0 \u4E00\u6837</li></ul><div class="language-go line-numbers-mode"><pre><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// case\u4ECE\u4E0A\u5230\u4E0B\u6267\u884C\uFF0Ccase \u65E0\u9700\u4E3A\u5E38\u91CF</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;When&#39;s Saturday?&quot;</span><span class="token punctuation">)</span>
	today <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Weekday</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">switch</span> time<span class="token punctuation">.</span>Saturday <span class="token punctuation">{</span>
	  <span class="token keyword">case</span> today <span class="token operator">+</span> <span class="token number">0</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Today.&quot;</span><span class="token punctuation">)</span>
	  <span class="token keyword">case</span> today <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Tomorrow.&quot;</span><span class="token punctuation">)</span>
	  <span class="token keyword">default</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Too far away.&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// \u65E0\u6761\u4EF6\u7684 switch</span>
	t <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">switch</span> <span class="token punctuation">{</span>
	  <span class="token keyword">case</span> t<span class="token punctuation">.</span><span class="token function">Hour</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">12</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Good morning!&quot;</span><span class="token punctuation">)</span>
	  <span class="token keyword">case</span> t<span class="token punctuation">.</span><span class="token function">Hour</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">17</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Good afternoon.&quot;</span><span class="token punctuation">)</span>
	  <span class="token keyword">default</span><span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Good evening.&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><h3 id="defer" tabindex="-1">defer</h3><ul><li>defer \u8BED\u53E5\u4F1A\u5C06\u51FD\u6570\u63A8\u8FDF\u5230<strong>\u5916\u5C42\u51FD\u6570\u8FD4\u56DE\u4E4B\u540E\u6267\u884C</strong></li><li>\u63A8\u8FDF\u8C03\u7528\u7684\u51FD\u6570\u5176<strong>\u53C2\u6570\u4F1A\u7ACB\u5373\u6C42\u503C</strong>\uFF0C\u4F46\u76F4\u5230\u5916\u5C42\u51FD\u6570\u8FD4\u56DE\u524D\u8BE5\u51FD\u6570\u90FD\u4E0D\u4F1A\u88AB\u8C03\u7528</li><li>\u63A8\u8FDF\u7684\u51FD\u6570\u8C03\u7528\u4F1A\u88AB\u538B\u5165\u4E00\u4E2A\u6808\u4E2D(\u540E\u8FDB\u5148\u51FA)</li></ul><div class="language-go line-numbers-mode"><pre><code><span class="token comment">// ...</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;counting&quot;</span><span class="token punctuation">)</span>

	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">defer</span> fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;done&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="\u5C0F\u7ED3" tabindex="-1">\u5C0F\u7ED3</h2><ul><li>for,if,switch,defer</li><li>\u6CA1\u6709 while \u5FAA\u73AF\uFF0C\u56E0\u4E3A for \u5FAA\u73AF\u53EF\u4EE5\u7B80\u5316\uFF0C\u7B80\u5316\u5230\u53EA\u5269\u7EC8\u6B62\u6761\u4EF6\u5C31\u53D8\u6210\u4E86 while \u4E86</li><li>\u6BD4\u8F83\u7279\u6B8A\u7684\u662F\uFF0C\u8FD9\u4E9B\u8BED\u53E5\u53EF\u4EE5\u751F\u6210\u4E34\u65F6\u53D8\u91CF\u4E14\u90FD\u65E0\u9700\u5C0F\u62EC\u53F7</li><li>switch \u7684 case \u662F\u52A8\u6001\u7684</li><li>\u7279\u6B8A\u7684 defer\uFF0C\u53EF\u4EE5\u5C06\u51FD\u6570\u5EF6\u8FDF\u5230\u5916\u5C42\u51FD\u6570\u8FD4\u56DE\u540E\u6267\u884C</li></ul>`,15),o=[e];function c(l,u,i,r,k,b){return a(),s("div",null,o)}var f=n(t,[["render",c]]);export{d as __pageData,f as default};
