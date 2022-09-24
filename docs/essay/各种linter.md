## eslint

- a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code

### Install and Usage

- `npm init @eslint/config`
- `npx eslint yourfile.js`
- `[configuration](https://eslint.org/docs/latest/user-guide/configuring/)`
- 太多了，，

### 与其他集成

- `prettier`
	- `npm i prettier eslint-config-prettier eslint-plugin-prettier -D`
	- `extends: ["eslint:recommended","prettier","plugin:prettier/recommended"]`
	- `plugins:["prettier"]`
	- `rules:{"prettier/prettier": "error"}`

## stylelint

- A mighty, modern linter that helps you avoid errors and enforce conventions in your styles.

### Getting started

- `lint css file`
	- `npm install -D stylelint stylelint-config-standard`
	- `echo "{"extends": "stylelint-config-standard"}" > .styleintrc.json`
	- `共享prettier配置`
		- `npm install -D stylelint-config-prettier`
		- 在extends数组中添加`stylelint-config-prettier`
	- `npx stylelint "**/*.css"`
- `lint everything`
	- `using shared config`
	- `using custom syntax`
	- `using more than one custom syntax`：使用`overrides`选项对某些文件的规则进行重写
- Customize
	- [Rules](https://stylelint.io/user-guide/configure/#rules)
	- [Plugins](https://stylelint.io/user-guide/configure)

## husky

- Modern native git hooks made easy
- `install`：`npm install husky -D`
- `uninstall`：`npm uninstall husky && git config --unset core.hooksPath`
- `enable Git hooks`：`npm pkg set scripts.prepare "husky install"`
- `create a hook`
	- `pre-commit`：`npx husky add .husky/pre-commit "some cmds"`

## lint-staged

- Run linters on git staged files
- `install`：`npm install -D lint-staged`
- Set up the `pre-commit` git hook to run lint-staged
	- `npm install husky -D`
	- `npx husky add .husky/pre-commit "npx --no -- lint-staged"`
- `configuration`
	1. 在`package.json`中添加l`lint-staged`字段，为指定类型的文件执行对应的linter，例如：`{ "*.js": "eslint" }`
	2. 新建一个`lint-staged.config.js`，然后配置`{ "*": "your-cmd" }`，或者是一个命令数组

## commitlint

- 检查`git commit`信息

### local setup

- `install commitlint`：`npm install -D @commitlint/cli @commitlint/config-conventional`
- `configure`：`echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js`
- `install husky`：`npm install husky -D`
- `configure`：`npx husky add .husky/commit-msg "npx --no-install commitlint -e $HUSKY_GIT_PARAMS"`
- commit的时候自动触发commitlint检查，如果不符合规定则取消提交

### CI setup

- `Github Actions`：`[super linter](https://github.com/marketplace/actions/super-linter)`，然后略加修改

### Concepts

#### Commit conventions

```txt
type(scope?): subject

body?

footer?
```

#### Shareable configuration

- 本地配置：`extends: ['./example'] // => ./example.js`

### reference

- `cli`: `npx commitlint --help`
- `configuration`：`extends`，`rules`，`ignores`，`prompt`
- `[rules](https://commitlint.js.org/#/reference-rules)`
- 不错的插件
	- [function-rules](https://github.com/vidavidorra/commitlint-plugin-function-rules)
	