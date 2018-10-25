
## v-text与v-html

### 一、v-text

更新元素的 textContent。如果要更新部分的 textContent ，需要使用 {{ Mustache }} 插值。

```HTML
<div v-text="name"></div>
```

v-text指令让div标签里面的innerText内容变成data里面的name值。

> 注：差值表达式{{ Mustache }}的作用和v-text作用差不多。其次，v-text后面不仅可以存放变量，也可以存放表达式。

### 二、v-html

更新元素的 innerHTML 。注意：内容按普通 HTML 插入 - 不会作为 Vue 模板进行编译 。如果试图使用 v-html 组合模板，可以重新考虑是否通过使用组件来替代。

```HTML
<div v-html="name"></div>
```

v-html指令让div标签里面的innerHTML内容变成data里面的name值。

> 注：在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 XSS 攻击。只在可信内容上使用 v-html，永不用在用户提交的内容上。


详细代码见[example5](https://github.com/Bian2017/TravelWebsite/blob/master/docs/example5/index.html)