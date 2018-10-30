
## 作用域插槽

有的时候你希望提供的组件带有一个可从子组件获取数据的可复用的插槽，此时可以使用作用域插槽。

```HTML
<div id="app">
  <child>
    <!-- 从子组件接收的数据都放置在props中 -->
    <template slot-scope="props">
      <li>{{props.item}}</li>
    </template>
  </child>
</div>
<script>
  Vue.component('child', {
    data: function () {
      return {
        list: [1, 2, 3, 4]
      }
    },
    template: `<div>
        <ul>
          <!-- 将item作为一个插槽的 prop 传入。-->
          <slot v-for="item of list" :item=item>
          </slot>
        </ul>
      </div>`
  })

  var app = new Vue({
    el: '#app',
  })
</script>
```

使用 <template> 定义一个模板，并且可以通过 slot-scope 特性从子组件获取数据。