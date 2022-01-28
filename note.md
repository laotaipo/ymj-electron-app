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