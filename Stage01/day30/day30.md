## Git简介

##### 概念

Git 是一个开源的分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目

##### 作用

- 代码备份
- 版本控制
- 协同工作
- 责任追溯

##### 区别

跟svn最大的区别,git是分布式的,而svn是集中式的

##### 安装和配置

###### 安装

傻瓜式的

###### 测试

```shell
git -v
```

###### 配置

设置全局的用户名和邮箱

```shell
git config --global user.name "fudong"
git config --global user.email fudong@qq.com
```

用户名和邮箱是任意的，但推荐使用和远程仓库对应的邮箱

查看配置	

```shell
git config --list
```

## 本地仓库

##### 概念

```
工作目录
	代码的存放目录
暂存区
	代码提交到仓库之前的临时存储空间
本地历史仓库
	用于存放不同版本的代码
	
暂存区存在的意义
	用于临时保存用户的修改,一边稍后提交到仓库
	可以实现选择性的提交
	允许你对多个文件进行统一管理,确保一次性提交的文件是你希望保存的
```

##### 命令

```shell
git init 初始化/创建git本地仓库(默认会有一个.git隐藏文件)
git status 查看git状态
git add '文件名' 将本地指定的文件提交到暂存区
git add . 将本地所有的文件都添加到暂存区
git commit -m '提交的信息' 提交操作,可以将暂存区中所有的代码提交到本地历史仓库
	-m参数表示要添加提交信息
git log 查看日志(历史提交记录)
```

##### 操作

```shell
1,创建一个文件夹,01_git_local,通过code打开
2,使用git init,初始化本地仓库,这个文件夹就变成了git的本地仓库
3,创建一个文件,a.html
4,使用git status 查看状态 
5,使用git add . 添加到暂存区
6,使用git commit -m '提交的信息' 将a.html文件提交到本地历史仓库
7,使用git log 查看日志(历史提交记录)

创建一个b.html文件,添加到暂存区,提交到本地历史仓库
```

## 版本切换

##### 命令

```shell
git reflog 精简版的日志展示(可以插件所有分支上的所有操作)
git reset --hard <版本的唯一标识>  切换版本
```

##### 操作

```shell
在上一个案例的基础上,再创建一个c.html文件,添加到暂存区,提交到本地历史仓库

使用git reflog 查看精简版的日志展示
使用git reset --hard <版本的唯一标识>  切换到任意版本
```

## 分支管理

##### 概念

```
一个分支代表一条独立的开发线。
分支让多个开发人员并行工作，开发新功能、修复 bug 或进行实验，而不会影响主代码库
使用分支意味着你可以从开发主线上分离开来，然后在不影响主线的同时继续工作
分支一般用于周期较长的模块开发或者尝试性的模块开发
```

##### 命令

```shell
显示所有的分支
	git branch
创建分支
	git branch 分支名
修改分支名称(很少这么操作)
	git branch -m  旧分支名 新分支名
切换分支
	git switch 分支名(推荐)
	git checkout 分支名 (老版本写法)
合并分支
	git merge 要合并的分支名
	合并分支到当前分支
删除分支
	git branch -d 分支名
创建一个新的分支同时切换到新创建的分支
	git checkout -b <your-branch-name>
	git switch -c <your-branch-name>
```

##### 操作

```shell
1,创建一个文件夹02_git_branch,通过code打开
2,使用git init 初始化本地仓库
3,创建一个a.html文件,添加到暂存区,并提交(第一个版本)
4,创建一个b.html文件,添加到暂存区,并提交(第二个版本)
5,创建一个test分支(git branch test)
6,切换到test分支(git switch test)
7,在test分支上创建一个c.html文件,并且在test分支下进行一次提交(第三个版本)
8,使用git log 查看当前版本所在的分支
9,安装gitlens插件,查看分支结构

10,切换到主分支(git switch master)
11,将test分支合并到master分支(git merge test)
12,删除test分支(git brand -d test)
```

## 远程仓库

