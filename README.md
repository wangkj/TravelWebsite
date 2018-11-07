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

众所周知，现在所使用的主流浏览器对一些标签的默认属性上并没有做到统一，所以我们偶尔会发现，某个页面在chrome浏览器上很正常，到了firefox上面却有意想不到的偏差。当然编程人员不喜欢这样的兼容性问题的，而 reset.css 就是解决默认样式不兼容问题的办法之一。

CSS reset的作用是让各个浏览器的CSS样式有一个统一的基准，而这个基准一般认为就是“清零”。

### 4. 移动端 300 毫秒点击延迟问题

一般情况下，如果没有经过特殊处理，移动端浏览器在派发点击事件的时候，通常会出现300ms左右的延迟。也就是说，当我们点击页面的时候移动端浏览器并不是立即作出反应，而是会等上一小会儿才会出现点击的效果。在移动WEB兴起的初期，用户对300ms的延迟感觉不明显。但是，随着用户对交互体验的要求越来越高，现今，移动端300ms的点击延迟逐渐变得明显而无法忍受。

那么，移动端300ms的点击延迟是怎么来的呢？

#### 4.1 产生原因

移动浏览器上支持的双击缩放操作，以及IOS Safari 上的双击滚动操作，是导致300ms的点击延迟主要原因。从点击屏幕上的元素到触发元素的 click 事件，移动浏览器会有大约 300 毫秒的等待时间，因为它想看看你是不是要进行双击（double tap）操作。

#### 4.2 解决方案

##### 1) 禁用缩放

对于不需要缩放的页面，通过设置meta标签禁用缩放，表明这个页面是不需要缩放的，双击缩放就没有意义了。此时浏览器可以禁用默认的双击缩放行为并且去掉300ms的点击延迟。
该方法缺点在于必须通过完全禁用缩放来达到去掉点击延迟的目的，但我们初衷是想禁止默认双击缩放行为，这样就不用等待300ms来判断当前操作是否是双击。但是通常情况下我们还是希望能通过双指缩放来进行缩放操作，比如放大图片，很小的一段文字。

```HTML
<pre>
  <code>
    <meta name="viewport" content="user-scalable=no">
    <meta name="viewport" content="initial-scale=1,maximum-scale=1">
  </code>
</pre>
```

##### 2) 更改默认视口宽度

移动端浏览器默认视口宽度一般比设备浏览器视窗宽度大，通常是980px,我们可以通过如下标签设置视口宽度为设备宽度。
```HTML
<pre><code><meta name="viewport" content="width=device-width"></code></pre>
```

因为双击缩放主要是用来改善桌面站点在移动端浏览体验的，而随着响应式设计的普及，很多站点都已经对移动端坐过适配和优化了，这个时候就不需要双击缩放了，如果能够识别出一个网站是响应式的网站，那么移动端浏览器就可以自动禁掉默认的双击缩放行为并且去掉300ms的点击延迟。chrome 32+中，如果设置了上述meta标签，那浏览器就可以认为该网站已经对移动端做过了适配和优化，就无需双击缩放操作了。
这个方案相比方案一的好处在于，它没有完全禁用缩放，而只是禁用了浏览器默认的双击缩放行为，但用户仍然可以通过双指缩放操作来缩放页面。不足在于其他浏览器的支持有限。

fastclick 解决300ms延迟。
***** FastClick 是 FT Labs 专门为解决移动端浏览器 300 毫秒点击延迟问题所开发的一个轻量级的库。

基本原理：FastClick的实现原理是在检测到touchend事件的时候，会通过DOM自定义事件立即出发模拟一个click事件，并把浏览器在300ms之后真正的click事件阻止掉。
fastClick的核心代码
```HTML
<pre>
  <code>
    FastClick.prototype.onTouchEnd = function(event){ 
      // 一些状态监测代码 
      // 从这里开始， 
      if (!this.needsClick(targetElement)) { 
        // 如果这不是一个需要使用原生click的元素，则屏蔽原生事件，避免触发两次click 
        event.preventDefault(); 
        // 触发一次模拟的click
         this.sendClick(targetElement, event); 
      }
    }
  </code>
</pre>
```

这里可以看到，FastClick在touchEnd的时候，在符合条件的情况下，主动触发了click事件，这样避免了浏览器默认的300毫秒等待判断。为了防止原生的click被触发，这里还通过event.preventDefault()屏蔽了原生的click事件。

