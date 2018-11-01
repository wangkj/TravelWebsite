<template>
  <div>
    <div class="title">热销推荐</div>
    <ul>
      <li class="item border-bottom" v-for="item of recommendList" :key="item.id">
        <img class="item-img" :src="item.imgUrl" />
        <div class="item-info">
          <p class="item-title">{{item.title}}</p>
          <p class="item-desc">{{item.desc}}</p>
          <button class="item-button">查看详情</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommend',
  data () {
    return {
      recommendList: [{
        id: '0001',
        imgUrl: 'http://img1.qunarzz.com/sight/p0/1810/14/14b8a787d6e901f6a3.img.jpg_200x200_4a447e3c.jpg',
        title: '北京欢乐谷',
        desc: '亚洲唯一飞行式过山车等你来挑战'
      }, {
        id: '0002',
        imgUrl: 'http://img1.qunarzz.com/sight/p0/1810/14/14b8a787d6e901f6a3.img.jpg_200x200_4a447e3c.jpg',
        title: '北京欢乐谷',
        desc: '亚洲唯一飞行式过山车等你来挑战'
      }, {
        id: '0003',
        imgUrl: 'http://img1.qunarzz.com/sight/p0/1810/14/14b8a787d6e901f6a3.img.jpg_200x200_4a447e3c.jpg',
        title: '北京欢乐谷',
        desc: '亚洲唯一飞行式过山车等你来挑战'
      }]
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/mixins.styl'
  .title
    margin-top: .2rem
    line-height: .8rem
    background: #ccc
    text-indent: .2rem
  .item
    overflow: hidden
    display: flex
    height: 1.9rem
    .item-img
      width: 1.7rem
      height: 1.7rem
      padding: .1rem
    .item-info
      flex: 1
      padding: .1rem
      min-width: 0
      .item-title
        line-height: .54rem
        font-size: .32rem
        ellipsis()
      .item-desc
        line-height: .4rem
        color: #ccc
        ellipsis()
      .item-button
        line-height: .44rem
        margin-top: .16rem
        background: #ff9300
        padding: 0 .2rem
        border-radius: 0.06rem
        color: #fff
</style>
