import{_ as n,c as s,o as a,a as e}from"./app.6117d463.js";const m='{"title":"\u6784\u5EFA\u4E0E\u7F16\u7801\u5B9E\u8DF5\uFF1A\u5BF9\u4E8E\u6784\u5EFANode\u7A0B\u5E8F\u7684\u5EFA\u8BAE","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u6784\u5EFA\u4E0E\u7F16\u7801\u5B9E\u8DF5\uFF1A\u5BF9\u4E8E\u6784\u5EFANode\u7A0B\u5E8F\u7684\u5EFA\u8BAE","slug":"\u6784\u5EFA\u4E0E\u7F16\u7801\u5B9E\u8DF5\uFF1A\u5BF9\u4E8E\u6784\u5EFAnode\u7A0B\u5E8F\u7684\u5EFA\u8BAE"},{"level":2,"title":"\u5DE5\u5177\uFF1A\u4E0E\u7B2C\u4E09\u65B9\u5E93\u5408\u4F5C","slug":"\u5DE5\u5177\uFF1A\u4E0E\u7B2C\u4E09\u65B9\u5E93\u5408\u4F5C"},{"level":2,"title":"\u6D4B\u8BD5","slug":"\u6D4B\u8BD5"},{"level":2,"title":"\u6027\u80FD","slug":"\u6027\u80FD"}],"relativePath":"essay/tao-of-node.md"}',p={},l=e(`<ul><li>link:<a href="https://alexkondov.com/tao-of-node/" target="_blank" rel="noopener noreferrer">tao-of-node</a></li></ul><h2 id="\u6784\u5EFA\u4E0E\u7F16\u7801\u5B9E\u8DF5\uFF1A\u5BF9\u4E8E\u6784\u5EFAnode\u7A0B\u5E8F\u7684\u5EFA\u8BAE" tabindex="-1">\u6784\u5EFA\u4E0E\u7F16\u7801\u5B9E\u8DF5\uFF1A\u5BF9\u4E8E\u6784\u5EFANode\u7A0B\u5E8F\u7684\u5EFA\u8BAE</h2><ul><li>\u9879\u76EE\u7ED3\u6784\uFF1A\u4EE5\u670D\u52A1\u57DF\u4E3A\u4E2D\u5FC3\u6784\u5EFA\uFF0C\u800C\u4E0D\u662FMVC\u6765\u628A\u6240\u6709\u903B\u8F91\u90FD\u585E\u5230controller\u4E2D\uFF0C\u76F8\u5F53\u4E8E\u53BB\u4E2D\u5FC3\u5316\uFF0C\u7528\u6237\u6A21\u5757\u96C6\u6210\u6240\u6709\u7528\u6237\u7684\u903B\u8F91\uFF0C\u6743\u9650\u6A21\u5757\u96C6\u6210\u6240\u6709\u6743\u9650\u7684\u903B\u8F91</li></ul><div class="language-text line-numbers-mode"><pre><code>// \u{1F44E} Don&#39;t structure by technical responsibilities
\u251C\u2500\u2500 src
|   \u251C\u2500\u2500 controllers
|   |   \u251C\u2500\u2500 user.js
|   |   \u251C\u2500\u2500 catalog.js
|   |   \u251C\u2500\u2500 order.js
|   \u251C\u2500\u2500 models
|   |   \u251C\u2500\u2500 user.js
|   |   \u251C\u2500\u2500 product.js
|   |   \u251C\u2500\u2500 order.js
|   \u251C\u2500\u2500 utils
|   |   \u251C\u2500\u2500 order.js
|   \u251C\u2500\u2500 tests
|   |   \u251C\u2500\u2500 user.test.js
|   |   \u251C\u2500\u2500 product.test.js

// \u{1F44D} Structure by domain modules
\u251C\u2500\u2500 src
|   \u251C\u2500\u2500 user
|   |   \u251C\u2500\u2500 user-handlers.js
|   |   \u251C\u2500\u2500 user-service.js
|   |   \u251C\u2500\u2500 user-queries.js
|   |   \u251C\u2500\u2500 user-handlers.test.js
|   |   \u251C\u2500\u2500 index.js
|   \u251C\u2500\u2500 order
|   |   \u251C\u2500\u2500 order-handlers.js
|   |   \u251C\u2500\u2500 order-service.js
|   |   \u251C\u2500\u2500 order-queries.js
|   |   \u251C\u2500\u2500 order-handlers.test.js
|   |   \u251C\u2500\u2500 calculate-shipping.js
|   |   \u251C\u2500\u2500 calculate-shipping.test.js
|   |   \u251C\u2500\u2500 index.js
|   \u251C\u2500\u2500 catalog
|   |   \u251C\u2500\u2500 catalog-handlers.js
|   |   \u251C\u2500\u2500 product-queries.js
|   |   \u251C\u2500\u2500 catalog-handlers.test.js
|   |   \u251C\u2500\u2500 index.js
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div><ul><li>\u5728\u5F00\u59CB\u4E00\u4E2A\u9879\u76EE\u65F6\uFF0C\u7B14\u8005\u5EFA\u8BAE\u4ECE\u6A21\u5757(\u57DF)\u5316\u5F00\u59CB\uFF0C\u5C3D\u7BA1\u5FAE\u670D\u52A1\u67B6\u6784\u5177\u6709\u66F4\u5F3A\u7684\u53EF\u4F38\u7F29\u6027\uFF0C\u4F46\u662F\u4E5F\u4F1A\u5E26\u6765\u5206\u5E03\u5F0F\u7CFB\u7EDF\u7684\u76F8\u5173\u95EE\u9898\u3002\u4F46\u662F\u6CE8\u610F\uFF0C\u5728\u6A21\u5757\u5316\u7684\u8FC7\u7A0B\u4E2D\uFF0C\u8981\u65F6\u523B\u5E26\u6709\u5FAE\u670D\u52A1\u7684\u601D\u60F3\uFF0C\u5C06\u6BCF\u4E2A\u6A21\u5757\u89C6\u4E3A\u4E00\u4E2A\u53EF\u62BD\u79BB\u7684\u5FAE\u670D\u52A1\uFF0C\u5C06\u6765\u8FDB\u884C\u8FC1\u79FB\u65F6\u7684\u6210\u672C\u5C31\u4F1A\u964D\u4F4E\u3002</li><li>\u5728\u5927\u578B\u9879\u76EE\u4E2D\u6CE8\u610F\u5206\u5C42\u5B9E\u73B0\u903B\u8F91\uFF0C\u6765\u8FBE\u6210\u6700\u5927\u7A0B\u5EA6\u7684\u903B\u8F91\u590D\u7528\uFF0C <ul><li>\u4F8B\u5982http\u5C42\u5904\u7406\u8BF7\u6C42\u76F8\u5173\u7684\u903B\u8F91\uFF0Cservice\u5904\u7406\u4E1A\u52A1\u76F8\u5173\u7684\u903B\u8F91\uFF0Cmodal\u5C42\u5904\u7406\u6570\u636E\u5E93\u76F8\u5173\u7684\u903B\u8F91\uFF0Cetc.</li><li>\u5982\u679C\u4E00\u4E2A\u5C42\u7EA7\u7684\u903B\u8F91\u8D23\u4EFB\u4ECD\u7136\u8FC7\u591A\uFF0C\u90A3\u4E48\u5C31\u9700\u8981\u804C\u8D23\u5206\u79BB\uFF0C\u5C06\u5355\u4E00\u804C\u8D23\u5206\u5230\u5355\u72EC\u7684\u51FD\u6570\u4E2D\u3002</li><li>\u548C\u53EF\u7EC4\u5408\u7684\u51FD\u6570\u7C7B\u4F3C\u7684\u601D\u60F3</li></ul></li><li>\u7528\u670D\u52A1\u5728\u6A21\u5757(\u57DF)\u95F4\u8FDB\u884C\u901A\u4FE1\uFF0C\u8FD9\u6837\u53EF\u4EE5\u907F\u514D\u5728\u57DF\u5916\u5BF9\u57DF\u8FDB\u884C\u4FEE\u6539\u800C\u57DF\u4E0D\u81EA\u77E5</li><li>\u521B\u5EFA\u57DF\u7684\u5B9E\u4F53\u6765\u8C03\u7528\u5BF9\u5E94\u57DF\u7684\u670D\u52A1\uFF0C\u8FD9\u6837\u53EF\u4EE5\u907F\u514D\u66B4\u9732\u57DF\u7684\u76F8\u5173\u6570\u636E</li><li>\u5206\u79BB\u5DE5\u5177\u51FD\u6570\u4E0E\u57DF\u7684\u903B\u8F91\uFF0C\u5373\u5728\u57DF\u4E4B\u5916\u5355\u72EC\u521B\u5EFA\u4E00\u4E2A\u4E0E\u4E1A\u52A1\u65E0\u5173\u7684\u5DE5\u5177\u57DF\u6765\u8FDB\u884C\u903B\u8F91\u590D\u7528</li><li>\u4F7F\u7528joi\u6765\u9A8C\u8BC1\u8BF7\u6C42\u6570\u636E\u7684\u6570\u636E\u7ED3\u6784\u662F\u5426\u7B26\u5408\u9884\u671F <ul><li>\u4E00\u4E2A\u7C7B\u4F3C\u7684\u5E93(\u652F\u6301typescript)\uFF1A<a href="https://github.com/colinhacks/zod" target="_blank" rel="noopener noreferrer">zod</a></li></ul></li><li>\u53EF\u4EE5\u521B\u5EFA\u4E00\u4E2A\u9A8C\u8BC1\u4E2D\u95F4\u4EF6\uFF0C\u901A\u8FC7\u52A0\u8F7D\u5BF9\u5E94schema\u5BF9\u4E0D\u540C\u7684\u6570\u636E\u8FDB\u884C\u9A8C\u8BC1</li></ul><div class="language-js line-numbers-mode"><pre><code><span class="token comment">// Create a reusable validation middleware</span>
<span class="token keyword">const</span> <span class="token function-variable function">validateBody</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">schema</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> value<span class="token punctuation">,</span> error <span class="token punctuation">}</span> <span class="token operator">=</span> Joi<span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span>schema<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">validate</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>body<span class="token punctuation">)</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> errorMessage <span class="token operator">=</span> error<span class="token punctuation">.</span>details
      <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">details</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> details<span class="token punctuation">.</span>message<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&#39;, &#39;</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> <span class="token function">next</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">AppError</span><span class="token punctuation">(</span>httpStatus<span class="token punctuation">.</span><span class="token constant">BAD_REQUEST</span><span class="token punctuation">,</span> errorMessage<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span>req<span class="token punctuation">,</span> value<span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// Use it in the route definitions</span>
app<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&#39;/user&#39;</span><span class="token punctuation">,</span> <span class="token function">validate</span><span class="token punctuation">(</span>userSchema<span class="token punctuation">)</span><span class="token punctuation">,</span> handlers<span class="token punctuation">.</span>updateUser<span class="token punctuation">)</span>
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><ul><li>\u4E0D\u8981\u5728\u4E2D\u95F4\u4EF6\u4E2D\u5904\u7406\u4E1A\u52A1\u903B\u8F91\uFF0C\u53EA\u9700\u8981\u8C03\u7528\u76F8\u5173\u57DF\u7684\u670D\u52A1\u5373\u53EF</li><li>\u8BBE\u7F6E\u8BF7\u6C42\u5904\u7406\u51FD\u6570(\u53EF\u4EE5\u5229\u7528\u5DE5\u5382\u6A21\u5F0F\u751F\u6210)\uFF0C\u800C\u4E0D\u662F\u63A7\u5236\u5668\u7C7B(\u5982\u679C\u4E0D\u662F\u7279\u522B\u91CD\u7684oop\u7CFB\u7EDF)</li></ul><div class="language-js line-numbers-mode"><pre><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">createHandler</span><span class="token punctuation">(</span><span class="token parameter">logger<span class="token punctuation">,</span> userService</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">updateDetails</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// User the logger and service in here</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><ul><li>\u4F7F\u7528error\u5BF9\u8C61\u6216\u8005\u6269\u5C55\u5B83\uFF0C\u4E3A\u9519\u8BEF\u6DFB\u52A0\u66F4\u591A\u7EC6\u8282\u4FE1\u606F</li><li>\u76D1\u542C\u8FDB\u7A0B\u4FE1\u53F7(<code>process.on(&#39;uncaughtException&#39;, (err) =&gt; {})</code>)\uFF0C\u4F8B\u5982\u5728\u53D1\u751F\u672A\u6355\u83B7\u7684\u9519\u8BEF\u65F6log\u9519\u8BEF\u5E76\u9000\u51FA</li><li>\u521B\u5EFA\u9519\u8BEF\u5904\u7406\u6A21\u5757\uFF0C\u7528\u6765\u6536\u96C6\u7CFB\u7EDF\u65E5\u5FD7\u548C\u4E3A\u9519\u8BEF\u5904\u7406\u515C\u5E95\uFF0C\u4F8B\u5982404\u548C500</li><li>\u5728\u57DF\u4E2D\u5904\u7406\u8DEF\u7531\uFF0C\u4E3A\u8DEF\u7531\u6DFB\u52A0\u7248\u672C\u524D\u7F00\u4EE5\u786E\u4FDD\u8FDB\u884C\u4E0D\u53EF\u907F\u514D\u7684\u7834\u574F\u6027\u66F4\u65B0\u65F6\u662F\u65E0\u75DB\u7684\uFF1A<code>router.prefix(&#39;/v1&#39;)</code></li><li>\u4EE3\u7801\u98CE\u683C\u7684\u4E00\u81F4\u6027\uFF1A\u98CE\u683C=\u6837\u5F0F+\u547D\u540D\uFF0C\u6837\u5F0F\u53EF\u4EE5\u901A\u8FC7eslint\u548Cprettier\u6765\u4FDD\u8BC1\uFF0C\u53EF\u4EE5\u5728\u9884\u63D0\u4EA4\u9636\u6BB5\u901A\u8FC7husky\u548Clint-staged\u6765\u5BF9\u63D0\u4EA4\u7684\u4EE3\u7801\u8FDB\u884Clint\u68C0\u67E5\u4ECE\u800C\u4FDD\u8BC1\u7EBF\u4E0A\u4EE3\u7801\u7684\u6837\u5F0F\u4E00\u81F4\u6027\uFF0C\u4F46\u547D\u540D\u73B0\u9636\u6BB5\u5C31\u53EA\u80FD\u9760\u56E2\u961F\u98CE\u683C\u4E86</li><li>\u5728\u7ECF\u8FC7\u8EAB\u4EFD\u9A8C\u8BC1\u7684\u8BF7\u6C42\u4E0A\u4FDD\u5B58\u4E00\u4E9B\u5FC5\u8981\u7684\u4FE1\u606F</li></ul><h2 id="\u5DE5\u5177\uFF1A\u4E0E\u7B2C\u4E09\u65B9\u5E93\u5408\u4F5C" tabindex="-1">\u5DE5\u5177\uFF1A\u4E0E\u7B2C\u4E09\u65B9\u5E93\u5408\u4F5C</h2><ul><li>\u4F7F\u7528\u6781\u7B80\u5DE5\u5177</li><li>\u597D\u597D\u5B66express\uFF0C\u56E0\u4E3A\u4ED6\u662Fnode\u54F2\u5B66\u7684\u4EE3\u8868\uFF0C\u5927\u90E8\u5206\u7684\u6846\u67B6\u90FD\u662F\u5728express\u7684\u7406\u5FF5\u4E0A\u8FDB\u884C\u6269\u5C55\uFF0C\u6240\u4EE5\u6027\u4EF7\u6BD4\u6700\u9AD8 <ul><li>nest\uFF1A\u4F7F\u7528typescript\u7684\u975Enode\u54F2\u5B66\u6846\u67B6\uFF0C\u4E0D\u8FC7\u5DF2\u7ECF\u6709\u5F88\u591A\u5927\u516C\u53F8\u5728\u7528\u4E86</li><li>fastify\uFF1A\u7406\u5FF5\u4E0Eexpress\u76F8\u540C\uFF0C\u53EA\u4E0D\u8FC7\u63D0\u4F9B\u4E86\u8BB8\u591A\u5F00\u7BB1\u5373\u7528\u7684\u5DE5\u5177</li></ul></li><li>\u5728\u521B\u9020\u62BD\u8C61\u65F6\uFF0C\u5EFA\u8BAE\u63D0\u53D6\u5E93\u800C\u4E0D\u662F\u4E00\u4E2A\u5355\u72EC\u7684\u670D\u52A1\uFF0C\u4F46\u662F\u5982\u679C\u9700\u6C42\u53D8\u5316\u8FC7\u5FEB\u5C31\u4E0D\u5EFA\u8BAE\u63D0\u53D6\u6210\u5E93\u4E86\uFF0C\u6765\u56DE\u590D\u5236\u5427</li><li>\u5C3D\u91CF\u4F7F\u7528\u539F\u751F\u65B9\u6CD5\u800C\u4E0D\u662F\u5E93</li><li>\u4F7F\u7528\u7ED3\u6784\u5316\u7684logger <ul><li>\u56E0\u4E3Alog\u592A\u591A\uFF0C\u6709logger\u5E2E\u52A9\u4F60\u5206\u6790log\u5E76\u4E14\u5728\u53D1\u751F\u9519\u8BEF\u65F6\u5411\u4F60\u62A5\u8B66</li><li>splunk\uFF0Cnew relic</li><li>winston(\u4E00\u76F4\u6709\u95EE\u9898\u800C\u4E14\u4E0D\u7EF4\u62A4\u4E86),pino(fastify\u9ED8\u8BA4logger)</li></ul></li><li>\u4E3A\u5E94\u7528\u4E1A\u52A1\u5C42\u7F16\u5199\u6587\u6863\u597D\u8BA9\u5176\u4ED6\u4EBA\u7406\u89E3</li><li>\u5C3D\u91CF\u4F7F\u7528\u67E5\u8BE2\u6784\u9020\u5668\u800C\u4E0D\u662Form <ul><li>orm\u5177\u6709\u989D\u5916\u7684\u5B66\u4E60\u6210\u672C\uFF0Csql\u90FD\u5199\u51FA\u6765\u4E86\u8FD8\u8981\u53BB\u67E5\u76F8\u5E94\u7684api</li><li>\u590D\u6742\u67E5\u8BE2\u7684\u6027\u80FD\u4E0D\u597D\uFF0C\u5E76\u4E14\u4E0D\u597D\u6D4B\u8BD5\u548C\u4F18\u5316</li><li>\u67E5\u8BE2\u6784\u9020\u5668\u63A8\u8350knex\u548Cmongo\u81EA\u5E26\u7684\uFF0C\u7C7Borm\u5DE5\u5177\u63A8\u8350prisma</li></ul></li><li>\u9501\u4F9D\u8D56\u7248\u672C</li><li>\u4F7F\u7528typescript</li><li>\u4F7F\u7528snyk\u6765\u62A5\u544A\u4F60\u7684\u6240\u4F7F\u7528\u7684\u7B2C\u4E09\u65B9\u5305\u4E2D\u7684\u5173\u952E\u6216\u4E25\u91CD\u6F0F\u6D1E</li><li>\u5BB9\u5668\u5316\u5E94\u7528</li><li>\u4E0D\u8981\u8003\u8651\u66F4\u6362\u6570\u636E\u5E93\uFF0C\u9664\u975E\u5B83\u4F1A\u8BA9\u4F60\u7684\u901F\u5EA6\u589E\u957F5-10\u500D</li><li>\u5C01\u88C5\u4F60\u7684\u914D\u7F6E(\u6570\u636E\u5E93\u8D26\u53F7\u5BC6\u7801\uFF0C\u79D8\u94A5\u7B49)\u5230\u5355\u72EC\u7684\u6587\u4EF6\u5185</li></ul><h2 id="\u6D4B\u8BD5" tabindex="-1">\u6D4B\u8BD5</h2><ul><li>\u5982\u679C\u53EA\u6709\u6709\u9650\u7684\u6D4B\u8BD5\u8D44\u6E90\uFF0C\u5EFA\u8BAE\u4F18\u5148\u8FDB\u884C\u96C6\u6210\u6D4B\u8BD5</li><li>mocking &amp; \u4F9D\u8D56\u6CE8\u5165</li><li>\u5BF9\u4E1A\u52A1\u903B\u8F91\u6267\u884C\u5355\u5143\u6D4B\u8BD5\uFF0C\u800C\u4E0D\u662F\u7B2C\u4E09\u65B9\u5E93\u7684\u5C01\u88C5</li><li>\u6D4B\u8BD5\u8986\u76D6\u738799%\u548C100%\u662F\u4E24\u79CD\u6982\u5FF5\uFF0C\u5373\u4F7F\u73AF\u5883\u4E0D\u5141\u8BB8\u4F60\u6D4B\u8BD5\u6240\u6709\u5185\u5BB9\uFF0C\u90A3\u4E5F\u81F3\u5C11\u4E3A\u4F60\u8981\u6DFB\u52A0\u7684\u65B0\u529F\u80FD\u6DFB\u52A0\u6D4B\u8BD5</li><li>\u4E09A\u6A21\u5F0F(arrange-act-assert)(\u6211\u53EB\u4ED6\u4E3A\u4E09\u6B65\u8D70\u6A21\u5F0F)\uFF1A\u51C6\u5907\u73AF\u5883-&gt;\u6267\u884C\u8981\u6D4B\u8BD5\u7684\u903B\u8F91-&gt;\u5BF9\u6267\u884C\u7ED3\u679C\u8FDB\u884C\u65AD\u8A00</li></ul><h2 id="\u6027\u80FD" tabindex="-1">\u6027\u80FD</h2><ul><li>\u6B63\u786E\u4F7F\u7528Node\uFF0C\u5C06\u4F1A\u63D0\u4F9B\u60CA\u4EBA\u7684\u6027\u80FD\uFF0C\u5373\u5C06Node\u7528\u4E8EIO\u5BC6\u96C6\u578B\u4EFB\u52A1\uFF0C\u5F53\u9047\u5230\u8BA1\u7B97\u5BC6\u96C6\u578B\u4EFB\u52A1\u65F6\uFF0C\u5E94\u8BE5\u60F3\u529E\u6CD5\u5C06\u5B83\u79FB\u51FA\u5230\u5176\u4ED6\u5730\u65B9\u89E3\u51B3\uFF0C\u5982\u679C\u6027\u80FD\u5F88\u91CD\u8981\uFF0C\u5E76\u4E14\u4F60\u4E5F\u4E0D\u5F97\u4E0D\u4F7F\u7528node\u6267\u884C\u8BA1\u7B97\u5BC6\u96C6\u578B\u4EFB\u52A1\u65F6\uFF0C\u6700\u597D\u91CD\u65B0\u8003\u8651\u662F\u5426\u8981\u4F7F\u7528node</li><li>\u4EE3\u7801\u7684\u7B97\u6CD5\u590D\u6742\u5EA6\u5E38\u5E38\u90FD\u4E0D\u662F\u5E94\u7528\u8FD0\u884C\u7684\u6027\u80FD\u74F6\u9888\uFF0C\u5F53\u9047\u5230\u6027\u80FD\u95EE\u9898\u65F6\uFF0C\u66F4\u5E94\u8BE5\u5148\u5173\u6CE8\u4E0E\u5916\u90E8\u670D\u52A1\u7684\u901A\u4FE1\uFF0C\u4F8B\u5982\u5BF9\u6570\u636E\u5E93\u8FDB\u884C\u67E5\u8BE2\u65F6\u5728\u591A\u5927\u7A0B\u5EA6\u4E0A\u5229\u7528\u4E86\u6570\u636E\u5E93\u7684\u8BBE\u8BA1\uFF0C\u6216\u8005\u662F\u7F51\u7EDC\u4F18\u5316\u95EE\u9898(\u63D0\u5347http\u7248\u672C\uFF0C\u5584\u7528\u7F13\u5B58(redis\u7F13\u5B58\uFF0Chttp\u7F13\u5B58)\uFF0C\u51CF\u5C11\u4E0D\u5FC5\u8981\u7684\u8BF7\u6C42\uFF0C\u6700\u5927\u5229\u7528http\u534F\u8BAE\u7684\u7279\u6027\uFF0C\u4F8B\u5982\u591A\u8DEF\u590D\u7528\u548C\u957F\u94FE\u63A5)</li><li>\u597D\u7684\u8BBE\u8BA1\u5E26\u6765\u597D\u7684\u6027\u80FD\uFF0C\u6027\u80FD\u4F18\u5316\u53EA\u80FD\u4EA1\u7F8A\u8865\u7262</li></ul>`,15),t=[l];function i(o,r,c,u,b,k){return a(),s("div",null,t)}var g=n(p,[["render",i]]);export{m as __pageData,g as default};
