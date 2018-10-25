
## 计算属性的setter和getter

### setter和getter

computed的属性可以视为像是data一样，可以读取和设值，因此在computed中可以分成getter（读取） 和 setter（设值），在沒有写setter的情況下，computed默认只有getter，也就是只能读取，不能改变值。不过在需要时你也可以提供一个setter，如下所示：

```HTML
<div id="app">
  {{fullName}}
</div>
<script>
  var app = new Vue({
    el: '#app',
    data: {
      firstName: "Li",
      lastName: "Lei"
    },
    computed: {
      fullName: {
        get: function () {
          return this.firstName + " " + this.lastName
        },
        set: function (value) {
          var arr = value.split(" ")

          this.firstName = arr[0]
          this.lastName = arr[1]
        }
      }
    }
  })

  setTimeout(function () {
    app.fullName = 'Hang Meimei'
  }, 2000)
</script>
```

注意：getter和setter彼次触发的时间是独立的。getter大部分时候是当内部监测的值发生改变时才会被触发；setter则是当被观察的对象本身有改变时会被触发。

详细代码见[example7](https://github.com/Bian2017/TravelWebsite/blob/master/docs/example7/index.html)。