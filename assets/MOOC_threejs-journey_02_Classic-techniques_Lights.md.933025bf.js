import{_ as l,c as i,o as e,a as t}from"./app.af56afdf.js";const f='{"title":"Lights","description":"","frontmatter":{},"headers":[{"level":2,"title":"Type","slug":"type"},{"level":3,"title":"AmbientLight","slug":"ambientlight"},{"level":3,"title":"DirectionalLight","slug":"directionallight"},{"level":3,"title":"HemisphereLight","slug":"hemispherelight"},{"level":3,"title":"PointLight","slug":"pointlight"},{"level":3,"title":"RectAreaLight","slug":"rectarealight"},{"level":3,"title":"SpotLight","slug":"spotlight"},{"level":2,"title":"Helper","slug":"helper"},{"level":3,"title":"DirectionalLightHelper","slug":"directionallighthelper"},{"level":3,"title":"HemisphereLightHelper","slug":"hemispherelighthelper"},{"level":3,"title":"PointLightHelper","slug":"pointlighthelper"},{"level":3,"title":"SpotLightHelper","slug":"spotlighthelper"},{"level":2,"title":"LightProbe","slug":"lightprobe"},{"level":2,"title":"Performence","slug":"performence"}],"relativePath":"MOOC/threejs-journey/02_Classic-techniques/Lights.md"}',h={},r=t('<h1 id="lights" tabindex="-1">Lights</h1><ul><li>\u5404\u79CD\u5149\u6E90</li></ul><h2 id="type" tabindex="-1">Type</h2><h3 id="ambientlight" tabindex="-1">AmbientLight</h3><ul><li>\u73AF\u5883\u5149 <ul><li>\u4F1A\u5747\u5300\u7684\u7167\u4EAE\u573A\u666F\u4E2D\u7684\u6240\u6709\u7269\u4F53</li><li>\u4E0D\u80FD\u7528\u6765\u6295\u5C04\u9634\u5F71\uFF0C\u56E0\u4E3A\u5B83\u6CA1\u6709\u65B9\u5411</li></ul></li><li>\u53C2\u6570\u5217\u8868 <ul><li>color\xA0- (\u53C2\u6570\u53EF\u9009\uFF09\u989C\u8272\u7684rgb\u6570\u503C\u3002\u7F3A\u7701\u503C\u4E3A 0xffffff\u3002</li><li>intensity\xA0- (\u53C2\u6570\u53EF\u9009)\u5149\u7167\u7684\u5F3A\u5EA6\u3002\u7F3A\u7701\u503C\u4E3A 1\u3002</li></ul></li></ul><h3 id="directionallight" tabindex="-1">DirectionalLight</h3><ul><li>\u5E73\u884C\u5149 <ul><li>\u6CBF\u7740\u7279\u5B9A\u65B9\u5411\u53D1\u5C04\u7684\u5149\uFF0C\u53EF\u4EE5\u6295\u5C04\u9634\u5F71</li><li>\u5E38\u5E38\u7528\u5E73\u884C\u5149\u6765\u6A21\u62DF\u592A\u9633\u5149 \u7684\u6548\u679C; \u592A\u9633\u8DB3\u591F\u8FDC\uFF0C\u56E0\u6B64\u6211\u4EEC\u53EF\u4EE5\u8BA4\u4E3A\u592A\u9633\u7684\u4F4D\u7F6E\u662F\u65E0\u9650\u8FDC</li><li>\u662F\u76EE\u6807\u5E73\u884C\u5149\uFF0C\u800C\u4E0D\u662F\u81EA\u7531\u5E73\u884C\u5149</li></ul></li><li>\u53C2\u6570\u5217\u8868\uFF1Acolor,intensity</li></ul><h3 id="hemispherelight" tabindex="-1">HemisphereLight</h3><ul><li>\u534A\u7403\u5149 <ul><li>\u4E0D\u80FD\u6295\u5C04\u9634\u5F71</li><li>\u76F4\u63A5\u653E\u7F6E\u4E8E\u573A\u666F\u4E4B\u4E0A\uFF0C\u5149\u7167\u989C\u8272\u4ECE\u5929\u7A7A\u5149\u7EBF\u989C\u8272\u6E10\u53D8\u5230\u5730\u9762\u5149\u7EBF\u989C\u8272</li></ul></li><li>\u53C2\u6570\u5217\u8868 <ul><li>skyColor\xA0- (\u53EF\u9009\u53C2\u6570) \u5929\u7A7A\u4E2D\u53D1\u51FA\u5149\u7EBF\u7684\u989C\u8272\u3002 \u7F3A\u7701\u503C 0xffffff\u3002</li><li>groundColor\xA0- (\u53EF\u9009\u53C2\u6570) \u5730\u9762\u53D1\u51FA\u5149\u7EBF\u7684\u989C\u8272\u3002 \u7F3A\u7701\u503C 0xffffff\u3002</li><li>intensity\xA0- (\u53EF\u9009\u53C2\u6570) \u5149\u7167\u5F3A\u5EA6\u3002 \u7F3A\u7701\u503C 1\u3002</li></ul></li></ul><h3 id="pointlight" tabindex="-1">PointLight</h3><ul><li>\u70B9\u5149\u6E90 <ul><li>\u53EF\u4EE5\u6295\u5C04\u9634\u5F71</li><li>\u4ECE\u4E00\u4E2A\u70B9\u5411\u5404\u4E2A\u65B9\u5411\u53D1\u5C04\u7684\u5149\u6E90</li><li>\u4E00\u4E2A\u5E38\u89C1\u7684\u4F8B\u5B50\u662F\u6A21\u62DF\u4E00\u4E2A\u706F\u6CE1\u53D1\u51FA\u7684\u5149</li></ul></li><li>\u53C2\u6570\u5217\u8868 <ul><li>color\xA0- (\u53EF\u9009\u53C2\u6570)) \u5341\u516D\u8FDB\u5236\u5149\u7167\u989C\u8272\u3002 \u7F3A\u7701\u503C 0xffffff (\u767D\u8272)\u3002</li><li>intensity\xA0- (\u53EF\u9009\u53C2\u6570) \u5149\u7167\u5F3A\u5EA6\u3002 \u7F3A\u7701\u503C 1\u3002</li><li>distance\xA0- \u8FD9\u4E2A\u8DDD\u79BB\u8868\u793A\u4ECE\u5149\u6E90\u5230\u5149\u7167\u5F3A\u5EA6\u4E3A0\u7684\u4F4D\u7F6E\u3002 \u5F53\u8BBE\u7F6E\u4E3A0\u65F6\uFF0C\u5149\u6C38\u8FDC\u4E0D\u4F1A\u6D88\u5931(\u8DDD\u79BB\u65E0\u7A77\u5927)\u3002\u7F3A\u7701\u503C 0.</li><li>decay\xA0- \u6CBF\u7740\u5149\u7167\u8DDD\u79BB\u7684\u8870\u9000\u91CF\u3002\u7F3A\u7701\u503C 1\u3002 \u5728\xA0physically correct\xA0\u6A21\u5F0F\u4E2D\uFF0Cdecay = 2\u3002</li></ul></li></ul><h3 id="rectarealight" tabindex="-1">RectAreaLight</h3><ul><li>\u5E73\u9762\u5149 <ul><li>\u4ECE\u4E00\u4E2A\u77E9\u5F62\u5E73\u9762\u4E0A\u5747\u5300\u5730\u53D1\u5C04\u5149\u7EBF</li><li>\u53EF\u4EE5\u7528\u6765\u6A21\u62DF\u50CF\u660E\u4EAE\u7684\u7A97\u6237\u6216\u8005\u6761\u72B6\u706F\u5149\u5149\u6E90</li><li>\u6CE8\u610F\u4E8B\u9879 <ul><li>\u4E0D\u652F\u6301\u9634\u5F71\u3002</li><li>\u53EA\u652F\u6301\xA0MeshStandardMaterial\xA0\u548C\xA0MeshPhysicalMaterial\xA0\u4E24\u79CD\u6750\u8D28\u3002</li><li>\u4F60\u5FC5\u987B\u5728\u4F60\u7684\u573A\u666F\u4E2D\u52A0\u5165\xA0<a href="https://threejs.org/examples/jsm/lights/RectAreaLightUniformsLib.js" target="_blank" rel="noopener noreferrer">RectAreaLightUniformsLib</a>\xA0\uFF0C\u5E76\u8C03\u7528<strong>init()</strong>\u3002</li></ul></li></ul></li><li>\u53C2\u6570\u5217\u8868 <ul><li>color\xA0- (\u53EF\u9009\u53C2\u6570) \u5341\u516D\u8FDB\u5236\u6570\u5B57\u8868\u793A\u7684\u5149\u7167\u989C\u8272\u3002\u7F3A\u7701\u503C\u4E3A 0xffffff (\u767D\u8272)</li><li>intensity\xA0- (\u53EF\u9009\u53C2\u6570) \u5149\u6E90\u5F3A\u5EA6\uFF0F\u4EAE\u5EA6 \u3002\u7F3A\u7701\u503C\u4E3A 1\u3002</li><li>width\xA0- (\u53EF\u9009\u53C2\u6570) \u5149\u6E90\u5BBD\u5EA6\u3002\u7F3A\u7701\u503C\u4E3A 10\u3002</li><li>height\xA0- (\u53EF\u9009\u53C2\u6570) \u5149\u6E90\u9AD8\u5EA6\u3002\u7F3A\u7701\u503C\u4E3A 10\u3002</li></ul></li></ul><h3 id="spotlight" tabindex="-1">SpotLight</h3><ul><li>\u805A\u5149\u706F <ul><li>\u53EF\u4EE5\u6295\u5C04\u9634\u5F71</li><li>\u4ECE\u4E00\u4E2A\u70B9\u6CBF\u4E00\u4E2A\u65B9\u5411\u5C04\u51FA\uFF0C\u968F\u7740\u5149\u7EBF\u7167\u5C04\u7684\u53D8\u8FDC\uFF0C\u5149\u7EBF\u5706\u9525\u4F53\u7684\u5C3A\u5BF8\u4E5F\u9010\u6E10\u589E\u5927</li></ul></li><li>\u53C2\u6570\u5217\u8868 <ul><li>color\xA0- (\u53EF\u9009\u53C2\u6570) \u5341\u516D\u8FDB\u5236\u5149\u7167\u989C\u8272\u3002 \u7F3A\u7701\u503C 0xffffff (\u767D\u8272)\u3002</li><li>intensity\xA0- (\u53EF\u9009\u53C2\u6570) \u5149\u7167\u5F3A\u5EA6\u3002 \u7F3A\u7701\u503C 1\u3002</li><li>distance\xA0- \u4ECE\u5149\u6E90\u53D1\u51FA\u5149\u7684\u6700\u5927\u8DDD\u79BB\uFF0C\u5176\u5F3A\u5EA6\u6839\u636E\u5149\u6E90\u7684\u8DDD\u79BB\u7EBF\u6027\u8870\u51CF\u3002</li><li>angle\xA0- \u5149\u7EBF\u6563\u5C04\u89D2\u5EA6\uFF0C\u6700\u5927\u4E3A<code>Math.PI * 0.5</code>\u3002</li><li>penumbra\xA0- \u805A\u5149\u9525\u7684\u534A\u5F71\u8870\u51CF\u767E\u5206\u6BD4\u3002\u57280\u548C1\u4E4B\u95F4\u7684\u503C\u3002\u9ED8\u8BA4\u4E3A0\u3002</li><li>decay\xA0- \u6CBF\u7740\u5149\u7167\u8DDD\u79BB\u7684\u8870\u51CF\u91CF\u3002</li></ul></li></ul><h2 id="helper" tabindex="-1">Helper</h2><ul><li>\u8F85\u52A9\u5BF9\u8C61\uFF0C\u5E2E\u52A9\u4F60\u770B\u89C1\u5149\u7684\u4F4D\u7F6E</li></ul><h3 id="directionallighthelper" tabindex="-1">DirectionalLightHelper</h3><ul><li>\u6A21\u62DF\u5E73\u884C\u5149\u7684\u8F85\u52A9\u5BF9\u8C61\uFF0C\u5176\u4E2D\u5305\u542B\u4E86\u8868\u793A\u5149\u4F4D\u7F6E\u7684\u5E73\u9762\u548C\u8868\u793A\u5149\u65B9\u5411\u7684\u7EBF\u6BB5</li><li>\u53C2\u6570\u5217\u8868 <ul><li>light-- \u88AB\u6A21\u62DF\u7684\u5149\u6E90.</li><li>size\xA0-- (\u53EF\u9009\u7684) \u5E73\u9762\u7684\u5C3A\u5BF8. \u9ED8\u8BA4\u4E3A\xA0<strong>1</strong>.</li><li>color\xA0-- (\u53EF\u9009\u7684) \u5982\u679C\u6CA1\u6709\u8BBE\u7F6E\u989C\u8272\u5C06\u4F7F\u7528\u5149\u6E90\u7684\u989C\u8272.</li></ul></li></ul><h3 id="hemispherelighthelper" tabindex="-1">HemisphereLightHelper</h3><ul><li>\u521B\u5EFA\u4E00\u4E2A\u865A\u62DF\u7684\u7403\u5F62\u7F51\u7EDC\u6765\u6A21\u62DF\u534A\u7403\u5F62\u5149\u6E90</li><li>\u53C2\u6570\u5217\u8868 <ul><li>light-- \u88AB\u6A21\u62DF\u7684\u5149\u6E90.</li><li>size\xA0-- \u7528\u4E8E\u6A21\u62DF\u5149\u6E90\u7684\u7F51\u683C\u5C3A\u5BF8</li><li>color\xA0-- (\u53EF\u9009\u7684) \u5982\u679C\u6CA1\u6709\u8BBE\u7F6E\u989C\u8272\u5C06\u4F7F\u7528\u5149\u6E90\u7684\u989C\u8272.</li></ul></li></ul><h3 id="pointlighthelper" tabindex="-1">PointLightHelper</h3><ul><li>\u521B\u5EFA\u4E00\u4E2A\u865A\u62DF\u7684\u7403\u5F62\u7F51\u7EDC\u6765\u6A21\u62DF\u70B9\u5149\u6E90</li><li>\u53C2\u6570\u5217\u8868 <ul><li>light-- \u88AB\u6A21\u62DF\u7684\u5149\u6E90.</li><li>size\xA0-- (\u53EF\u9009\u7684) \u7403\u5F62\u8F85\u52A9\u5BF9\u8C61\u7684\u5C3A\u5BF8. \u9ED8\u8BA4\u4E3A\xA0<strong>1</strong>.</li><li>color\xA0-- (\u53EF\u9009\u7684) \u5982\u679C\u6CA1\u6709\u8BBE\u7F6E\u989C\u8272\u5C06\u4F7F\u7528\u5149\u6E90\u7684\u989C\u8272.</li></ul></li></ul><h3 id="spotlighthelper" tabindex="-1">SpotLightHelper</h3><ul><li>\u521B\u5EFA\u4E00\u4E2A\u865A\u62DF\u7684\u9525\u5F62\u7F51\u7EDC\u6765\u6A21\u62DF\u805A\u5149\u706F</li><li>\u53C2\u6570\u5217\u8868 <ul><li>light-- \u88AB\u6A21\u62DF\u7684\u5149\u6E90.</li><li>color\xA0-- (\u53EF\u9009\u7684) \u5982\u679C\u6CA1\u6709\u8BBE\u7F6E\u989C\u8272\u5C06\u4F7F\u7528\u5149\u6E90\u7684\u989C\u8272.</li></ul></li></ul><h2 id="lightprobe" tabindex="-1">LightProbe</h2><ul><li>\u5149\u7167\u63A2\u9488</li><li>\u53E6\u4E00\u79CD\u57283D\u573A\u666F\u4E2D\u6DFB\u52A0\u5149\u6E90\u7684\u65B9\u6CD5</li><li>\u5149\u7167\u63A2\u9488\u4E0D\u53D1\u5149\u3002\u5149\u7167\u63A2\u9488\u5B58\u50A8\u7740\u6709\u5173\u7A7F\u8FC73D\u7A7A\u95F4\u7684\u5149\u7EBF\u7684\u4FE1\u606F\u3002\u6E32\u67D3\u8FC7\u7A0B\u4E2D\uFF0C\u901A\u8FC7\u4F7F\u7528\u6765\u81EA\u5149\u7167\u63A2\u9488\u7684\u6570\u636E\uFF0C\u6765\u903C\u8FD1\u6253\u52303D\u7269\u4F53\u4E0A\u7684\u5149\u7EBF\u3002</li><li>type <ul><li>LightProbe</li><li>AmbientLightProbe</li><li>HemisphereLightProbe</li></ul></li></ul><h2 id="performence" tabindex="-1">Performence</h2><ul><li>\u5C3D\u53EF\u80FD\u5C11\u4F7F\u7528\u706F\u5149</li><li>\u5C3D\u91CF\u4F7F\u7528\u8F7B\u91CF\u7684\u706F\u5149 <ul><li>Minimal <ul><li>AmbientLight(\u73AF\u5883\u5149\uFF0C\u65E0\u9634\u5F71)</li><li>HemisphereLight(\u6C1B\u56F4\u706F\uFF0C\u65E0\u9634\u5F71)</li></ul></li><li>Moderate <ul><li>DirectionalLight(\u5E73\u884C\u5149\uFF0C\u6709\u9634\u5F71)</li><li>PointLight(\u70B9\u5149\u6E90\uFF0C\u6709\u9634\u5F71)</li></ul></li><li>High <ul><li>SpotLight(\u805A\u5149\u706F\uFF0C\u6709\u9634\u5F71)</li><li>RectAeraLight(\u77E9\u5F62\u5149\uFF0C\u6709\u9634\u5F71)</li></ul></li></ul></li><li>\u53EF\u4EE5\u4F7F\u7528\u81EA\u5E26\u9634\u5F71\u7684\u7EB9\u7406\u6765\u4EE3\u66FF\u706F\u5149</li></ul>',29),o=[r];function g(n,u,s,a,p,c){return e(),i("div",null,o)}var L=l(h,[["render",g]]);export{f as __pageData,L as default};