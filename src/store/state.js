
let defaultCity = '北京'

// 只要使用localStorage，最好在外层加上一个try---catch
try {
  if (localStorage.city) {
    defaultCity = localStorage.city
  }
} catch (e) {}

export default {
  city: defaultCity
}
