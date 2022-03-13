import{_ as n,c as s,o as a,b as p}from"./app.eb4f4a2c.js";const b='{"title":"\u5E8F","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u521B\u5EFA\u7EBF\u7A0B","slug":"\u521B\u5EFA\u7EBF\u7A0B"},{"level":2,"title":"move \u95ED\u5305\u4E0E\u7EBF\u7A0B","slug":"move-\u95ED\u5305\u4E0E\u7EBF\u7A0B"},{"level":2,"title":"\u591A\u751F\u4EA7\u8005\u5BF9\u5E94\u4E00\u4E2A\u6D88\u8D39\u8005","slug":"\u591A\u751F\u4EA7\u8005\u5BF9\u5E94\u4E00\u4E2A\u6D88\u8D39\u8005"},{"level":2,"title":"\u4E92\u65A5\u9501","slug":"\u4E92\u65A5\u9501"},{"level":3,"title":"\u7EBF\u7A0B\u95F4\u5171\u4EABMutex<T>","slug":"\u7EBF\u7A0B\u95F4\u5171\u4EABmutex-t"},{"level":3,"title":"RefCell<T>/Rc<T> \u4E0E Mutex<T>/Arc<T> \u7684\u76F8\u4F3C\u6027","slug":"refcell-t-rc-t-\u4E0E-mutex-t-arc-t-\u7684\u76F8\u4F3C\u6027"},{"level":2,"title":"Send","slug":"send"},{"level":2,"title":"Sync","slug":"sync"},{"level":2,"title":"\u6CE8\u610F","slug":"\u6CE8\u610F"}],"relativePath":"rust/getting-started/15Concurrency.md"}',t={},e=p(`<h1 id="\u5E8F" tabindex="-1">\u5E8F</h1><ul><li>\u968F\u7740\u8BA1\u7B97\u673A\u591A\u5904\u7406\u5668\u7684\u51FA\u73B0\u4E0E\u53D1\u5C55\uFF0C\u5E76\u53D1\u7F16\u7A0B\u6108\u53D1\u91CD\u8981</li><li>\u5E76\u53D1(Concurrent),\u7A0B\u5E8F\u7684\u4E0D\u540C\u90E8\u5206<strong>\u72EC\u7ACB</strong>\u6267\u884C</li><li>\u5E76\u884C(Parallel),\u7A0B\u5E8F\u7684\u4E0D\u540C\u90E8\u5206<strong>\u540C\u65F6</strong>\u6267\u884C</li><li>Rust \u63D0\u4F9B\u591A\u79CD\u5DE5\u5177\u7528\u4E8E\u5B89\u5168\u4E14\u9AD8\u6548\u5730\u5904\u7406\u5E76\u53D1\u7F16\u7A0B</li></ul><h1 id="\u4F7F\u7528\u7EBF\u7A0B" tabindex="-1">\u4F7F\u7528\u7EBF\u7A0B</h1><ul><li>\u5728\u64CD\u4F5C\u7CFB\u7EDF\u4E2D\uFF0C\u7A0B\u5E8F\u8FD0\u884C\u5728\u4E00\u4E2A\u8FDB\u7A0B\u4E2D\uFF0C\u5728\u7A0B\u5E8F\u5185\u90E8\uFF0C\u62E5\u6709\u591A\u4E2A\u540C\u65F6\u8FD0\u884C\u7684\u72EC\u7ACB\u90E8\u5206\uFF0C\u8FD9\u4E9B\u88AB\u79F0\u4E3A\u7EBF\u7A0B\u3002</li><li>\u4F7F\u7528\u7EBF\u7A0B\u53EF\u4EE5\u63D0\u5347\u6027\u80FD\uFF0C\u56E0\u4E3A\u7EBF\u7A0B\u53EF\u4EE5\u5E76\u53D1\u5730\u6267\u884C\u4EFB\u52A1\uFF0C\u8FD9\u4E5F\u4F1A\u5E26\u6765\u4E00\u4E9B\u95EE\u9898\uFF1A <ul><li>\u6570\u636E\u7ADE\u4E89</li><li>\u6B7B\u9501</li><li>\u53EA\u4F1A\u53D1\u751F\u5728\u7279\u6B8A\u60C5\u51B5\u4E0B\u7684\u96BE\u4EE5\u91CD\u73B0\u7684 bug</li></ul></li><li>\u5B9E\u73B0\u7EBF\u7A0B <ul><li>1:1\uFF0C\u4E00\u7F16\u7A0B\u8BED\u8A00\u7EBF\u7A0B\u5BF9\u5E94\u4E00\u64CD\u4F5C\u7CFB\u7EDF\u7EBF\u7A0B\uFF0C\u8F83\u5C0F\u7684\u8FD0\u884C\u65F6</li><li>M:N\uFF0CM \u4E2A\u7F16\u7A0B\u8BED\u8A00\u7EBF\u7A0B\u5BF9\u5E94 N \u4E2A\u64CD\u4F5C\u7CFB\u7EDF\u7EBF\u7A0B\uFF0C\u8F83\u5927\u7684\u8FD0\u884C\u65F6</li><li>\u56E0\u4E3A Rust \u9700\u8981\u505A\u5230\u8F83\u5C0F\u8FD0\u884C\u65F6\uFF0C\u6240\u4EE5\u5B98\u65B9\u63D0\u4F9B 1:1\uFF0C\u4F46\u793E\u533A\u6709 M:N \u7684 crate</li></ul></li></ul><h2 id="\u521B\u5EFA\u7EBF\u7A0B" tabindex="-1">\u521B\u5EFA\u7EBF\u7A0B</h2><ul><li>\u4F7F\u7528 std:\u{1F9F5}:spawn(f: F)\u521B\u5EFA\u4E00\u4E2A\u5B50\u7EBF\u7A0B\uFF0C\u5176\u8FD4\u56DE\u503C\u65F6 JoinHandle \u7C7B\u578B\u3002</li><li>\u8C03\u7528 JoinHandle \u7684 join \u65B9\u6CD5\u53EF\u4EE5\u4F7F\u5F97\u4E3B\u7EBF\u7A0B\u88AB\u6682\u505C\u76F4\u81F3\u5B50\u7EBF\u7A0B\u88AB\u6267\u884C\u5B8C</li></ul><h2 id="move-\u95ED\u5305\u4E0E\u7EBF\u7A0B" tabindex="-1">move \u95ED\u5305\u4E0E\u7EBF\u7A0B</h2><ul><li>move \u53EF\u4EE5\u5C06\u95ED\u5305\u6240\u5904\u73AF\u5883\u503C\u7684\u6240\u6709\u6743\u5F3A\u5236\u4F20\u5165\u95ED\u5305</li><li>\u56E0\u6B64\u53EF\u4EE5\u8BA9\u7EBF\u7A0B\u8BBF\u95EE\u53E6\u4E00\u4E2A\u7EBF\u7A0B</li></ul><div class="language-rust line-numbers-mode"><pre><code><span class="token keyword">use</span> <span class="token namespace">std<span class="token punctuation">::</span></span>thread<span class="token punctuation">;</span>

<span class="token keyword">fn</span> <span class="token function-definition function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">let</span> v <span class="token operator">=</span> <span class="token macro property">vec!</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

	<span class="token keyword">let</span> handle <span class="token operator">=</span> <span class="token namespace">thread<span class="token punctuation">::</span></span><span class="token function">spawn</span><span class="token punctuation">(</span><span class="token keyword">move</span> <span class="token closure-params"><span class="token closure-punctuation punctuation">|</span><span class="token closure-punctuation punctuation">|</span></span> <span class="token punctuation">{</span>
		<span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">&quot;Here&#39;s a vector: {:?}&quot;</span><span class="token punctuation">,</span> v<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// drop(v); // \u8FD9\u91CC\u4E0D\u80FD\u518D\u6267\u884Cdrop\u51FD\u6570\uFF0C\u56E0\u4E3Av\u7684\u6240\u6709\u6743\u5DF2\u7ECF\u4E0D\u518D\u6B64\u5904</span>

	handle<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">unwrap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h1 id="\u6D88\u606F\u4F20\u9012" tabindex="-1">\u6D88\u606F\u4F20\u9012</h1><ul><li>\u901A\u8FC7\u901A\u4FE1\u6765\u5171\u4EAB\u5185\u5B58</li></ul><h1 id="\u4F7F\u7528\u6D41\u5B9E\u73B0\u6D88\u606F\u4F20\u9012\u3002" tabindex="-1">\u4F7F\u7528\u6D41\u5B9E\u73B0\u6D88\u606F\u4F20\u9012\u3002</h1><ul><li>\u53D1\u9001\u8005\u5728\u4E0A\u6E38</li><li>\u63A5\u6536\u8005\u5728\u4E0B\u6E38</li></ul><div class="language-rust line-numbers-mode"><pre><code><span class="token keyword">use</span> <span class="token namespace">std<span class="token punctuation">::</span>sync<span class="token punctuation">::</span></span>mpsc<span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token namespace">std<span class="token punctuation">::</span></span>thread<span class="token punctuation">;</span>

<span class="token keyword">let</span> <span class="token punctuation">(</span>tx<span class="token punctuation">,</span> rx<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token namespace">mpsc<span class="token punctuation">::</span></span><span class="token function">channel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// \u5EFA\u7ACB\u901A\u9053</span>

<span class="token namespace">thread<span class="token punctuation">::</span></span><span class="token function">spawn</span><span class="token punctuation">(</span><span class="token keyword">move</span> <span class="token closure-params"><span class="token closure-punctuation punctuation">|</span><span class="token closure-punctuation punctuation">|</span></span> <span class="token punctuation">{</span>
	<span class="token keyword">let</span> m <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">::</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">&quot;hi&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	tx<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>m<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">unwrap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// send\u5C06m\u6240\u6709\u6743\u4F20\u51FA\u95ED\u5305</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> received <span class="token operator">=</span> rx<span class="token punctuation">.</span><span class="token function">recv</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">unwrap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// \u963B\u585E\u4E3B\u7EBF\u7A0B\u6267\u884C\u76F4\u5230\u4ECE\u901A\u9053\u4E2D\u63A5\u6536\u4E00\u4E2A\u503C</span>
<span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">&quot;{}&quot;</span><span class="token punctuation">,</span> received<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h2 id="\u591A\u751F\u4EA7\u8005\u5BF9\u5E94\u4E00\u4E2A\u6D88\u8D39\u8005" tabindex="-1">\u591A\u751F\u4EA7\u8005\u5BF9\u5E94\u4E00\u4E2A\u6D88\u8D39\u8005</h2><div class="language-rust line-numbers-mode"><pre><code><span class="token keyword">use</span> <span class="token namespace">std<span class="token punctuation">::</span>sync<span class="token punctuation">::</span></span>mpsc<span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token namespace">std<span class="token punctuation">::</span></span>thread<span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token namespace">std<span class="token punctuation">::</span>time<span class="token punctuation">::</span></span><span class="token class-name">Duration</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> <span class="token punctuation">(</span>tx<span class="token punctuation">,</span> rx<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token namespace">mpsc<span class="token punctuation">::</span></span><span class="token function">channel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> tx1 <span class="token operator">=</span> tx<span class="token punctuation">.</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// \u514B\u9686tx\u83B7\u53D6\u7B2C\u4E8C\u4E2A\u751F\u4EA7\u8005</span>
<span class="token namespace">thread<span class="token punctuation">::</span></span><span class="token function">spawn</span><span class="token punctuation">(</span><span class="token keyword">move</span> <span class="token closure-params"><span class="token closure-punctuation punctuation">|</span><span class="token closure-punctuation punctuation">|</span></span> <span class="token punctuation">{</span>
	<span class="token keyword">let</span> m <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">::</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">&quot;hi&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	tx<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>m<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">unwrap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token namespace">thread<span class="token punctuation">::</span></span><span class="token function">spawn</span><span class="token punctuation">(</span><span class="token keyword">move</span> <span class="token closure-params"><span class="token closure-punctuation punctuation">|</span><span class="token closure-punctuation punctuation">|</span></span> <span class="token punctuation">{</span>
	<span class="token keyword">let</span> ms <span class="token operator">=</span> <span class="token macro property">vec!</span><span class="token punctuation">[</span>
		<span class="token class-name">String</span><span class="token punctuation">::</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">&quot;more&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token class-name">String</span><span class="token punctuation">::</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">&quot;messages&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token class-name">String</span><span class="token punctuation">::</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">&quot;for&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token class-name">String</span><span class="token punctuation">::</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">&quot;you&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">]</span>

	<span class="token keyword">for</span> m <span class="token keyword">in</span> ms <span class="token punctuation">{</span>
		tx1<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>m<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">unwrap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token namespace">thread<span class="token punctuation">::</span></span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token class-name">Duration</span><span class="token punctuation">::</span><span class="token function">from_secs</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">for</span> received <span class="token keyword">in</span> rx <span class="token punctuation">{</span>
	<span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">&quot;Got: {}&quot;</span><span class="token punctuation">,</span> received<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><h1 id="\u5171\u4EAB\u72B6\u6001" tabindex="-1">\u5171\u4EAB\u72B6\u6001</h1><ul><li>\u901A\u8FC7\u5171\u4EAB\u5185\u5B58\u6765\u901A\u4FE1</li></ul><h2 id="\u4E92\u65A5\u9501" tabindex="-1">\u4E92\u65A5\u9501</h2><ul><li>\u4EFB\u610F\u65F6\u523B\uFF0C\u53EA\u5141\u8BB8\u4E00\u4E2A\u7EBF\u7A0B\u8BBF\u95EE\u67D0\u4E9B\u6570\u636E\u3002</li><li>\u9501\uFF1A\u4E00\u4E2A\u4F5C\u4E3A\u4E92\u65A5\u5668\u4E00\u90E8\u5206\u7684\u6570\u636E\u7ED3\u6784\uFF0C\u5B83\u8BB0\u5F55\u8C01\u6709\u6570\u636E\u7684\u6392\u4ED6\u8BBF\u95EE\u6743</li><li>\u4F7F\u7528 <ol><li>\u4F7F\u7528\u6570\u636E\u524D\u83B7\u53D6\u9501</li><li>\u4F7F\u7528\u6570\u636E\u540E\u89E3\u9501</li></ol></li><li>Rust \u63D0\u4F9B\u7684\u4E92\u65A5\u9501\uFF1A<code>Mutex&lt;T&gt;</code><ul><li>Mutex::new(val);</li><li>m.lock():\u83B7\u53D6\u9501\uFF0C\u8FD4\u56DE\u4E00\u4E2A\u53EB\u505A <code>MutexGuard</code> \u7684\u667A\u80FD\u6307\u9488 <ul><li>\u5B9E\u73B0\u4E86 <code>Deref</code> \u6765\u6307\u5411\u5176\u5185\u90E8\u6570\u636E</li><li>\u5B9E\u73B0\u4E86 <code>Drop</code> \u4F7F\u5F97<code>MutexGuard</code>\u79BB\u5F00\u4F5C\u7528\u57DF\u65F6\u81EA\u52A8\u91CA\u653E\u9501</li></ul></li></ul></li></ul><div class="language-rust line-numbers-mode"><pre><code><span class="token keyword">use</span> <span class="token namespace">std<span class="token punctuation">::</span>sync<span class="token punctuation">::</span></span><span class="token class-name">Mutex</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> m <span class="token operator">=</span> <span class="token class-name">Mutex</span><span class="token punctuation">::</span><span class="token function">new</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// \u521B\u5EFA\u4E92\u65A5\u9501\uFF0C\u4F20\u5165\u9700\u8981\u4FDD\u62A4\u7684\u6570\u636E</span>

<span class="token punctuation">{</span>
	<span class="token keyword">let</span> <span class="token keyword">mut</span> num <span class="token operator">=</span> m<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">unwrap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// \u8FD4\u56DEResult&lt;Ok, Err&gt;</span>
	<span class="token operator">*</span>num <span class="token operator">+=</span> <span class="token number">10</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token comment">// \u81EA\u52A8\u91CA\u653E\u9501</span>

<span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">&quot;m = {:?}&quot;</span><span class="token punctuation">,</span> m<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="\u7EBF\u7A0B\u95F4\u5171\u4EABmutex-t" tabindex="-1">\u7EBF\u7A0B\u95F4\u5171\u4EAB<code>Mutex&lt;T&gt;</code></h3><ul><li>\u8FD9\u6D89\u53CA\u5230\u591A\u7EBF\u7A0B\u548C\u591A\u6240\u6709\u6743</li><li>\u56E0\u4E3A<code>Rc&lt;T&gt;</code>\u53EA\u9002\u7528\u4E8E\u5355\u7EBF\u7A0B\uFF0C\u6240\u4EE5\u5F15\u5165\u4E00\u4E2A\u65B0\u7684\u7C7B\u578B<code>Arc&lt;T&gt;</code></li><li>\u539F\u5B50\u5F15\u7528\u8BA1\u6570\uFF1Aatomically reference counted\uFF0Capi \u4E0E Rc \u4E00\u6837\uFF0C\u4E0D\u540C\u7684\u662F\u53EF\u4EE5\u5B89\u5168\u7684\u5728\u7EBF\u7A0B\u95F4\u5171\u4EAB</li></ul><div class="language-rust line-numbers-mode"><pre><code><span class="token keyword">use</span> <span class="token namespace">std<span class="token punctuation">::</span>sync<span class="token punctuation">::</span></span><span class="token punctuation">{</span><span class="token class-name">Mutex</span><span class="token punctuation">,</span> <span class="token class-name">Arc</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token namespace">std<span class="token punctuation">::</span>time<span class="token punctuation">::</span></span><span class="token class-name">Duration</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> counter <span class="token operator">=</span> <span class="token class-name">Arc</span><span class="token punctuation">::</span><span class="token function">new</span><span class="token punctuation">(</span><span class="token class-name">Mutex</span><span class="token punctuation">::</span><span class="token function">new</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> <span class="token keyword">mut</span> handles <span class="token operator">=</span> <span class="token macro property">vec!</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">for</span> _ <span class="token keyword">in</span> <span class="token number">0</span><span class="token punctuation">..</span><span class="token number">10</span> <span class="token punctuation">{</span>
	<span class="token keyword">let</span> counter <span class="token operator">=</span> <span class="token class-name">Arc</span><span class="token punctuation">::</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>counter<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">let</span> handle <span class="token operator">=</span> <span class="token namespace">thread<span class="token punctuation">::</span></span><span class="token function">spawn</span><span class="token punctuation">(</span><span class="token keyword">move</span> <span class="token closure-params"><span class="token closure-punctuation punctuation">|</span><span class="token closure-punctuation punctuation">|</span></span> <span class="token punctuation">{</span>
		<span class="token keyword">let</span> <span class="token keyword">mut</span> num <span class="token operator">=</span> counter<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">unwrap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token operator">*</span>num <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	handles<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>handle<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">for</span> handle <span class="token keyword">in</span> handles <span class="token punctuation">{</span>
	handle<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">unwrap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">&quot;Result: {}&quot;</span><span class="token punctuation">,</span> <span class="token operator">*</span>counter<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">unwrap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h3 id="refcell-t-rc-t-\u4E0E-mutex-t-arc-t-\u7684\u76F8\u4F3C\u6027" tabindex="-1"><code>RefCell&lt;T&gt;</code>/<code>Rc&lt;T&gt;</code> \u4E0E <code>Mutex&lt;T&gt;</code>/<code>Arc&lt;T&gt;</code> \u7684\u76F8\u4F3C\u6027</h3><ul><li><code>Mutex&lt;T&gt;</code>\u63D0\u4F9B\u4E86\u5185\u90E8\u53EF\u53D8\u6027\uFF0C\u4E0E Cell \u5BB6\u65CF\u4E00\u6837</li><li>\u6211\u4EEC\u4F7F\u7528<code>RefCell&lt;T&gt;</code>\u6765\u6539\u53D8<code>Rc&lt;T&gt;</code>\u91CC\u9762\u7684\u5185\u5BB9</li><li>\u6211\u4EEC\u4F7F\u7528<code>Mutex&lt;T&gt;</code>\u6765\u6539\u53D8<code>Arc&lt;T&gt;</code>\u91CC\u9762\u7684\u5185\u5BB9</li><li>\u6CE8\u610F\uFF1A<code>Mutex&lt;T&gt;</code>\u6709\u6B7B\u9501\u98CE\u9669</li></ul><h1 id="\u53EF\u6269\u5C55\u5E76\u53D1" tabindex="-1">\u53EF\u6269\u5C55\u5E76\u53D1</h1><ul><li>\u8BED\u8A00\u672C\u8EAB\u6CA1\u6709\u591A\u5C11\u4E0E\u5E76\u53D1\u76F8\u5173\u7684\u7279\u6027\uFF0C\u57FA\u672C\u5168\u9760\u6807\u51C6\u5E93\u3002\u6240\u4EE5\u4E5F\u53EF\u4EE5\u81EA\u5B9E\u73B0\u5E76\u53D1\u529F\u80FD\u3002</li><li>\u4E24\u4E2A\u5185\u5D4C\u4E8E\u8BED\u8A00\u4E2D\u7684\u5E76\u53D1\u6982\u5FF5\uFF1A<code>std::marker</code> \u4E2D\u7684 <code>Sync</code> \u548C <code>Send</code> trait</li><li>\u5728\u591A\u7EBF\u7A0B\u573A\u666F\u4E0B <ul><li>send \u8868\u660E\u6240\u6709\u6743\u53EF\u4F20\u9012 <ul><li>\u901A\u8FC7\u901A\u8BAF\u5171\u4EAB\u5185\u5B58</li></ul></li><li>sync \u4FDD\u8BC1\u6240\u6709\u6743\u7684\u5F15\u7528\u53EF\u4EE5\u5B89\u5168\u7684\u4F20\u9012\u4E8E\u591A\u4E2A\u7EBF\u7A0B\u4E2D <ul><li>\u901A\u8FC7\u5171\u4EAB\u5185\u5B58\u8FDB\u884C\u901A\u8BAF</li></ul></li></ul></li></ul><h2 id="send" tabindex="-1">Send</h2><ul><li><code>Send</code> \u6807\u8BB0 trait \u8868\u660E\u7C7B\u578B\u7684\u6240\u6709\u6743\u53EF\u4EE5\u5728\u7EBF\u7A0B\u95F4\u4F20\u9012\u3002 <ul><li><code>Arc&lt;T&gt;</code>\u662F Send \u7684\uFF0C<code>Rc&lt;T&gt;</code>\u4E0D\u662F</li></ul></li><li>\u4EFB\u4F55\u5B8C\u5168\u7531 <code>Send</code> \u7684\u7C7B\u578B\u7EC4\u6210\u7684\u7C7B\u578B\u4E5F\u4F1A\u81EA\u52A8\u88AB\u6807\u8BB0\u4E3A <code>Send</code>\u3002(\u6CA1\u61C2)</li><li>\u51E0\u4E4E\u6240\u6709\u57FA\u672C\u7C7B\u578B\u90FD\u662F <code>Send</code> \u7684\uFF0C\u9664\u4E86\u88F8\u6307\u9488</li></ul><h2 id="sync" tabindex="-1">Sync</h2><ul><li><code>Sync</code> \u6807\u8BB0 trait \u8868\u660E\u7C7B\u578B\u53EF\u4EE5\u5B89\u5168\u7684\u5728\u591A\u4E2A\u7EBF\u7A0B\u4E2D\u62E5\u6709\u5176\u503C\u7684\u5F15\u7528\u3002 <ul><li><ul><li><code>Mutex&lt;T&gt;</code>\u662F Sync \u7684\uFF0C<code>RefCell&lt;T&gt;</code>\u4E0D\u662F</li></ul></li></ul></li><li>\u5BF9\u4E8E\u4EFB\u610F\u7C7B\u578B <code>T</code>\uFF0C\u5982\u679C <code>&amp;T</code>\u662F <code>Send</code> \u7684\u8BDD <code>T</code> \u5C31\u662F <code>Sync</code> \u7684 <ul><li>\u610F\u5473\u7740\u5176\u5F15\u7528\u5C31\u53EF\u4EE5\u5B89\u5168\u7684\u53D1\u9001\u5230\u53E6\u4E00\u4E2A\u7EBF\u7A0B</li></ul></li><li>\u4EFB\u4F55\u5B8C\u5168\u7531 <code>Sync</code> \u7684\u7C7B\u578B\u7EC4\u6210\u7684\u7C7B\u578B\u4E5F\u4F1A\u81EA\u52A8\u88AB\u6807\u8BB0\u4E3A <code>Sync</code>\u3002</li></ul><h2 id="\u6CE8\u610F" tabindex="-1">\u6CE8\u610F</h2><ul><li>\u624B\u52A8\u5B9E\u73B0 <code>Send</code> \u548C <code>Sync</code> \u662F\u4E0D\u5B89\u5168\u7684</li><li>\u901A\u5E38\u5E76\u4E0D\u9700\u8981\u624B\u52A8\u5B9E\u73B0 <code>Send</code> \u548C <code>Sync</code> trait <ul><li>\u7531 <code>Send</code> \u548C <code>Sync</code> \u7684\u7C7B\u578B\u7EC4\u6210\u7684\u7C7B\u578B\uFF0C\u81EA\u52A8\u5C31\u662F <code>Send</code> \u548C <code>Sync</code> \u7684</li></ul></li></ul><h1 id="\u603B\u7ED3" tabindex="-1">\u603B\u7ED3</h1><ul><li>Rust \u63D0\u4F9B\u4E86 <ul><li>\u7528\u4E8E\u6D88\u606F\u4F20\u9012\u7684\u901A\u9053</li><li>\u53EF\u4EE5\u5B89\u5168\u7684\u7528\u4E8E\u5E76\u53D1\u4E0A\u4E0B\u6587\u7684\u667A\u80FD\u6307\u9488</li></ul></li><li>\u7C7B\u578B\u7CFB\u7EDF\u548C\u501F\u7528\u68C0\u67E5\u5668\u4F1A\u786E\u4FDD\u4EE3\u7801\u4E0D\u4F1A\u51FA\u73B0\u6570\u636E\u7ADE\u4E89\u548C\u65E0\u6548\u7684\u5F15\u7528</li></ul>`,36),c=[e];function o(l,u,i,r,k,d){return a(),s("div",null,c)}var y=n(t,[["render",o]]);export{b as __pageData,y as default};
