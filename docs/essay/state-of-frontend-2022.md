本篇是 [The State of Frontend in 2022 - Gergely Orosz](https://newsletter.pragmaticengineer.com/p/state-of-frontend-2022?utm_source=substack&utm_medium=email) 的笔记

1. 谁接受了调查
   - 41.6%的软件开发公司
   - 41.2%技术公司
   - 12.3%的非技术公司
2. 前端工程师如何工作
   - 远程或混合办公成为新趋势，当然如何共享信息仍然是一个难题
   - 大型前端团队的数量正在增加，这对开发前端工具和提升开发者体验的团队提了个醒
   - 不仅仅是前端工程师从事前端工作,还有产品经理和设计师
3. 工程实践
   - 单元测试，集成测试和端到端测试的编写增多，说明前端的业务逻辑越来越多了，工程化也越来越成熟
   - 代码审查
   - CI/CD
   - 相关结论：三者可能是相互关联的，引入其中两者就会有很大可能把第三项也做了
4. 被使用的技术
   - TypeScript成为事实上的前端语言，因为强类型可以导致更少的代码回归，并通过类型系统提前发现一些bug
   - React(76%)将继续存在，而Next.js(43%)将迅速崛起，Vue(29%->28%)的受欢迎程度没有变化，Svelte(33%->22%)降低了
   - Axios(like: 61%),Lodash(like: 46%, dislike: 20%),Moment(like: 34%, dislike: 41%)
   - Redux(like: 37%, dislike: 47%)，可能是因为学习如何使用好它的门槛较高，需要接受它在状态管理领域的那套理念，即视图/动作/状态模型并以一种不可变的方式更新状态
5. 开发者工具
   - VSCode(74.4%),WebStorm(18.8%),Vim(3.3%)
   - VSCode不光是在前端流行，在各个领域都很流行，根据Stack Overflow2021的调查，有74.48%的开发者使用VSCode，32.15%的人使用VS，27.97%的人使用IntelliJ，27.71%使用Notepad++，23.34%的人使用Vim
   - ESLint(83.4%)，Prettier(79.8%)和Webpack(76.8%)是前端工程师的默认构建工具集，Vite(25%),Esbuild(24.3%)，Rollup(22.1%)
6. 服务供应商
   - Vercel(6%->25%)正在崛起,刚刚超过他的竞争对手(Netlify),推测是边缘计算的相关创新导致的
   - Gatsby可能干不过Next.js要完蛋了
   - AWS在前端开发人员中很流行，而GCP和Azure则不那么流行
7. 加餐
   - 前端工程已经成熟，但是仍然有很多变化。
   - React成为最常用的框架，多年来一直保持稳定，Vue，Svelte和Angular基本没什么变化，不过都有下降趋势。
     - 不过以个人角度来看，除了中大公司大量用React，小公司还是要用Vue的，因为Uni-app的需求还是很大量的，而Uni-app就是基于Vue的，还有就是国内特有的小程序也会占去一些市场
   - 移动端的话，作者推测小公司将使用React和React Native构建网站和移动应用，而大公司则会更加专业化的使用原生语言进行IOS和Android开发
   - 微软成为了前端领域的巨头，因为TypeScript，VSCode，Github，npm都是微软的，不知道微软准备用它的地位准备干什么
