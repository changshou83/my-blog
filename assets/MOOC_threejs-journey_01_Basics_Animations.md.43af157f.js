import{_ as n,c as s,o as a,a as p}from"./app.635358c2.js";const d='{"title":"Animations","description":"","frontmatter":{},"headers":[{"level":2,"title":"Example","slug":"example"},{"level":3,"title":"RequestAnimationFrame","slug":"requestanimationframe"},{"level":3,"title":"GSAP","slug":"gsap"}],"relativePath":"MOOC/threejs-journey/01_Basics/Animations.md"}',e={},t=p(`<h1 id="animations" tabindex="-1">Animations</h1><ul><li>\u5229\u7528<code>window.requestAnimationFrame()</code>\u8FD9\u4E2AAPI\u6765\u4E3A\u6BCF\u4E00\u5E27\u6DFB\u52A0\u52A8\u753B</li><li>\u5229\u7528\u73B0\u6210\u7684\u52A8\u753B\u5E93\uFF1A<a href="https://github.com/greensock/GSAP" target="_blank" rel="noopener noreferrer">gsap - github</a></li></ul><h2 id="example" tabindex="-1">Example</h2><h3 id="requestanimationframe" tabindex="-1">RequestAnimationFrame</h3><div class="language-js line-numbers-mode"><pre><code><span class="token comment">/**
 * Clock
 */</span>
<span class="token keyword">const</span> clock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Clock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/**
 * Animation
 */</span>
<span class="token keyword">const</span> <span class="token function-variable function">animate</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
	<span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span>animate<span class="token punctuation">)</span><span class="token punctuation">;</span>
	
	<span class="token keyword">const</span> elapsedTime <span class="token operator">=</span> clock<span class="token punctuation">.</span><span class="token function">getElapsedTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">// Update Objects</span>
	<span class="token comment">// ...</span>

	<span class="token comment">// Update Cameras</span>
	<span class="token comment">// ...</span>

	<span class="token comment">// Update Lights</span>
	<span class="token comment">// ...</span>

	<span class="token comment">// Update Controls</span>
	<span class="token comment">// ...</span>

	<span class="token comment">// Re-render</span>
	renderer<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>scene<span class="token punctuation">,</span> camera<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token function">animate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><h3 id="gsap" tabindex="-1">GSAP</h3><div class="language-js line-numbers-mode"><pre><code><span class="token keyword">import</span> gsap <span class="token keyword">from</span> <span class="token string">&#39;gsap&#39;</span><span class="token punctuation">;</span>

gsap<span class="token punctuation">.</span><span class="token function">to</span><span class="token punctuation">(</span>mesh<span class="token punctuation">.</span>position<span class="token punctuation">,</span> <span class="token punctuation">{</span>
	<span class="token literal-property property">duration</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
	<span class="token literal-property property">delay</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
	<span class="token literal-property property">x</span><span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">animate</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
	<span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span>animate<span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">// Re-render</span>
	renderer<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>scene<span class="token punctuation">,</span> camera<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token function">animate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div>`,7),o=[t];function c(l,r,i,u,m,k){return a(),s("div",null,o)}var _=n(e,[["render",c]]);export{d as __pageData,_ as default};