更多[内容](https://www.jianshu.com/p/16d3e4f9b2a9)。

### 5. 宽高比设置

```CSS
overflow: hidden
  width: 100%
  height: 0
  padding-bottom: 50%
```

### 5. Touch对象

Touch对象代表一个触点，可以通过event.touches[0]获取，每个触点包含位置，大小，形状，压力大小，和目标 element属性。

```JS
{
  screenX: 511, 
  screenY: 400,//触点相对于屏幕左边沿的Y坐标
  clientX: 244.37899780273438, 
  clientY: 189.3820037841797,//相对于可视区域
  pageX: 244.37, 
  pageY: 189.37,//相对于HTML文档顶部，当页面有滚动的时候与clientX=Y 不等
  force: 1,//压力大小，是从0.0(没有压力)到1.0(最大压力)的浮点数
  identifier: 1036403715,//一次触摸动作的唯一标识符
  radiusX: 37.565673828125, //能够包围用户和触摸平面的接触面的最小椭圆的水平轴(X轴)半径
  radiusY: 37.565673828125,
  rotationAngle: 0,//它是这样一个角度值：由radiusX 和 radiusY 描述的正方向的椭圆，需要通过顺时针旋转这个角度值，才能最精确地覆盖住用户和触摸平面的接触面
  target: {} // 此次触摸事件的目标element
}
```

**如何获取字母表的偏移高度**

```JS
// offsetTop：获取字符A距离其offsetParent元素的顶部的距离(该距离不包含导航条的高度)。
const startY = this.$refs['A'][0].offsetTop
// clientY：返回触点相对于可见视区(visual viewport)上边沿的的Y坐标。
// touchY: clientY - 导航条的高度
const touchY = e.touches[0].clientY - 74
// 获取触底的偏移差值，再除以每个字母的高度
const index = Math.floor((touchY - startY) / 20)
if (index >= 0 && index < this.letters.length) {
  this.$emit('change', this.letters[index])
}
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

### 2. Flex布局导致省略符无效

在一个设置了 flex:1 的容器中，如果文字很长，这时候文字就会超出容器，而不是呆在设置好的动态剩余的空间中。举例如下：有main容器是flex布局，里面内容左边是一个logo固定宽高，右边content动态宽度。

```HTML
<div class="main">
  <img alt="" class="logo" src="pic.jpg">
  <div class="content">
      <h4 class="name">a name</h4>
      <p class="info">a info</p>
      <p class="notice">This is notice content.</p>
  </div>
</div>
```

```CSS
.main {
  display: flex;
}

.logo {
  width: 100px;
  height: 100px;
  margin: 10px;
}

.content {
  flex: 1;
}

.content > * {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

.notice内容可能会非常长，需要隐藏显示，即不换行，并留下省略符 ... 作标记。这里会发现 text-overflow: ellipsis 不生效，省略符根本没有出现。而且因为设置了 nowrap 会发现文字会将 content 撑开，导致内容超出了屏幕。

```
尝试取消父元素.content的flex: 1，无效； 
尝试取消.main容器的display: flex，省略号出现；
```

因此猜测是flex布局的问题，进一步猜测省略符需要对父元素限定宽度。尝试对父元素.content设置width: 100%无效，但是设置width: 0可行(注：min-width: 0同样可行)。即：

```CSS
.content {
  flex: 1;
  width: 0;
}
```

如果不设置宽度，.content可以被子节点无限撑开，因此.notice总有足够的宽度在一行内显示所有文本，也就不能触发截断省略的效果。测试还有一种方法可以达到效果(设置overflow: hidden)：

```CSS
.content {
  flex: 1;
  overflow: hidden；  
}
```

通过上面讲述的两种方法都可以达到我们需要的效果，即给 content 设置了 flex 为 1 的时候，它会动态的获得父容器的剩余宽度，且不会被自己的子元素把内容撑开。

### 3. box-sizing样式

在CSS中，你设置一个元素的 width 与 height 只会应用到这个元素的内容区。如果这个元素有任何的 border 或 padding ，绘制到屏幕上时的盒子宽度和高度会加上设置的边框和内边距值。这意味着当你调整一个元素的宽度和高度时需要时刻注意到这个元素的边框和内边距。当我们实现响应式布局时，这个特点尤其烦人。

box-sizing 属性可以被用来调整这些表现:

+ content-box 是默认值。如果你设置一个元素的宽为100px，那么这个元素的内容区会有100px宽，并且任何边框和内边距的宽度都会被增加到最后绘制出来的元素宽度中。

+ border-box 告诉浏览器去理解你设置的边框和内边距的值是包含在width内的。也就是说，如果你将一个元素的width设为100px,那么这100px会包含其它的border和padding，内容区的实际宽度会是width减去border + padding的计算值。大多数情况下这使得我们更容易的去设定一个元素的宽高。

```
.search-input
  box-sizing: border-box
  width: 100%
  padding: 0 .1rem
```

如上，一个input框设置宽度为100%，此时input框会撑满整个屏幕。当设置padding后，则input框超出了屏幕。此时可以设置box-sizing: border-box来避免上述情况发生。

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

> 注：static目录可以被外部访问到: http://localhost:8080/static/mock/index.json 。


## 七、项目优化

### 1. 轮播(swiper)组件默认显示最后一个页面(非第一个页面)

```HTML
<div class="wrapper">
  <swiper :options="swiperOption">
    <swiper-slide v-for="item of list" :key="item.id">
      <img class="swiper-img" :src="item.imgUrl" />
    </swiper-slide>
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
</div>
```

这是因为在创建swiper的时候，是根据props传递的初始值(空数组[])创建的，故导致轮播组件在显示所有页面的时候默认显示最后一个页面。

针对这一问题，可以让swiper初次创建的时候，由完整数据来进行创建。

```HTML
<swiper :options="swiperOption" v-if="list.length">
```

根据list.length长度来决定是否创建swiper，但这样写不是特别优雅，因为要尽量避免在模板文件里面出现逻辑性代码，此时还可以通过计算属性来实现。

```HTML
<swiper :options="swiperOption" v-if="showSwiper">
<script>
export default {
  name: 'HomeSwiper',
  computed: {
    showSwiper () {
      return this.list.length
    }
  }
}
</script>
```

### 2. 减少TouchMove的执行次数

通过函数节流方式，减少TouchMove的执行次数。

详见代码分支[daily/0.0.14](https://github.com/Bian2017/TravelWebsite/commit/e4382e581268d70551822cf190f0dffa9b541f83)。

其次将startY的每次计算放置到updated生命周期中，减少了频繁运算。

详见代码分支[daily/0.0.13](https://github.com/Bian2017/TravelWebsite/commit/abaaf23c12c84464850a501c9f7254cb4bc582ba)

### 3. keep-alive优化网页性能

我的路由内容被加载一次之后，就把路由中的内容放置到内存之中，下次再进入这个路由的时候，就无需重新渲染组件，这样就避免了重新执行钩子函数，只需从内存中把之前的内容拿出来显示即可。

此时多了一个生命周期函数activited。

```JS
activated () {
  if (this.lastCity !== this.city) {
    this.lastCity = this.city
    this.getHomeInfo()
  }
}
```

根据city是否发生变化，来决定是否重新发出请求。

## 八、第三方插件

### 1. better-scroll插件

better-scroll 是一款重点解决移动端（现已支持 PC 端）各种滚动场景需求的插件。相比原生scroll，better-scroll可以轻松hook各种自定义的事件(onBeforeScrollStart, onScrollStart, onScroll, onScrollEnd, flick)。

```HTML
<div class="wrapper">
  <ul class="content">
    <li>...</li>
    <li>...</li>
    ...
  </ul>
  <!-- 这里可以放一些其它的 DOM，但不会影响滚动 -->
</div>
```

上面的代码中 better-scroll 是作用在外层 wrapper 容器上的，滚动的部分是 content 元素。这里要注意的是，**better-scroll 只处理容器（wrapper）的第一个子元素（content）的滚动，其它的元素都会被忽略**。

最简单的初始化代码如下：

```JS
import BScroll from 'better-scroll'
let wrapper = document.querySelector('.wrapper')
let scroll = new BScroll(wrapper)
```

better-scroll 提供了一个类，实例化的第一个参数是一个原生的 DOM 对象。当然，如果传递的是一个字符串，better-scroll 内部会尝试调用 querySelector 去获取这个 DOM 对象。

详细[链接](https://github.com/ustbhuangyi/better-scroll/blob/master/README_zh-CN.md)。

better-scroll 提供了很多灵活的 API，当我们基于 better-scroll 去实现一些 feature 的时候，会用到这些 API，了解他们会有助于开发更加复杂的需求。

#### scrollToElement(el, time, offsetX, offsetY, easing)

+ 参数：
  + {DOM | String} el 滚动到的目标元素, 如果是字符串，则内部会尝试调用 querySelector 转换成 DOM 对象。
  + {Number} time 滚动动画执行的时长（单位 ms）
  + {Number | Boolean} offsetX 相对于目标元素的横轴偏移量，如果设置为 true，则滚到目标元素的中心位置
  + {Number | Boolean} offsetY 相对于目标元素的纵轴偏移量，如果设置为 true，则滚到目标元素的中心位置
  + {Object} easing 缓动函数，一般不建议修改，如果想修改，参考源码中的 ease.js 里的写法
+ 返回值：无
+ 作用：滚动到指定的目标元素。

```JS
watch: {
  letter () {
    if (this.letter) {
      const element = this.$refs[this.letter][0]
      this.scroll.scrollToElement(element)
    }
  }
}
```

### 2. ref属性

当 v-for 用于元素或组件的时候，ref引用信息将是包含 DOM 节点或组件实例的数组。

```HTML
<template>
  <ul class="list">
    <li class="item"
      v-for="item of letters"
      :key="item"
      :ref="item"
      @touchmove="handleTouchMove"
    >
      ...
    </li>
  </ul>
</template>

<script>
export default {
  ...
  methods: {
    handleTouchMove (e) {
      const startY = this.$refs['A'][0].offsetTop       // 有v-for时，refs的引用是数组
      const touchY = e.touches[0].clientY - 74
      const index = Math.floor((touchY - startY) / 20)
      if (index >= 0 && index < this.letters.length) {
        this.$emit('change', this.letters[index])
      }
    },
  }
  ...
}
</script>
```

boder-bottom

### 3. swiper插件

当swiper插件开始时是处于隐藏状态，如果再次将它显示出来的时候，swiper计算宽度会有些问题，导致轮播图无法正常的滚动，此时可以通过observeParents 和 observer 这两个参数来解决。

```JS
swiperOptions: {
  pagination: '.swiper-pagination',
  paginationType: 'fraction',
  observer: true,
  observeParents: true
}
```

这表示这个swiper插件只要监听到我这个元素或者父级元素发生DOM结构变化，我会自动地自我刷新一次，通过自我刷新方式就能解决计算宽度问题。


详见[链接](https://3.swiper.com.cn/)。

### localStorage

localStorage在目前的浏览器环境来说，还不是完全稳定的，可能会出现各种各样的问题，所以在设置localStorage时一定要考虑异常处理。

只要使用localStorage，最好在外层加上一个try {} catche (e) {} 。因为在某些浏览器，如果用户关闭了本地存储这个功能或者使用隐身模式，使用localStorage会导致浏览器抛出异常，整个代码就无法运行。为了避免这一问题，建议在localStorage外层加上try {} catch{} 。

## 九、路由配置

### 1. router-link

如何避免router-link导致样式问题？引入router-link默认使用的是a标签，可以使用li标签进行替换，使用tag属性。

```HTML
<router-link
  tag="li"
  class="item border-bottom"
  v-for="item of list"
  :key="item.id"
  :to="'/detail' + item.id"
>
  <img class="item-img" :src="item.imgUrl" />
  <div class="item-info">
    <p class="item-title">{{item.title}}</p>
    <p class="item-desc">{{item.desc}}</p>
    <button class="item-button">查看详情</button>
  </div>
</router-link>
```

注： 动态路由概念

```
{
  path: '/detail/:id',
  name: 'detail',
  component: Detail
}
```

"/detail/:id"表示动态路由的概念。


### document.documentElement

在前端开发中，我们经常需要获取网页中滚动条滚过的长度，获取该值的方式一般通过scrollTop属性，如：document.body.scrollTop，是不是还经常看见document.documentElement.scrollTop，这两者都是经常用来获取文档滚动条滚过长度值的方式，他们又有什么区别呢？

#### DTD

DTD告诉浏览器当前文档用的是什么标记语言，然后浏览器才能正确的根据W3C标准解析文档代码。

目前htmlDTD有三种类型：

+ Strict DTD：严格的文档类型定义

不能包含已过时的元素（或属性）和框架元素。

+ Transitional DTD：过渡的文档类型定义

能包含已过时的元素和属性但不能包含框架元素。

+ Frameset DTD: 框架集文档类型定义

能包含已过时的元素和框架元素。

在html文档中定义DTD就是通过！doctype定义，如下，是一个html4.0的过渡DTDhtml文档：

```HTML
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
    <head>
        <title></title>
    </head>
    <body>
    </body>
</html>
```

或在html5中：

```HTML
<!doctype html>
<html>
    <head>
        <title></title>
    </head>
    <body>
    </body>
</html>
```

#### document.documentElement与document.body

+ document代表的是整个文档(对于一个网页来说包括整个网页结构)，document.documentElement是整个文档节点树的根节点，在网页中即html标签；
+ document.body是整个文档DOM节点树里的body节点，网页中即为body标签元素。

我们常看见如下这种写法获取页面滚动条滚过的长度：

```JS
var top = document.documentElement.scrollTop || document.body.scrollTop;
或
var top = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
```

在文档使用了DTD时，document.body.scrollTop的值为0，此时需要使用document.documentElement.scrollTop来获取滚动条滚过的长度；在未使用DTD定义文档时，使用document.body.scrollTop获取值。
