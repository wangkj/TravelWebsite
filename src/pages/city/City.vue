<template>
  <div>
    <city-header :city="city"></city-header>
  </div>
</template>

<script>
import CityHeader from './components/Header'

export default {
  name: 'City',
  data: function () {
    return {
      city: ''
    }
  },
  components: {
    CityHeader
  }
}
</script>

<style scoped>
</style>
