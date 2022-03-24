import{_ as p,c as l,b as n,t,a,d as s,o}from"./app.192460d6.js";const L='{"title":"\u8D77\u6B65\u57FA\u7840","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u5F00\u59CB","slug":"\u5F00\u59CB"},{"level":3,"title":"Option & Composition","slug":"option-composition"},{"level":2,"title":"\u57FA\u7840","slug":"\u57FA\u7840"},{"level":3,"title":"\u521B\u5EFA\u4E00\u4E2A\u5E94\u7528","slug":"\u521B\u5EFA\u4E00\u4E2A\u5E94\u7528"},{"level":3,"title":"\u6A21\u677F\u8BED\u6CD5","slug":"\u6A21\u677F\u8BED\u6CD5"},{"level":3,"title":"\u54CD\u5E94\u5F0F\u57FA\u7840","slug":"\u54CD\u5E94\u5F0F\u57FA\u7840"},{"level":3,"title":"\u8BA1\u7B97\u5C5E\u6027","slug":"\u8BA1\u7B97\u5C5E\u6027"},{"level":3,"title":"\u7C7B\u4E0E\u6837\u5F0F\u7ED1\u5B9A","slug":"\u7C7B\u4E0E\u6837\u5F0F\u7ED1\u5B9A"},{"level":3,"title":"\u6761\u4EF6\u6E32\u67D3","slug":"\u6761\u4EF6\u6E32\u67D3"},{"level":3,"title":"\u5217\u8868\u6E32\u67D3","slug":"\u5217\u8868\u6E32\u67D3"},{"level":3,"title":"\u4E8B\u4EF6\u5904\u7406","slug":"\u4E8B\u4EF6\u5904\u7406"},{"level":3,"title":"\u8868\u5355\u8F93\u5165\u7ED1\u5B9A","slug":"\u8868\u5355\u8F93\u5165\u7ED1\u5B9A"},{"level":3,"title":"\u751F\u547D\u5468\u671F","slug":"\u751F\u547D\u5468\u671F"},{"level":3,"title":"\u76D1\u542C\u5668","slug":"\u76D1\u542C\u5668"},{"level":3,"title":"\u6A21\u677F ref","slug":"\u6A21\u677F-ref"},{"level":3,"title":"\u7EC4\u4EF6\u57FA\u7840","slug":"\u7EC4\u4EF6\u57FA\u7840"},{"level":2,"title":"\u5C0F\u7ED3","slug":"\u5C0F\u7ED3-8"}],"relativePath":"vue/docs/getting-started/basic.md"}',c={},i=a("",10),u=n("li",null,"\u76F8\u6BD4\u4E8E JSX\uFF0CVue \u5BF9\u6A21\u677F\u8FDB\u884C\u4E86\u7F16\u8BD1\u65F6\u4F18\u5316",-1),r=s("\u6587\u672C\u63D2\u503C\uFF1A"),k=a("",4),d=n("h4",{id:"\u5C0F\u7ED3-1",tabindex:"-1"},"\u5C0F\u7ED3",-1),g=n("ul",null,[n("li",null,"{"),n("li",null,"v-html"),n("li",null,"v-bind"),n("li",null,'name:argument.modifiers="value"')],-1),m=n("h3",{id:"\u54CD\u5E94\u5F0F\u57FA\u7840",tabindex:"-1"},"\u54CD\u5E94\u5F0F\u57FA\u7840",-1),b=a("",6),v=s("ref \u81EA\u52A8\u89E3\u5305 "),h=s("\u5728\u6A21\u677F\u4E2D\u4F1A\u81EA\u52A8\u89E3\u5305\uFF0C\u5373\u4E0D\u7528.value\u3002 "),f=s("\u6B64\u89E3\u5305\u53EA\u9650\u5B9A\u4E8E\u9876\u7EA7 property\uFF0C\u8BBF\u95EE\u6DF1\u5C42\u7EA7\u7684 ref \u4E0D\u4F1A\u89E3\u5305 "),q=s("\u4F8B\u5982\uFF1A"),_=n("code",null,"const obj = {foo:ref(1)}",-1),x=s(",\u6A21\u677F\u8BBF\u95EE\uFF1A"),y=n("li",null,"\u89E3\u91CA obj \u4E0D\u662F ref\uFF0C\u6240\u4EE5\u8FD4\u56DE\u539F\u503C",-1),w=n("li",null,"\u56E0\u4E3A setup \u7684\u8FD4\u56DE\u503C\u4F1A\u88AB\u5305\u88F9\u4E00\u4E2A\u4EE3\u7406\uFF0C\u8FD9\u4E2A\u4EE3\u7406\u76D1\u63A7\u4E86\u8FD4\u56DE\u503C\u7684 get \u64CD\u4F5C\uFF0C\u5982\u679C\u83B7\u53D6\u7684 ref \u6570\u636E\uFF0C\u5219\u8FD4\u56DE\u5176.value\uFF0C\u5982\u4E0D\u662F\u5219\u76F4\u63A5\u8FD4\u56DE\u539F\u503C",-1),T=n("li",null,[s("\u5728\u54CD\u5E94\u5F0F\u5BF9\u8C61\u4E2D\u81EA\u52A8\u89E3\u5305 "),n("ul",null,[n("li",null,"\u5728\u6570\u7EC4\u548C\u96C6\u5408\u7C7B\u578B\u4E2D\u4E0D\u4F1A\u81EA\u52A8\u89E3\u5305")])],-1),S=a("",55),C=n("li",null,"\u521B\u5EFA\u5E94\u7528\uFF1AcreateApp();\u6302\u8F7D\uFF1Amount();\u914D\u7F6E\uFF1Aapp.config;\u53EF\u4EE5\u521B\u5EFA\u591A\u4E2A Vue \u5B9E\u4F8B;",-1),V=s("\u6A21\u677F\u8BED\u6CD5\uFF1A"),O=s(","),M=n("code",null,"v-html",-1),D=s(","),A=n("code",null,':attr="value"',-1),j=s(";\u6240\u6709\u6570\u636E\u7ED1\u5B9A\u90FD\u652F\u6301\u5355\u4E00\u8868\u8FBE\u5F0F;"),N=n("code",null,'name:argument.modifiers="value"',-1),E=s(",\u53C2\u6570\u53EF\u4EE5\u662F\u52A8\u6001\u7684"),P=n("code",null,':[someattr]="value"',-1),$=a("",11);function J(e,I,B,F,R,z){return o(),l("div",null,[i,n("ul",null,[u,n("li",null,[r,n("code",null,t(e.data),1)]),k]),d,g,m,n("ul",null,[b,n("li",null,[v,n("ul",null,[n("li",null,[h,n("ul",null,[n("li",null,[f,n("ul",null,[n("li",null,[q,_,x,n("code",null,t(e.foo),1)]),y])]),w])]),T])])]),S,n("ol",null,[C,n("li",null,[V,n("code",null,t(),1),O,M,D,A,j,N,E,P]),$])])}var G=p(c,[["render",J]]);export{L as __pageData,G as default};
