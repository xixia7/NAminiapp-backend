# syntax=docker/dockerfile:1
# 第一行是语法分析器指令，指定docker解析文件时用什么语法，会在开始构建之前升级解析器兼容旧版本。
# 指向版本1语法的最新版本。BuildKit 会在生成之前自动检查语法的更新，确保使用的是最新版本。
# 继承容器，可以继承多个
FROM node
# 指定制作我们的镜像的联系人信息（镜像创建者）
MAINTAINER WWJ
#调整时间docker内的时间
RUN rm -f /etc/localtime \
&& ln -sv /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
&& echo "Asia/Shanghai" > /etc/timezone
# 安装nodemon
RUN npm install -g nodemon
# 创建容器内的项目存放目录
RUN mkdir -p /home/NAminiapp/back
# 先拷贝依赖文件安装依赖，这样可以提高效率
COPY ["package.json", "./"]
# cd到koa-serve文件夹下
WORKDIR /home/NAminiapp/back
# 安装项目依赖包
# 公司内网taobao被墙，官网反而ok，这个得注意
RUN npm set registry http://registry.npm.taobao.org/ \
# 查看请求的进度
&& npm config set loglevel=http \
&& npm install pm2 -g \
# 等于--production,现在推荐使用这个--omit=dev参数设置
&& npm install --omit=dev
# 将根目录下的文件都copy到container（运行此镜像的容器）文件系统的koa-serve文件夹下
ADD . /home/NAminiapp/back/

# 容器对外暴露的端口号
EXPOSE 10000
# 容器启动时执行的命令，类似npm run start
CMD ["npm", "run", "dev"]