```shell
创建远程仓库
	1,登录gitee官网,注册gitee账户(手机号)
	
	2,生成ssh公钥
		使用git config --list 查看之前设置的git账号和邮箱
		ssh-keygen -t ed25519 -C "fudong@qq.com"
		然后按3次回车或者输入y,就会生成一个图案,这个图案就是公钥
		+--[ED25519 256]--+
        | ..=**=. .       |
        |+ *.o+..=        |
        |o*   =oo +       |
        |. + =.E =        |
        | . * + BS        |
        |  o . . ==       |
        |   o   o+..      |
        |    .  . o+      |
        |        oo .     |
        +----[SHA256]-----+
        
        直接打开用户文件夹(C:\Users\用户名/.ssh文件夹)
        会发现里面有一个id_ed25519.pub里面存放的就是刚才生成的密钥
        使用记事本或者vscode打开 复制
        
    3,登录码云官网,设置账户的公钥
    	将拷贝的公钥内容粘贴到里面,邮箱自动会设置为标题
    
    4,测试公钥有没有配置成功
    	ssh -T git@gitee.com
    	
    5,创建一个远程仓库
        在gitee首页,点击右边的 '+'  新建仓库,设置仓库名 创建成功
```

##### 推送代码到远程仓库

```shell
1,为远程仓库起一个别名(一般习惯使用origin别名)
	git remote add origin https://gitee.com/fudong0128/git_0827.git
2,推送
	git push -u origin master
	
注意点
	若远程仓库重名,会报错error:remote origin already exitsts 错误
	使用 git remote rm origin 移除指定名称的远程仓库
	使用 git remote rename origin webgis 修改远程仓库名称
	
列出所有远程仓库
	git remote
	
删除远程仓库
	git remote remove <remote-name>
	git remote rm <remote-name>

远程仓库重命名
	git remote rename oldname newname

查看所有远程仓库配置
	git remote -v

查看指定远程详细配置
	git remote show <remote-name>
	
删除远程分支
	git push <remote-name> --delete <branch-name>
	
推送指定本地分支到远程仓库
	git push <remote-name> <branch-name>
	会把本地分支推送到远程的同名分支，若不存在则创建

推送指定本地分支到远程仓库并配置跟踪分支
	git push -u <remote-name> <branch-name>
	设置跟踪关系后, 可以直接使用 git push 或 git pull，而不必每次都指定远程仓库和分支名称。Git 会自动知道你要推送到或拉取自哪个远程分支。
	
显示所有本地分支，以及它们各自的跟踪信息（remote tracking branch）
	git branch -vv
```

##### 远程拉取本地

```shell
1,如果是第一次,需要克隆到本地,选择任意一个文件夹,作为要克隆的地方
  git clone 仓库地址
  克隆一个仓库时，Git 会自动将远程仓库设置为本地仓库的默认远程仓库，并将它命名为 origin。

2,模拟你新增了一个文件(d.html文件),需要将这次改动先提交到本地历史仓库,然后再推送到远程
  刚开始一定要使用cd命令,进入刚才克隆过来的项目
  再使用git add . 添加文件到暂存区
  接着使用 git commit -m '注释' 提交到本地历史仓库
  最后使用 git push -u origin master 推送到远程仓库
  
3,模拟你的领导,想查看一下你提交的代码,不需要在克隆了,只需要pull拉取即可
  使用到的命令:git pull 远程仓库名 分支名
  
从远程仓库的指定分支拉取代码合并到当前工作的本地分支
	git pull <remote-name> <branch-name>
```

##### 代码冲突的解决

```shell
1,程序员A 程序员B
	都先clone远程仓库中的代码到各自的电脑
2,程序员A 程序员B同时修改a.html文件
	修改完之后,都需要先提交到本地历史仓库,再推送到远程仓库

出现代码冲突
	对于A程序员,可以顺利的将改动后的代码推送到远程仓库
	对于B程序员,在推送的时候就会报错,! [rejected] 
	error: failed to push some refs to 'gitee.com:fudong0128/git_0827.git'
	
	正确的解决方式
		只需要在推送到远程仓库之前,先做一个拉取操作,解决完代码冲突之后,再去推送
		使用git pull 远程仓库名 分支名 先拉取到本地
		解决代码冲突(根据代码情况,或者讨论处理)最后重新添加到暂存区,提交本地仓库,推送到远程
```

## 推送实战

```shell
将昨天写的用户管理系统推送到远程仓库

1,node_modules不需要推送到远程仓库(占用的体积比较大,并且在package.json中已经有了依赖包
  的相关信息,可以新建一个.gitignore文件,内容就是node_modules)
  
2,使用git init 初始化 git仓库

3,使用git add .将文件添加到暂存区,提交到本地历史仓库

4,在gitee官网新建一个远程仓库,将代码推送到远程仓库

5,再新建一个文件夹,用于存放克隆过来的用户管理系统

6,刚才克隆项目并不能直接运行,因为他没有依赖的包
  首先要进入这个项目中,使用cd命令
  然后使用npm i命令,就可以自动下载package.json里面依赖的包
  然后就可以运行了
  
自动下载package.json里面依赖的包
    1. npm
        完整命令: npm install
        简写形式: npm i
    2. pnpm
        完整命令: pnpm install
        简写形式: pnpm i
    3. yarn
        完整命令: yarn install
        简写形式: yarn（注意，yarn 直接执行就相当于 yarn install）
```

