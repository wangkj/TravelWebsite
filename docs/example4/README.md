
## 实例生命周期钩子

每个 Vue 实例在被创建时都要经过一系列的初始化过程——例如，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做生命周期钩子的函数，这给了用户在不同阶段添加自己的代码的机会。

> 注：生命周期钩子函数可理解为Vue实例在某一个时间点会自动执行的函数。

![](https://cn.vuejs.org/images/lifecycle.png)

### 1. beforeCreate

在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。

> 注：此时el和data并未初始化。

### 2. created

在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。

> 注：完成了data数据的初始化，el没有。

>另外注意：created生命周期函数执行完毕后，会判断当前实例有没有template选项，有template选项，则将template编译到render函数中，否则会将el外部的HTML作为template选项，然后编译到render函数中。

### 3. beforeMount
在挂载开始之前被调用：相关的 render 函数首次被调用。

> 注：完成了 el 和 data 初始化。

### 4. mounted

el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$el 也在文档内。

> 注：完成挂载。

### 5. beforeUpdate

数据更新时调用，发生在虚拟 DOM 打补丁之前。这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。

### 6. updated

当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。

### 7. beforeDestroy

实例销毁之前调用。

### 8. destroyed

Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。


详细代码见[example4](https://github.com/Bian2017/TravelWebsite/blob/master/docs/example4/index.html)