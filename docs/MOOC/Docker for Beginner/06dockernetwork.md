## 组成
三个网络
	bridge(constainer default)
	none
	host
指定网络:`docker run ubuntu --network=none`
- bridge(分配一个用于访问的内部ip，可以映射到主机端口)
- host(独占一个主机端口，其他程序不能映射或安排到这个端口)
- none(不与任何网络相连)
## 用户自定义网络
创建内部网络:`docker network create -- driver bridge --subnet ipaddress name`
## 查看网络
`docker inspect image`