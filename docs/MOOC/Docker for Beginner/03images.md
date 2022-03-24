## 为什么要创建自己的镜像
1. 封装自己需要的环境，以便之后快速配置
## 如何创建
- `docker build Dockerfile -t image`
- `docker push image`
## Dockerfile
- docker的配置文件
- 内容：一组组`指令 参数`
示例：
```dockerfile
FROM Ubuntu

RUN apt-get update
RUN apt-get install python

RUN pip install flask
RUN pip install flask-mysql

COPY . /opt/source-code

ENTRYPOINT FLASK APP=/opt/source-code/app.py flask run
```
1. 从OS开始
2. 安装依赖
3. 复制源代码
4. 配置入口
## 演示创建一个新的Docker镜像
1. 首先执行一遍镜像中要做的操作(安装操作系统,安装依赖,源代码文件,运行程序)
	1. 我们要做的是写，镜像里要做的是将准备好的代码复制
2. 然后用history查看自己都运行了什么命令并记录下来
3. 回到Docker Host，创建项目目录，在创建好的目录下创建Dockerfile，并将其内容以Dockerfile的形式写入
4. 建立源代码文件并写入需要的代码
5. 运行docker build
### 发布到Docker hub
1. 进入到项目目录下
2. 使用docker build . -t image构建出自己名下的镜像
3. 使用docker login登录你的docker账号
4. 使用docker push image推送到docker hub

## CMD VS ENTRYPOINT
- CMD：默认运行的指令及参数
- ENTRYPOINT：默认运行的指令
```dockerfile
FROM Ubuntu

# 1
# docker run image [COMMAND]
CMD ["sleep", "5"]
# 2
# docker run image [params]
# 指定指令
ENTRYPOINT ["sleep"]
# 指定参数
CMD ["5"]
```
### 覆盖默认
```shell
docker run --entrypoint program image params
```