## CSS3 动画

### animation-timing-function

#### steps(n, `<jumpterm>`)

##### MDN文档

按照 n 个定格在过渡中显示动画迭代，每个定格等长时间显示。例如，如果 n 为 5，则有 5 个步骤。动画是否在 0%、20%、40%、60% 和 80% 处或 20%、40%、60%、80% 和 100% 处暂停，或者在动画的 0% 和 100% 之间设置 5 个定格，又或是在包括 0% 和 100% 的情况下设置 5 个定格（在 0%、25%、50%、75% 和 100% 处）取决于使用以下跳跃项之一：

- jump-start
  表示一个左连续函数，因此第一个跳跃发生在动画开始时。
- jump-end
  表示一个右连续函数，因此最后一个跳跃发生在动画结束时。
- jump-none
  两端都没有跳跃。相反，在 0% 和 100% 标记处分别停留，每个停留点的持续时间为总动画时间的 1/n。
- jump-both
  在 0% 和 100% 标记处停留，有效地在动画迭代过程中添加一个步骤。
- start
  等同于 jump-start。
- end
  等同于 jump-end。

- step-start
  等同于 steps(1, jump-start)。

- step-end
  等同于 steps(1, jump-end)。

##### 我的理解

```css
element{
    animation: transition 5s;
    animation-timing-function: steps(5, jump-end);
}

@keyframes transition {
    100% {
        transform: translateX(500%);
    }
}
```

###### 解析

对于两个状态之间 

- steps(5, jump-start);起始跳跃，包括两端在内共六个节点，在不包含起始节点的五个节点分别停留1s 
- steps(5, jump-end);末尾跳跃，包括两端在内共六个节点，在不包含末尾节点的五个节点分别停留1s 
- steps(5, jump-both);两端跳跃，包括两端在内共七个节点，在不包含两端的五个节点分别停留1s 
- steps(5, jump-none);两端无跳跃，包括两端在内共五个节点，在五个节点即 0%、25%、50%、75% 和 100% 处分别停留1s 

###### 总结 

- steps(n, jump-start);起始跳跃，包括两端在内共n+1个节点，在不包含起始节点的n个节点分别停留time/n
- steps(n, jump-end);末尾跳跃，包括两端在内共n+1个节点，在不包含末尾节点的n个节点分别停留time/n 
- steps(n, jump-both);两端跳跃，包括两端在内共n+2个节点，在不包含两端的五个节点分别停留time/n 
- steps(n, jump-none);两端无跳跃，包括两端在内共n个节点，在包含两端的五个节点分别停留time/n 

## 作业总结

### 伪元素结合元素阴影

可以使用前后伪元素和阴影偏移构建一个正方形⏹️。两条边是伪元素，另外两条是伪元素的阴影

然后通过改变transform和阴影实现⏹️变✔️或❌

```css
label div {
    position: absolute;
    left: 0px;
    height: 40px;
    aspect-ratio: 1;
    transition: 0.5s;
}
label div::before {
    content: '';
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 4px;
    height: 100%;
    background-color: #ddd;
    box-shadow: 36px 0px;
    transition: 0.5s;
}
label div::after {
    content: '';
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 4px;
    background-color: #ddd;
    box-shadow: 0px -36px;
    transition: 0.5s;
}
.agree.checked div {
    transform: translateY(-25%) rotate(-45deg);
}
.agree.checked div::before {
    height: 50%;
    background-color: lightgreen;
    box-shadow: none;
}
.agree.checked div::after {
    background-color: lightgreen;
    box-shadow: none;
}
.refuse.checked div {
    transform: rotate(-45deg);
}
.refuse.checked div::before {
    left: 50%;
    transform: translateX(-50%);
    background-color: lightpink;
    box-shadow: none;
}
.refuse.checked div::after {
    bottom: 50%;
    transform: translateY(50%);
    background-color: lightpink;
    box-shadow: none;
}
```

### align-content

之前：CSS 的 align-content 属性设置了浏览器如何沿着弹性盒子布局的纵轴和网格布局的主轴在内容项之间和周围分配空间

现在：align-content也可以用于普通容器了，对于块级容器，可以用此属性垂直居中子元素

