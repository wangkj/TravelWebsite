# travel-website

## 一、环境配置

1. 安装vue-cli

> npm install -g vue-cli

2. 初始化项目

> vue init webpack TravelWebsite

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


### 单文件组件

当一个文件以.vue后缀作为结尾的时候，我们把这种文件叫做单文件组件，实际上里面放置的是Vue组件。在很多 Vue 项目中，我们使用 Vue.component 来定义全局组件，紧接着用 new Vue({ el: '#container '}) 在每个页面内指定一个容器元素。

这种方式在很多中小规模的项目中运作的很好，在这些项目里 JavaScript 只被用来加强特定的视图。但当在更复杂的项目中，或者你的前端完全由 JavaScript 驱动的时候，下面这些缺点将变得非常明显：

+ 全局定义 (Global definitions) 强制要求每个 component 中的命名不得重复
+ 字符串模板 (String templates) 缺乏语法高亮，在 HTML 有多行的时候，需要用到丑陋的 \
+ 不支持 CSS (No CSS support) 意味着当 HTML 和 JavaScript 组件化时，CSS 明显被遗漏
+ 没有构建步骤 (No build step) 限制只能使用 HTML 和 ES5 JavaScript, 而不能使用预处理器，如 Pug (formerly Jade) 和 Babel

文件扩展名为 .vue 的 single-file components(单文件组件) 为以上所有问题提供了解决方法，并且还可以使用 webpack 或 Browserify 等构建工具。

### <router-view>

<router-view> 用于渲染匹配的组件，它是一个 functional 组件。<router-view> 渲染的组件还可以内嵌自己的 <router-view>，根据嵌套路径，渲染嵌套组件。

其他属性 (非 router-view 使用的属性) 都直接传给渲染的组件， 很多时候，每个路由的数据都是包含在路由参数中。

因为它也是个组件，所以可以配合 <transition> 和 <keep-alive> 使用。如果两个结合一起用，要确保在内层使用 <keep-alive>：

```HTML
<transition>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</transition>
```




#rem

此时的rem是相对于reset中的font-size: 50px计算的。由于设计稿给定的是两倍设计稿，此时反而正是设计稿给的尺寸。


## 三、Vue使用注意点

### 1. 深度作用选择器

使用 scoped 后，父组件的样式将不会渗透到子组件中。但当我们引入第三方组件库时(如使用 vue-awesome-swiper 实现移动端轮播)，需要在局部组件中修改第三方组件库的样式，而又不想去除scoped属性造成组件之间的样式覆盖，这时我们可以通过使用 >>> 操作符穿透scoped：

```CSS
<style scoped>
.a >>> .b { /* ... */ }
</style>
```

上述代码将会编译成：

```CSS
.a[data-v-f3f3eg9] .b { /* ... */ }
```

有些像 Sass 之类的预处理器无法正确解析 >>> 。这种情况下你可以使用 /deep/ 操作符取而代之---这是一个 >>> 的别名，同样可以正常工作。

