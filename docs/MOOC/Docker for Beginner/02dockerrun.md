## tag
`docker run image:tag`
## 后台运行
后台启动:`docker run -d image`
切到指定后台:`docker attach id`
## stdin
- 默认不监听输入流，但是可以使用参数i进入交互模式,参数t可以进入伪终端模式
	1. `docker run -i image:tag`:进入交互模式，可以对输入流进行写入
	2. `docker run -it image:tag`:进入终端交互模式
## port mapping
将容器的端口(内部访问)映射到docker主机的端口(外部访问)
`docker run -p HostPort:ContainerPort image`
## volume mapping
将docker容器的目录映射到外部目录，让类似数据库应用的内容能够保存下来，不必随着应用的删除而丢失
`docker run -v HostVolume:ContainerVolume image`
## inspect
`docker inspect id`:查看指定容器状态
## 环境变量
设置：`docker run -e 环境变量 image`
查看：`docker inspect image`
