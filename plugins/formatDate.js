import Vue from 'vue'
import moment from 'moment'
export default () => {
  Vue.filter('formatDate', function (value) {
     if (!value) return ''
     return moment(String(value)).format('MM/DD/YYYY hh:mm')
  })
}