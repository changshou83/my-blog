import{_ as n,c as s,o as a,a as p}from"./app.48dfb21b.js";const d='{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"fe-basic/JS/Appendix/inheritance.md"}',t={},e=p(`<div class="language-js line-numbers-mode"><pre><code><span class="token keyword">function</span> <span class="token function">myInheritance</span><span class="token punctuation">(</span><span class="token parameter">child<span class="token punctuation">,</span> parent</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  child<span class="token punctuation">.</span>prototype <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>parent<span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">cnostructor</span><span class="token operator">:</span> <span class="token punctuation">{</span>
	  <span class="token literal-property property">value</span><span class="token operator">:</span> Child<span class="token punctuation">,</span>
	  <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
	  <span class="token literal-property property">writable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
	  <span class="token literal-property property">configurable</span><span class="token operator">:</span> <span class="token boolean">true</span>
	<span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div>`,1),o=[e];function c(r,l,i,u,k,b){return a(),s("div",null,o)}var m=n(t,[["render",c]]);export{d as __pageData,m as default};