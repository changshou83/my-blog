- 宏任务很简单，就是指消息队列中的等待被主线程执行的事件
- 把微任务看成是一个需要异步执行的函数，执行时机是在主函数执行结束之后、当前宏任务结束之前
- 微任务可以在实时性和效率之间做一个有效的权衡
- Promise
- Async/Await