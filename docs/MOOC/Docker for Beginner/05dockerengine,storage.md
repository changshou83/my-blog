## 引擎
包含三部分
	CLI(用户交互窗口)
	rest API(胶水层)
	Docker Deamon(Docker守护进程，管理Docker对象(namespace))
容器化
	namespace(Process ID,Network,InterProcess,Mount,Unix)
容器使用命名空间共享相同的系统资源(CPU,内存)
## 存储及文件系统
### 文件系统
containers
images
volumes
### 分层架构
- docker如何得知我们需要的容器和准确存储镜像文件，这就要讲到分层架构了
- 以Dockerfile为例
```html
container layer layer6: container layer                :read write : docker run images
image layers    layer5: update entrypoint with command :read only  : docker build dockerfile -t image
                layer4: source code                    :
                layer3: changes in the pip packages    :
                layer2: changes in the apt packages    :
                layer1: base Ubuntu layer              :
```
每一层都存储上一层的更改，加入要运行另一个Ubuntu系统，那么就直接用之前下过的
通过container的读写层来创建写时复制文件(image的文件将永远不会改变，除非重新build)，container中的文件将会随着container的销毁而销毁，如果想要保存container中的临时文件需要创建volume(卷)来持久化临时文件
### 存储驱动程序
由存储驱动程序来启用分层架构