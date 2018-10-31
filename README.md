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

### 修改meta

禁止缩放
minimum-scale=1.0,maximum-scale=1.0,user-scalable=no

把不同手机浏览器的初始样式做一个统一，引入reset.css

### 移动端有个1像素边框的问题

手机屏幕分辨率笔记高，1px可能对应两个物理像素高度。所以需要引入1像素解决问题。实现真正的物理1像素。

### 移动端有个300毫秒点击延迟的问题

在移动端，某些机型某些浏览器上，点击click事件会延迟300毫秒然后才执行。可以使用fast-click库。

#rem

此时的rem是相对于reset中的font-size: 50px计算的。由于设计稿给定的是两倍设计稿，此时反而正是设计稿给的尺寸。