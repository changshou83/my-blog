## 一句话
根据yaml文件快速起多个容器应用(不用一个一个run并把它们连接起来了)
- 优点：可以在文件中定义应用程序堆栈，将其保留在项目存储库的根目录（现在由版本控制）中
## 举例
- 一个投票应用
	- 投票        python
	- 存储投票结果 redis
	- 处理投票结果 .net
	- 存储统计结果 postgres
	- 展示统计结果 nodejs
### 不使用compose
```shell
docker run -d --name=redis redis
docker run -d --name=db postgres
docker run -d --name=vote -p 5000:80 --link redis:redis voting-app
docker run -d --name=result -p 5001:80 --link db:db result-app
docker run -d --name=worker --link db:db --link redis:redis worker
```
### 使用compose
1. [安装docker compose](https://dockerdocs.cn/compose/install/)(如果安装了desktop，则自带compose)
2. 写yaml文件：docker-compose.yml
```yml
redis:
  image: redis
db:
  image: postgres:9.4 
vote:
  # image: voting-app
  build: ./vote
  ports: 
    - 5000:80
  links:
    - redis
result:
  # image: result-app
  build: ./result
  ports: 
    - 5001:80
  links: 
    - db
worker:
  # image: worker
  build: ./worker
  links:
    - db
	- redis
```
2. 运行`docker-compose up`
## 不同版本
### 第一版
上文写的就是第一版
- 被依赖的服务需要在后面被启动(例如数据库需要在前面)
### 第二版
- 增加了depends_on(不用顺序)，network和service
- 因为第一版的网络默认使用一个网络，所以增加了network区分不同数据的网络(例如前端和后端)
- 不用写links
- 需要在顶部声明version
```yml
version: 2
service:
  redis:
    image: redis
	network:
	  - back-end
  db:
    image: postgres:9.4
	network:
	  - back-end 
  vote:
    build: ./vote
    ports: 
      - 5000:80
    depends_on:
      - redis
	network:
	  - front-end
	  - back-end
  result:
    build: ./result
    ports: 
      - 5001:80
    depends_on:
      - db
	network:
	  - front-end
	  - back-end
  worker:
    build: ./worker
    depends_on:
      - db
	  - redis
	network:
	  - back-end
network:
  front-end:
  back-end:
```
### 第三版
- [自己看文档](https://dockerdocs.cn/get-started/08_using_compose/)
```yml
version: "3"
service:
  redis:
    image: redis
  db:
    image: postgres:9.4
	envirnoment:
	  POSTGRES_USER: ...
	  POSTGRES_PASSWORD: ...
  vote:
    ...	
  result:
    ...
  worker:
    ...
network:
  front-end:
  back-end:
```