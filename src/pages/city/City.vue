<template>
  <div>
    <city-header></city-header>
    <city-search></city-search>
    <city-list :cities="cities" :hot="hotCities"></city-list>
    <city-alphabet :cities="cities"></city-alphabet>
  </div>
</template>

<script>
import axios from 'axios'
import CityHeader from './components/Header'
import CitySearch from './components/Search'
import CityList from './components/List'
import CityAlphabet from './components/Alphabet'

export default {
  name: 'City',
  data: function () {
    return {
      cities: {},
      hotCities: []
    }
  },
  components: {
    CityHeader,
    CitySearch,
    CityList,
    CityAlphabet
  },
  methods: {
    getCityInfo () {
      axios.get('/api/city.json')
        .then(this.handleGetCityInfoSuc)
    },
    handleGetCityInfoSuc (res) {
      res = res.data
      if (res.ret && res.data) {
        console.log('res', res.data)
        const data = res.data
        this.cities = data.cities
        this.hotCities = data.hotCities

        console.log('cities', this.cities, this.hotCities)
      }
    }
  },
  mounted () {
    this.getCityInfo()
  }
}
</script>

<style scoped>
</style>
