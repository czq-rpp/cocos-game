# cocos-game
cocos游戏引擎学习

#代码编辑环境配置（推荐使用vscode）
1、安装 Cocos Creator API 适配插件：开发者 -> VS Code 工作流 -> 安装 VS Code 扩展插件；




2、在项目中生成智能提示数据：开发者 -> VS Code 工作流 -> 更新 VS Code 智能提示数据，对于每个不同的项目都需要运行一次这个命令（jsconfig.json，creator.d.ts）。




3、设置文件显示和搜索过滤：

{
    "search.exclude": {
        "**/node_modules": true,
        "**/bower_components": true,
        "build/": true,
        "temp/": true,
        "library/": true,
        "**/*.anim": true
    },
    "files.exclude": {
        "**/.git": true,
        "**/.DS_Store": true,
        "**/*.meta": true,
        "library/": true,
        "local/": true,
        "temp/": true
    }
}

vscode配置文件里加入。




4、使用 VS Code 激活脚本编译：

（1） 安装 cURL：http://www.confusedbycode.com/curl/；
（2） 添加 VS Code 编译任务：

a、开发者 -> VS Code 工作流 -> 添加编译任务，（.vscode 和 tasks.json）；

b、在 VS Code 里按下 Cmd/Ctrl+p，激活 快速打开 输入框，然后输入 task compile；

c、Code -> 首选项 -> 键盘快捷方式，keybindings.json：
[
    {
        "key": "ctrl+p", //请配置自己习惯的快捷键
        "command": "workbench.action.tasks.runTask",
        "args": "compile"
    }
]



5、使用 VS Code 调试网页版游戏

（1）安装VS Code 插件：Debugger for Chrome；
（2）开发者->VS Code 工作流->添加 Chrome Debug 配置（.vscode/launch.json）
（3）调试


#项目结构
