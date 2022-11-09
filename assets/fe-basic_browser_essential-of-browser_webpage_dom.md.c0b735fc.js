import{_ as l,c as i,o as e,a as t}from"./app.48dfb21b.js";const T='{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"fe-basic/browser/essential-of-browser/webpage/dom.md"}',o={},a=t("<ul><li>\u4EC0\u4E48\u662F <ul><li>\u8868\u8FF0HTML\u7684\u5185\u90E8\u6570\u636E\u7ED3\u6784</li><li>\u5C06JS\u811A\u672C\u4E0E\u9875\u9762\u8FDE\u63A5\u8D77\u6765</li></ul></li><li>\u5982\u4F55\u751F\u6210 <ul><li>\u901A\u8FC7HTMLParser\u5C06HTML\u5B57\u8282\u6D41\u8F6C\u6362\u4E3ADOM\u7ED3\u6784</li><li>\u89E3\u6790\u65F6\u673A <ul><li>\u7F51\u7EDC\u8FDB\u7A0B\u52A0\u8F7D\u591A\u5C11\u6570\u636E\uFF0C\u89E3\u6790\u5668\u4FBF\u89E3\u6790\u591A\u5C11\u6570\u636E</li><li>\u8BE6\u7EC6\u8FC7\u7A0B <ul><li>\u7F51\u7EDC\u8FDB\u7A0B\u6536\u5230\u8BF7\u6C42\u5934\u540E\uFF0C\u6839\u636Econtent-type\u5224\u65AD\u6587\u4EF6\u7C7B\u578B</li><li>\u5982\u679C\u662Ftext/html\uFF0C\u5219\u9009\u62E9\u6216\u521B\u5EFA\u4E00\u4E2A\u6E32\u67D3\u8FDB\u7A0B</li><li>\u4E4B\u540E\u7F51\u7EDC\u8FDB\u7A0B\u548C\u6E32\u67D3\u8FDB\u7A0B\u4E4B\u95F4\u4F1A\u5EFA\u7ACB\u4E00\u4E2A\u5171\u4EAB\u6570\u636E\u7684\u7BA1\u9053</li><li>\u5F53\u6E32\u67D3\u8FDB\u7A0B\u63A5\u6536HTML\u5B57\u8282\u6D41\u65F6\uFF0C\u4F1A\u5148\u5F00\u4E00\u4E2A\u9884\u89E3\u6790\u7EBF\u7A0B\uFF0C\u5982\u679C\u9047\u5230JS\u6587\u4EF6\u6216\u8005CSS\u6587\u4EF6\uFF0C\u90A3\u4E48\u5C31\u4F1A\u63D0\u524D\u4E0B\u8F7D\u8FD9\u4E9B\u6587\u4EF6</li></ul></li></ul></li><li>\u89E3\u6790\u8FC7\u7A0B <ul><li>\u901A\u8FC7\u5206\u8BCD\u5668\u5C06\u5B57\u8282\u6D41\u8F6C\u6362\u4E3AToken(Tag Token\u548CText Token)</li><li>\u5C06Token\u89E3\u6790\u4E3ADOM\u7ED3\u70B9\uFF0C\u5E76\u5C06DOM\u8282\u70B9\u6DFB\u52A0\u5230DOM\u6811\u4E2D\uFF0C\u540C\u65F6\u7EF4\u62A4\u4E00\u4E2A\u6808\u7ED3\u6784\u6765\u4FDD\u8BC1\u6807\u7B7E\u7684\u5F00\u59CB\u4E0E\u7ED3\u675F</li><li>\u5F53\u89E3\u6790\u5230script\u6807\u7B7E\u65F6\uFF0C\u6682\u505CDOM\u89E3\u6790\uFF0C\u56E0\u4E3A\u53EF\u80FD\u4F1A\u6539\u53D8DOM\u6811\u7684\u7ED3\u6784\u3002JS\u5F15\u64CE\u4ECB\u5165\u6765\u6267\u884CJS\u4EE3\u7801\u3002 <ul><li>\u7531\u4E8EJS\u6709\u66F4\u6539\u6837\u5F0F\u7684\u80FD\u529B\uFF0C\u9700\u8981\u4F9D\u8D56CSSOM\uFF0C\u56E0\u6B64CSSOM\u6709\u65F6\u4E5F\u4F1A\u963B\u585EDOM\u7684\u6784\u5EFA</li></ul></li></ul></li></ul></li><li>\u52A0\u901F\u89E3\u6790\u8FC7\u7A0B <ul><li>\u5F53JS\u7EBF\u7A0B\u4ECB\u5165\u65F6\uFF0C\u4F1A\u589E\u52A0DOM\u52A0\u8F7D\u7684\u65F6\u95F4\uFF0C\u6211\u4EEC\u53EF\u4EE5 <ul><li>\u4F7F\u7528CDN\u6765\u52A0\u901FJS\u6587\u4EF6\u7684\u52A0\u8F7D</li><li>\u538B\u7F29JS\u6587\u4EF6\u7684\u4F53\u79EF</li><li>\u5982\u679C\u6CA1\u6709DOM\u64CD\u4F5C\uFF0C\u5219\u4E3Ascript\u6807\u7B7E\u52A0\u4E0Adefer\u6216\u8005async\u5C5E\u6027\uFF0C\u4E24\u8005\u5171\u540C\u70B9\u4E3A\u90FD\u662F\u5F02\u6B65\u52A0\u8F7D\uFF0C\u533A\u522B\u4E3A\u524D\u8005\u5C06\u6267\u884C\u5EF6\u8FDF\u5230DOMConetenLoaded\u4E8B\u4EF6\u4E4B\u540E\uFF0C\u540E\u8005\u5219\u5728JS\u6587\u4EF6\u52A0\u8F7D\u5B8C\u5C31\u7ACB\u5373\u6267\u884C</li></ul></li></ul></li></ul>",1),r=[a];function s(_,n,c,u,S,d){return e(),i("div",null,r)}var p=l(o,[["render",s]]);export{T as __pageData,p as default};