详细见[链接](https://vue-loader.vuejs.org/zh/guide/scoped-css.html#%E6%B7%B7%E7%94%A8%E6%9C%AC%E5%9C%B0%E5%92%8C%E5%85%A8%E5%B1%80%E6%A0%B7%E5%BC%8F)。

## 四、移动Web开发注意点

### 1. 禁止缩放

html5默认允许用户缩放页面，如果需要禁止缩放，我们需要将user-scalabel=0设置下，具体代码如下：

```HTML
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
```

### 2. 移动端 Retina 屏幕 1px 边框问题

我们知道，像素可以分为物理像素（CSS像素）和设备像素。由于现在手机大部分是Retina高清屏幕，所以在PC端和移动端存在设备像素比的概念。简单说就是你在pc端看到的1px和在移动端看到的1px是不一样的。

在PC端上，像素可以称为CSS像素，PC端上dpr为1。也就说你书写css样式是是多少在pc上就显示多少。而在移动端上，像素通常使用设备像素。往往PC端和移动端上在不做处理的情况下1px显示是不同的。

一个物理像素等于多少个设备像素取决于移动设备的屏幕特性(是否是Retina)和用户缩放比例。

如果是Retina高清屏幕，那么dpr的值可能为2或者3，那么当你在pc端上看到的1px时，在移动端上看到的就会是2px或者3px。

由于业务需求，我们需要一些方法来实现移动端上的1px。

此时可以引入border.css来解决这一问题。


### 3. 统一浏览器的默认样式reset.css

把不同手机浏览器的初始样式做一个统一，引入reset.css

### 4. 移动端 300 毫秒点击延迟问题

在移动端，某些机型某些浏览器上，点击click事件会延迟300毫秒然后才执行。可以使用fast-click库。

### 5. 宽高比设置

```CSS
overflow: hidden
  width: 100%
  height: 0
  padding-bottom: 50%
```


Vue DevTools

## 五、样式优化

### 1. 混合书写(Mixins) --- 混入

混入和函数定义方法一致，但是应用却大相径庭。

例如，下面有定义的border-radius(n)方法，其却作为一个mixin（如，作为状态调用，而非表达式）调用。

当border-radius()选择器中调用时候，属性会被**扩展并复制**在选择器中。

```
border-radius(n)
  -webkit-border-radius n
  -moz-border-radius n
  border-radius n

form input[type=button]
  border-radius(5px)
```

编译后结果(属性被扩展并复制到选择器中)：

```
form input[type=button] {
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
```

使用混入书写，你可以完全忽略括号，提供梦幻般私有属性的支持。

```
border-radius(n)
  -webkit-border-radius n
  -moz-border-radius n
  border-radius n

form input[type=button]
  border-radius 5px
```

注意到我们混合书写中的border-radius当作了属性，而不是一个递归函数调用。

详见[链接](https://www.zhangxinxu.com/jq/stylus/mixins.php)。

### flex

flex影响宽度，此时可以引入min-width： 0进行解决。

 text-indent: .2rem




## 六、vue-cli 配置

### 1. 代理转发

在开发环境下，可通过 webpack-dev-server 将axios请求转发到本地，利用mock来返回数据。代理转发的相关配置文件位于 config/index.js 。

```JS
module.exports = {
  dev: {
    proxyTable: {
      '/api': {
        target: 'http://localhost:8080',
        pathRewrite: {
          '^/api': '/static/mock'
        }
      }
    },
  }
}
```

如果不想始终传递 /api，则需重写路径。

### 2. assets目录和static目录区别

**Webpacked Assets**

为了回答这个问题，我们首先需要了解Webpack如何处理静态资产。在 *.vue 组件中，所有模板和CSS都会被 vue-html-loader 及 css-loader 解析，并查找资源URL。例如，在 \<img src="./logo.png"> 和 background: url(./logo.png) 中，"./logo.png" 是相对的资源路径，将由 **Webpack 解析为模块依赖**。

因为 logo.png 不是 JavaScript，当被视为模块依赖时，需要使用 url-loader 和 file-loader 处理它。vue-cli 的 webpack 脚手架已经配置了这些 loader，因此可以使用相对/模块路径。

由于这些资源可能在构建过程中被内联/复制/重命名，所以它们基本上是源代码的一部分。这就是为什么建议将 Webpack 处理的静态资源放在 /src 目录中和其它源文件放一起的原因。事实上，甚至不必把它们全部放在 /src/assets：可以用模块/组件的组织方式来使用它们。例如，可以在每个放置组件的目录中存放静态资源。

**"Real" Static Assets**

相比之下，static/ 目录下的文件并不会被 Webpack 处理：它们会直接被复制到最终目录（默认是dist/static）下。必须使用**绝对路径**引用这些文件，这是通过在 config.js 文件中的 build.assetsPublicPath 和 build.assetsSubDirectory 连接来确定的。

任何放在 static/ 中文件需要以绝对路径的形式引用：/static/[filename]。如果更改 assetSubDirectory 的值为 assets，那么路径需改为 /assets/[filename]。

> 注：static目录可以被外部访问到:http://localhost:8080/static/mock/index.json