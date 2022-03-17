# 美化

## 效果图

![效果图](/images/beautyresult.png)

## 安装 windows terminal

1. 不能上 store，去 github 下的，因为官方开源了
2. 因为想要设置默认命令行，但是因为只有 windows11 才有，所以放弃

## 安装 powershell

1. 去 microsoft/terminal 的官方仓库下在 msi 的版本，然后点击安装
2. 在 windows terminal 的配置文件中添加 powershell，guid 是唯一标识符，去查个网站生成一个
3. 然后记得在 windows terminal 设置中指向 exe 文件
4. 图标在安装文件夹下的 asset 里

## 配置文件

1. 按照`$profile.CurrentUserCurrentHost`来生成配置文件
2. `. 其他文件位置`,就可以执行其他文件了(例如分模块)
3. 注意：设置别名时想要带参数，需要弄一个函数，把别名设置为函数名就可以
4. 其他看官方文档

## 安装字体 nerd

- oh-my-posh 官方文档有说，之后挑一个安就行，主要是为了 oh-my-posh 能正常显示

## 安装 oh-my-posh

1. 去官网安装 oh-my-push
2. 然后安装 posh-git
3. 之后在文件中添加以下语句
   1. Import-Module posh-git
   2. Import-Module oh-my-posh
   3. Set-PoshPrompt Paradox # 设置主题
4. 之后为了解决编码问题，在`$profile`下添加语句：`$OutputEncoding = [console]::InputEncoding = [console]::OutputEncoding = New-Object System.Text.UTF8Encoding`

## 安装`terminal-icons`

1. `Install-Module -Name Terminal-Icons -Repository PSGallery -Force`
2. `Import-Module Terminal-Icons`

## 安装`z`：directory jumper

1. `Install-Module -Name z -Force`

## 在 VSCode 中使用

1. 配置：`terminal.integrated.profiles.windows`

## 提一下各种配置文件

### windows terminal

```json
"defaultProfile": "{fd66f38e-0ac4-4eeb-9399-441f694e7aaf}",
"language": "zh-Hans-CN",
"profiles": {
  "defaults": {
    "colorScheme": "One Half Dark",
    "font": {
      "face": "Hack NF"
    },
    "opacity": 50,
    "useAcrylic": true
  },
  "list": [
    {
      "commandline": "E:\\app\\study\\PowerShell\\7\\pwsh.exe",
      "guid": "{fd66f38e-0ac4-4eeb-9399-441f694e7aaf}",
      "hidden": false,
      "icon": "E:\\app\\study\\PowerShell\\7\\assets\\Powershell_av_colors.ico",
      "name": "PowerShell"
    },
  ]
}
```

### powershell

#### user_profile.ps1

```powershell
# Prompt
Import-Module posh-git
Import-Module oh-my-posh
Import-Module Terminal-Icons
Import-Module z
set-poshprompt night-owl
# Alias
function dev{ npm run dev }
Set-Alias ll ls
Set-Alias g git
Set-Alias grep findstr
Set-Alias d dev
```

#### Microsoft.PowerShell_profile.ps1

- 根据`$profile.CurrentUserCurrentHost`生成，也有其他选项

```powershell
# 解决oh-my-posh的问题，具体去看官方FAQ
$OutputEncoding = [console]::InputEncoding = [console]::OutputEncoding = New-Object System.Text.UTF8Encoding
# 执行user_profile
. E:\数据\Documents\PowerShell\user_profile.ps1
```

### vscode

```json
"terminal.integrated.cursorBlinking": true,
"terminal.integrated.fontFamily": "Hack NF",
"terminal.integrated.defaultProfile.windows": "PowerShell 7",
"terminal.external.windowsExec": "PowerShell 7",
"terminal.integrated.profiles.windows": {
  "PowerShell 7": {
    "icon": "terminal-powershell",
    "path": "E:\\app\\study\\PowerShell\\7\\pwsh.exe"
  },
  "Command Prompt": {
    "path": [
      "${env:windir}\\Sysnative\\cmd.exe",
      "${env:windir}\\System32\\cmd.exe"
   ],
    "args": [],
    "icon": "terminal-cmd"
  }
}
```

## 解决 powershell 编码问题

- 因为默认不是 uft-8，所以显示中文会乱码

### 可能会有用的解决

1. chcp 65001(utf-8)这个不能解决 gbk
2. `$OutputEncoding = [console]::InputEncoding = [console]::OutputEncoding = New-Object System.Text.UTF8Encoding`(之前解决 oh-my-posh 的问题用过)
3. 改控制面板的区域里，点上 beta 版然后重启
