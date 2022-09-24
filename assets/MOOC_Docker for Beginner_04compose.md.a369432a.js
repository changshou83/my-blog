import{_ as n,c as s,o as a,a as e}from"./app.6117d463.js";const d='{"title":"\u4E00\u53E5\u8BDD","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u4E00\u53E5\u8BDD","slug":"\u4E00\u53E5\u8BDD"},{"level":2,"title":"\u4E3E\u4F8B","slug":"\u4E3E\u4F8B"},{"level":3,"title":"\u4E0D\u4F7F\u7528compose","slug":"\u4E0D\u4F7F\u7528compose"},{"level":3,"title":"\u4F7F\u7528compose","slug":"\u4F7F\u7528compose"},{"level":2,"title":"\u4E0D\u540C\u7248\u672C","slug":"\u4E0D\u540C\u7248\u672C"},{"level":3,"title":"\u7B2C\u4E00\u7248","slug":"\u7B2C\u4E00\u7248"},{"level":3,"title":"\u7B2C\u4E8C\u7248","slug":"\u7B2C\u4E8C\u7248"},{"level":3,"title":"\u7B2C\u4E09\u7248","slug":"\u7B2C\u4E09\u7248"}],"relativePath":"MOOC/Docker for Beginner/04compose.md"}',p={},t=e(`<h2 id="\u4E00\u53E5\u8BDD" tabindex="-1">\u4E00\u53E5\u8BDD</h2><p>\u6839\u636Eyaml\u6587\u4EF6\u5FEB\u901F\u8D77\u591A\u4E2A\u5BB9\u5668\u5E94\u7528(\u4E0D\u7528\u4E00\u4E2A\u4E00\u4E2Arun\u5E76\u628A\u5B83\u4EEC\u8FDE\u63A5\u8D77\u6765\u4E86)</p><ul><li>\u4F18\u70B9\uFF1A\u53EF\u4EE5\u5728\u6587\u4EF6\u4E2D\u5B9A\u4E49\u5E94\u7528\u7A0B\u5E8F\u5806\u6808\uFF0C\u5C06\u5176\u4FDD\u7559\u5728\u9879\u76EE\u5B58\u50A8\u5E93\u7684\u6839\u76EE\u5F55\uFF08\u73B0\u5728\u7531\u7248\u672C\u63A7\u5236\uFF09\u4E2D</li></ul><h2 id="\u4E3E\u4F8B" tabindex="-1">\u4E3E\u4F8B</h2><ul><li>\u4E00\u4E2A\u6295\u7968\u5E94\u7528 <ul><li>\u6295\u7968 python</li><li>\u5B58\u50A8\u6295\u7968\u7ED3\u679C redis</li><li>\u5904\u7406\u6295\u7968\u7ED3\u679C .net</li><li>\u5B58\u50A8\u7EDF\u8BA1\u7ED3\u679C postgres</li><li>\u5C55\u793A\u7EDF\u8BA1\u7ED3\u679C nodejs</li></ul></li></ul><h3 id="\u4E0D\u4F7F\u7528compose" tabindex="-1">\u4E0D\u4F7F\u7528compose</h3><div class="language-shell line-numbers-mode"><pre><code><span class="token function">docker</span> run -d --name<span class="token operator">=</span>redis redis
<span class="token function">docker</span> run -d --name<span class="token operator">=</span>db postgres
<span class="token function">docker</span> run -d --name<span class="token operator">=</span>vote -p <span class="token number">5000</span>:80 --link redis:redis voting-app
<span class="token function">docker</span> run -d --name<span class="token operator">=</span>result -p <span class="token number">5001</span>:80 --link db:db result-app
<span class="token function">docker</span> run -d --name<span class="token operator">=</span>worker --link db:db --link redis:redis worker
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="\u4F7F\u7528compose" tabindex="-1">\u4F7F\u7528compose</h3><ol><li><a href="https://dockerdocs.cn/compose/install/" target="_blank" rel="noopener noreferrer">\u5B89\u88C5docker compose</a>(\u5982\u679C\u5B89\u88C5\u4E86desktop\uFF0C\u5219\u81EA\u5E26compose)</li><li>\u5199yaml\u6587\u4EF6\uFF1Adocker-compose.yml</li></ol><div class="language-yml line-numbers-mode"><pre><code><span class="token key atrule">redis</span><span class="token punctuation">:</span>
  <span class="token key atrule">image</span><span class="token punctuation">:</span> redis
<span class="token key atrule">db</span><span class="token punctuation">:</span>
  <span class="token key atrule">image</span><span class="token punctuation">:</span> postgres<span class="token punctuation">:</span><span class="token number">9.4</span> 
<span class="token key atrule">vote</span><span class="token punctuation">:</span>
  <span class="token comment"># image: voting-app</span>
  <span class="token key atrule">build</span><span class="token punctuation">:</span> ./vote
  <span class="token key atrule">ports</span><span class="token punctuation">:</span> 
    <span class="token punctuation">-</span> 5000<span class="token punctuation">:</span><span class="token number">80</span>
  <span class="token key atrule">links</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> redis
<span class="token key atrule">result</span><span class="token punctuation">:</span>
  <span class="token comment"># image: result-app</span>
  <span class="token key atrule">build</span><span class="token punctuation">:</span> ./result
  <span class="token key atrule">ports</span><span class="token punctuation">:</span> 
    <span class="token punctuation">-</span> 5001<span class="token punctuation">:</span><span class="token number">80</span>
  <span class="token key atrule">links</span><span class="token punctuation">:</span> 
    <span class="token punctuation">-</span> db
<span class="token key atrule">worker</span><span class="token punctuation">:</span>
  <span class="token comment"># image: worker</span>
  <span class="token key atrule">build</span><span class="token punctuation">:</span> ./worker
  <span class="token key atrule">links</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> db
	<span class="token punctuation">-</span> redis
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><ol start="2"><li>\u8FD0\u884C<code>docker-compose up</code></li></ol><h2 id="\u4E0D\u540C\u7248\u672C" tabindex="-1">\u4E0D\u540C\u7248\u672C</h2><h3 id="\u7B2C\u4E00\u7248" tabindex="-1">\u7B2C\u4E00\u7248</h3><p>\u4E0A\u6587\u5199\u7684\u5C31\u662F\u7B2C\u4E00\u7248</p><ul><li>\u88AB\u4F9D\u8D56\u7684\u670D\u52A1\u9700\u8981\u5728\u540E\u9762\u88AB\u542F\u52A8(\u4F8B\u5982\u6570\u636E\u5E93\u9700\u8981\u5728\u524D\u9762)</li></ul><h3 id="\u7B2C\u4E8C\u7248" tabindex="-1">\u7B2C\u4E8C\u7248</h3><ul><li>\u589E\u52A0\u4E86depends_on(\u4E0D\u7528\u987A\u5E8F)\uFF0Cnetwork\u548Cservice</li><li>\u56E0\u4E3A\u7B2C\u4E00\u7248\u7684\u7F51\u7EDC\u9ED8\u8BA4\u4F7F\u7528\u4E00\u4E2A\u7F51\u7EDC\uFF0C\u6240\u4EE5\u589E\u52A0\u4E86network\u533A\u5206\u4E0D\u540C\u6570\u636E\u7684\u7F51\u7EDC(\u4F8B\u5982\u524D\u7AEF\u548C\u540E\u7AEF)</li><li>\u4E0D\u7528\u5199links</li><li>\u9700\u8981\u5728\u9876\u90E8\u58F0\u660Eversion</li></ul><div class="language-yml line-numbers-mode"><pre><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token number">2</span>
<span class="token key atrule">service</span><span class="token punctuation">:</span>
  <span class="token key atrule">redis</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> redis
	<span class="token key atrule">network</span><span class="token punctuation">:</span>
	  <span class="token punctuation">-</span> back<span class="token punctuation">-</span>end
  <span class="token key atrule">db</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> postgres<span class="token punctuation">:</span><span class="token number">9.4</span>
	<span class="token key atrule">network</span><span class="token punctuation">:</span>
	  <span class="token punctuation">-</span> back<span class="token punctuation">-</span>end 
  <span class="token key atrule">vote</span><span class="token punctuation">:</span>
    <span class="token key atrule">build</span><span class="token punctuation">:</span> ./vote
    <span class="token key atrule">ports</span><span class="token punctuation">:</span> 
      <span class="token punctuation">-</span> 5000<span class="token punctuation">:</span><span class="token number">80</span>
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> redis
	<span class="token key atrule">network</span><span class="token punctuation">:</span>
	  <span class="token punctuation">-</span> front<span class="token punctuation">-</span>end
	  <span class="token punctuation">-</span> back<span class="token punctuation">-</span>end
  <span class="token key atrule">result</span><span class="token punctuation">:</span>
    <span class="token key atrule">build</span><span class="token punctuation">:</span> ./result
    <span class="token key atrule">ports</span><span class="token punctuation">:</span> 
      <span class="token punctuation">-</span> 5001<span class="token punctuation">:</span><span class="token number">80</span>
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> db
	<span class="token key atrule">network</span><span class="token punctuation">:</span>
	  <span class="token punctuation">-</span> front<span class="token punctuation">-</span>end
	  <span class="token punctuation">-</span> back<span class="token punctuation">-</span>end
  <span class="token key atrule">worker</span><span class="token punctuation">:</span>
    <span class="token key atrule">build</span><span class="token punctuation">:</span> ./worker
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> db
	  <span class="token punctuation">-</span> redis
	<span class="token key atrule">network</span><span class="token punctuation">:</span>
	  <span class="token punctuation">-</span> back<span class="token punctuation">-</span>end
<span class="token key atrule">network</span><span class="token punctuation">:</span>
  <span class="token key atrule">front-end</span><span class="token punctuation">:</span>
  <span class="token key atrule">back-end</span><span class="token punctuation">:</span>
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br></div></div><h3 id="\u7B2C\u4E09\u7248" tabindex="-1">\u7B2C\u4E09\u7248</h3><ul><li><a href="https://dockerdocs.cn/get-started/08_using_compose/" target="_blank" rel="noopener noreferrer">\u81EA\u5DF1\u770B\u6587\u6863</a></li></ul><div class="language-yml line-numbers-mode"><pre><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&quot;3&quot;</span>
<span class="token key atrule">service</span><span class="token punctuation">:</span>
  <span class="token key atrule">redis</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> redis
  <span class="token key atrule">db</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> postgres<span class="token punctuation">:</span><span class="token number">9.4</span>
	<span class="token key atrule">envirnoment</span><span class="token punctuation">:</span>
	  <span class="token key atrule">POSTGRES_USER</span><span class="token punctuation">:</span> <span class="token punctuation">...</span>
	  <span class="token key atrule">POSTGRES_PASSWORD</span><span class="token punctuation">:</span> <span class="token punctuation">...</span>
  <span class="token key atrule">vote</span><span class="token punctuation">:</span>
    <span class="token punctuation">...</span>	
  <span class="token key atrule">result</span><span class="token punctuation">:</span>
    <span class="token punctuation">...</span>
  <span class="token key atrule">worker</span><span class="token punctuation">:</span>
    <span class="token punctuation">...</span>
<span class="token key atrule">network</span><span class="token punctuation">:</span>
  <span class="token key atrule">front-end</span><span class="token punctuation">:</span>
  <span class="token key atrule">back-end</span><span class="token punctuation">:</span>
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div>`,21),l=[t];function c(o,u,r,i,k,b){return a(),s("div",null,l)}var y=n(p,[["render",c]]);export{d as __pageData,y as default};
