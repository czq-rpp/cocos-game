# cocos-game

## 前言

> cocos游戏引擎学习，新手上路

## 目录
- [代码编辑环境配置（推荐使用vscode）](#代码编辑环境配置)
- [项目结构](#项目结构)
- [编辑器基础](#编辑其基础)

---

## 代码编辑环境配置

### 安装 Cocos Creator API 适配插件：
- 开发者 -> VS Code 工作流 -> 安装 VS Code 扩展插件；

### 在项目中生成智能提示数据：
- 开发者 -> VS Code 工作流 -> 更新 VS Code 智能提示数据；
- 对于每个不同的项目都需要运行一次这个命令（jsconfig.json，creator.d.ts）。

### 设置文件显示和搜索过滤：

```js
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
```
- vscode配置文件里加入。




### 使用 VS Code 激活脚本编译：

- 安装 cURL：http://www.confusedbycode.com/curl/；
- 添加 VS Code 编译任务：

1. 开发者 -> VS Code 工作流 -> 添加编译任务，（.vscode 和 tasks.json）；

2. 在 VS Code 里按下 Cmd/Ctrl+p，激活 快速打开 输入框，然后输入 task compile；

3. Code -> 首选项 -> 键盘快捷方式，keybindings.json：

```js
[
    {
        "key": "ctrl+p", //请配置自己习惯的快捷键
        "command": "workbench.action.tasks.runTask",
        "args": "compile"
    }
]
```

### 使用 VS Code 调试网页版游戏

- 安装VS Code 插件：Debugger for Chrome；
- 开发者->VS Code 工作流->添加 Chrome Debug 配置（.vscode/launch.json）
- 调试


## 项目结构
- 版本控制：assets、settings、project.json
- 不需要进入版本控制：library、local、build




## 编辑器基础