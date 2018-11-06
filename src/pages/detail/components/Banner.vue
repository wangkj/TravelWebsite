<template>
  <div class="banner">
    <img class="banner-img" src="https://img1.qunarzz.com/sight/p0/1410/34/f540a04367d06820af4dfeaf0ad40257.water.jpg_600x330_355f8a51.jpg" />
    <div class="banner-info">
      <div class="banner-title">
        故宫(AAAAA景区)
      </div>
      <div class="banner-number">
        <span class="iconfont banner-icon">&#xe633;</span>
        9
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBanner'
}
</script>

<style lang="stylus" scoped>
  .banner
    overflow: hidden
    height: 0
    padding-bottom: 50%
    position: relative
    .banner-img
      width: 100%
    .banner-info
      display: flex
      position: absolute
      left: 0
      right: 0
      bottom: 0
      line-height: .6rem
      color: #fff
      background-image: linear-gradient(top,  rgba(0, 0, 0 ,0), rgba(0, 0, 0, 0.8))
      .banner-title
        flex: 1
        font-size: .32rem
        padding: 0 .2rem
      .banner-number
        line-height: .32rem
        height: .32rem
        margin: .14rem
        padding: 0 .4rem
        border-radius: .2rem
        font-size: .24rem
        background: rgba( 0, 0, 0, 0.8)
        .banner-icon
          font-size: .24rem
</style>