```css
main div {
    border-radius: 0.5rem;
    align-content: center;
}
```

### vertical-align

```html
<div data-number="2"><img src="./images/2.png" alt="" /></div>
```

有时候用img撑开块级容器高度时，img底部和容器底部总有些距离。是因为img的display 属性的默认值是 inline，但没有基线，默认是用底部与父元素的文字基线对齐。

可以设置为bottom，使img的底部与整行的底部对齐。

```css
img {
    vertical-align: bottom;
}
```

这样就没有间隙了

或者设置img为块级元素，就不会被视为行内元素而默认对齐文字基线了

```css
img {
    display: block;
}
```

### 动态改变定时器的延迟时间

九宫格抽奖案例

对于setInterval()，一旦开始，周期时长就不可改变。如果要改变时间，必须先停掉原来的，再开始一个新的循环定时器定时器。

页面部分如下

```html
<div class="container">
    <main>
        <div data-number="1" class=""><img src="./images/1.png" alt="" /></div>
        <div data-number="2"><img src="./images/2.png" alt="" /></div>
        <div data-number="3"><img src="./images/3.png" alt="" /></div>
        <div data-number="8"><img src="./images/4.png" alt="" /></div>
        <div class="start">start</div>
        <div data-number="4"><img src="./images/5.png" alt="" /></div>
        <div data-number="7"><img src="./images/6.png" alt="" /></div>
        <div data-number="6"><img src="./images/7.png" alt="" /></div>
        <div data-number="5"><img src="./images/8.png" alt="" /></div>
    </main>
    <section>aaaa</section>
</div>
```

#### setInterval()

先声明函数，将函数名传入定时器。在函数里按条件判断停掉原来的定时器，开启新的定时器递归调用原函数

```js
const start = document.querySelector('.start')
const section = document.querySelector('section')
const choiceNum = document.querySelectorAll('[data-number]')
const sortNum = [...choiceNum].sort((a, b) => a.dataset.number - b.dataset.number)
const choice = ['游戏手柄', '平板', '谢谢参与', '玩偶', '汽车', '笔记本电脑', '手机', '鞋子']
function onlyMask(element) {
    const preMask = document.querySelector('.masked')
    if (preMask) preMask.classList.remove('masked')
    element.classList.add('masked')
}
start.addEventListener('click', function () {
    section.style.display = 'none'
    if (this.classList.contains('clicked')) return
    this.classList.add('clicked')
    let times = Math.floor(Math.random() * 22) + 16
    const slow = Math.floor(Math.random() * 5) + 4
    let index = 0
    let delay = 100
    let intervalId = setInterval(fn, delay)
    function fn() {
        onlyMask(sortNum[index])
        const now = index
        index = ++index % sortNum.length
        times--
        if (times <= slow) {
            delay = 100 * (slow + 1 - times)
            clearInterval(intervalId)
            intervalId = setInterval(fn, delay)
        }
        if (times == 0) {
            clearInterval(intervalId)
            start.classList.remove('clicked')
            section.style.display = 'block'
            section.textContent = `${choice[now]}`
        }
    }
})
```

注意，额外定义一个变量保存本次调用，变化前的index

#### setTimeout()

可以使用 `setTimeout` 代替 `setInterval`，并在每次回调中递归地调用 `setTimeout` 来实现间隔时间的变化

```js
const start = document.querySelector('.start')
const section = document.querySelector('section')
const choiceNum = document.querySelectorAll('[data-number]')
const sortNum = [...choiceNum].sort((a, b) => a.dataset.number - b.dataset.number)
const choice = ['游戏手柄', '平板', '谢谢参与', '玩偶', '汽车', '笔记本电脑', '手机', '鞋子']
function onlyMask(element) {
    const preMask = document.querySelector('.masked')
    if (preMask) preMask.classList.remove('masked')
    element.classList.add('masked')
}
start.addEventListener('click', function () {
    section.style.display = 'none'
    if (this.classList.contains('clicked')) return
    this.classList.add('clicked')
    let times = Math.floor(Math.random() * 22) + 16
    const slow = Math.floor(Math.random() * 5) + 4
    let index = 0
    let delay = 100
    function run() {
        onlyMask(sortNum[index])
        const now = index
        index = ++index % sortNum.length
        times--
        if (times <= slow) delay = 100 * (slow + 1 - times)
        if (times > 0) {
            setTimeout(run, delay)
        } else {
            start.classList.remove('clicked')
            section.style.display = 'block'
            section.textContent = `${choice[now]}`
        }
    }
    run()
})
```

