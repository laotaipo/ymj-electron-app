app模块 控制整个应用程序的事件的生命周期
BrowserWindow模块 创建和管理应用程序的窗口

chromium多进程架构
主进程
    在nodejs中运行。具有require模块和使用。主进程的主要目的是使用BrowserWindow模块创建和管理应用程序窗口
    BrowserWindow类的每个实例创建一个应用程序窗口，且在单独的渲染进程中加载一个网页
    在主进程中可以用window.webContent对象与网页内容进行交互
    BrowserWindow模块是一个EventEmitter
    当一个BrowserWindow实例被销毁时，与其对应的渲染进程也会被终止
渲染进程
    每个Electron应用会为每个打开的BrowserWindow（与每个网页嵌入）生成一个单独的渲染器进程
    为了在渲染进程中直接包含npm模块，必须使用打包工具 如webpack
预加载脚本
    包含了那些执行于渲染进程中，且先于网页内容开始加载的代码。虽然运行于渲染进程，但因能访问nodejs而拥有更多权限
    预加载脚本可以在BrowserWindow构造方法中的webPreferences选项被附加到主进程
    语境隔离意味着预加载脚本与渲染器的主要运行环境使隔离的，以避免泄露任何具特权的API到网页内容代码中
    因此可使用contextBridge模块来安全实现交互
设备访问
    提供了通过 web API 访问设备硬件的方法
应用内购买（MacOs）
键盘快捷键
    该功能允许你为 Electron 应用程序配置应用和全局键盘快捷键
    本地快捷键​：仅在应用程序被聚焦时触发
    全局快捷键​：使用 globalShortcon 模块来检测键盘事件，即使应用程序没有获得键盘焦点
    优先级暂未知
URL远程启动
    可以将您的应用设置为任意特定协议的URL的点击事件
消息端口： TODO
多线程 Web Workers
    Web Workers支持Node.js的所有内置模块，而且asar档案也仍通过Node.js的API来读取
    不过所有的Electron内置模块不可以用在多线程环境中
    在Web Workers里可以直接加载任何原生Node.js模块，但不推荐这样做
    TODO: 使用场景是什么
拖放
通知
    在渲染进程可以通过new Notification直接显示通知
    在主进程可以通过 Notification
离屏渲染
    // TODO 搞清楚用途
在线离线事件探测：navigator.online
Taskbar Progress Bar (Windows & macOS)
    进度条使窗口能够向用户提供其进度信息，而无需被切换到前台
    BrowserWindow实例下的setProgressBar()方法
最近文档：可以通过app.addRecentDocument(path.join(__dirname, fileName)) 管理最近文档
Representing Files in a BrowserWindow (macOS)：可以为每个窗口设置一个代表文件
拼写检查器：自 Electron 8 以来已内置支持 Chromium 拼写检查器
更新应用程序：autoUpdater
Web Embeds：有三种方式可以让你在Electron的BrowserWindow里集成（第三方）web内容
    iframe：
    WebView：不建议 与 <iframe>，<webview> 相比往往稍慢，但在加载和与第三方内容通信以及处理各种事件方面提供了更大的控制
    BrowserView：
    TODO：详细看下三者区别
Windows on ARM: TODO
Tray：托盘图标
自定义窗口：

性能 TODO待完善
    谨慎的加载模块
    过早的加载和执行代码
        只有当需要的时候才分配资源，而不是在启动时分配所有
    阻塞主进程
        对于长期占用CPU的繁重任务，使用worker threads，考虑将他们移动至BrowserWindow，或（作为一个最后手段）生成一个专用进程
        尽可能避免使用同步IPC和remote模块。使用remote模块的时候，非常容易不知情地阻塞UI进程
        每当使用nodejs模块，尽量使用异步的
    阻塞渲染进程
    不必要的polyfills
        TODO polyfills是啥

    不必要的或者阻塞的网络请求
    打包你的代码
安全性

开发
    进程沙盒化 TODO
应用部署
    electron-froge
    electron-builder
    electron-builder
